import { getDb } from '../../_lib/db';

function mapRowToJobItem(row: any) {
  const locations = Array.isArray(row.locations)
    ? row.locations
    : (typeof row.locations === 'string' ? JSON.parse(row.locations) : ['Worldwide']);
    
  const employmentTypes = Array.isArray(row.employment_types)
    ? row.employment_types
    : (typeof row.employment_types === 'string' ? JSON.parse(row.employment_types) : ['full-time']);

  const skills = Array.isArray(row.skills)
    ? row.skills
    : (typeof row.skills === 'string' ? JSON.parse(row.skills) : []);

  return {
    id: row.id,
    title: row.title,
    company: {
      slug: row.company_slug || 'company',
      name: row.company_name,
      industry: row.company_industry || 'Technology',
      logo: row.company_logo || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&q=80',
      websiteUrl: row.company_website || undefined
    },
    descriptionExcerpt: row.description_excerpt,
    descriptionFull: row.description_full || row.description_excerpt,
    descriptionMasked: false,
    workArrangement: row.work_arrangement,
    employmentTypes,
    experienceLevel: row.experience_level,
    educationLevel: row.education_level || 'bachelor-degree',
    taxonomy: row.taxonomy,
    locations,
    isWorldwide: Boolean(row.is_worldwide),
    published: row.published_at ? new Date(row.published_at).toISOString() : new Date().toISOString(),
    salary: {
      currency: row.salary_currency || 'USD',
      min: row.salary_min || 0,
      max: row.salary_max || 0,
      unit: row.salary_unit || 'YEAR',
      value: row.salary_min || row.salary_max || 0
    },
    skills,
    hasApplicationUrl: Boolean(row.application_url),
    applicationUrl: row.application_url || null,
    relevanceTier: 'EXACT',
    directApplySource: row.direct_apply_source || 'company-direct'
  };
}

export async function onRequest(context: any) {
  const { request, env } = context;

  try {
    const isSubscribed = request.headers.get('x-user-subscribed') === 'true';
    const isAuthHeader = request.headers.get('x-user-authenticated') === 'true';
    const hasAuthToken = !!request.headers.get('authorization');
    const cookieHeader = request.headers.get('cookie') || '';
    const hasSessionCookie = cookieHeader.includes('better-auth.session_token') || cookieHeader.includes('ch_token');
    const isGuest = !isSubscribed && !isAuthHeader && !hasAuthToken && !hasSessionCookie;

    let body: any = {};
    if (request.method === 'POST') {
      try {
        body = await request.json();
      } catch {
        body = {};
      }
    } else {
      const url = new URL(request.url);
      body = {
        query: url.searchParams.get('query') || url.searchParams.get('q') || '',
        page: parseInt(url.searchParams.get('page') || '1', 10),
        pageSize: parseInt(url.searchParams.get('pageSize') || '10', 10),
      };
    }

    const page = body.page || 1;
    const pageSize = body.pageSize || 10;
    const query = (body.title || body.query || '').trim();
    const filters = body.filters || {};

    const db = getDb(env);

    if (db) {
      const conditions: string[] = [];
      const values: any[] = [];
      let idx = 1;

      if (query) {
        conditions.push(`(
          title ILIKE $${idx} OR 
          company_name ILIKE $${idx} OR 
          description_excerpt ILIKE $${idx} OR 
          skills::text ILIKE $${idx} OR
          taxonomy ILIKE $${idx}
        )`);
        values.push(`%${query}%`);
        idx++;
      }

      if (filters.isRemoteOnly) {
        conditions.push(`(
          is_worldwide = true OR 
          work_arrangement ILIKE '%remote%' OR 
          locations::text ILIKE '%worldwide%' OR 
          locations::text ILIKE '%remote%'
        )`);
      } else if (filters.workArrangements && filters.workArrangements.length > 0) {
        const arrConditions = filters.workArrangements.map((w: string) => {
          values.push(`%${w}%`);
          return `work_arrangement ILIKE $${idx++}`;
        });
        conditions.push(`(${arrConditions.join(' OR ')})`);
      }

      if (filters.categories && filters.categories.length > 0) {
        const catConditions = filters.categories.map((c: string) => {
          values.push(c);
          return `taxonomy = $${idx++}`;
        });
        conditions.push(`(${catConditions.join(' OR ')})`);
      }

      if (filters.countries && filters.countries.length > 0) {
        const countryConditions = filters.countries.map((c: string) => {
          values.push(`%${c}%`);
          return `locations::text ILIKE $${idx++}`;
        });
        conditions.push(`(is_worldwide = true OR ${countryConditions.join(' OR ')})`);
      }

      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

      const countSql = `SELECT COUNT(*) FROM jobs ${whereClause}`;
      const countRes = await db.query(countSql, values);
      const totalJobs = parseInt(countRes.rows[0].count, 10);

      // Pagination
      const offset = (page - 1) * pageSize;
      const dataSql = `
        SELECT * FROM jobs 
        ${whereClause} 
        ORDER BY published_at DESC 
        LIMIT $${idx} OFFSET $${idx + 1}
      `;
      const dataRes = await db.query(dataSql, [...values, pageSize, offset]);

      let items = dataRes.rows.map(mapRowToJobItem);

      // Free user lock limit: maximum 5 jobs unlocked if not subscribed
      const FREE_PREVIEW_LIMIT = 5;
      let hasMore = totalJobs > (offset + items.length);

      if (isGuest && (offset >= FREE_PREVIEW_LIMIT || items.length > FREE_PREVIEW_LIMIT)) {
        items = items.map((job, i) => {
          const absoluteIndex = offset + i;
          if (absoluteIndex >= FREE_PREVIEW_LIMIT) {
            return {
              ...job,
              isLocked: true,
              applicationUrl: null,
              descriptionExcerpt: job.descriptionExcerpt.slice(0, 80) + '... (Sign in or subscribe to unlock)',
            };
          }
          return job;
        });
        hasMore = true;
      }

      return new Response(JSON.stringify({
        totalJobs,
        totalPages: Math.ceil(totalJobs / pageSize),
        page,
        pageSize,
        hasMore,
        items,
        isGuest,
        isSubscribed,
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Fallback response if DATABASE_URL is not set yet
    return new Response(JSON.stringify({
      totalJobs: 0,
      totalPages: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      items: [],
      warning: 'Neon database not connected yet. Please set DATABASE_URL in Cloudflare Pages environment variables.',
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Search failed', message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
