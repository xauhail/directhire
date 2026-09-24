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

    // Both guests and users on the free plan are subject to preview limits
    const isFreeOrGuest = !isSubscribed;

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

    const page = Math.max(1, body.page || 1);
    const requestedPageSize = body.pageSize || 10;
    const query = (body.title || body.query || '').trim();
    const filters = body.filters || {};

    const isCompanyQuery = Boolean(filters.companySlug || (filters.company && !query));
    // Limit rule: Main feed is max 10 jobs; company "More" drawer is max 5 jobs
    const previewLimit = isCompanyDrawerLimit(isCompanyQuery);

    function isCompanyDrawerLimit(isComp: boolean): number {
      return isComp ? 5 : 10;
    }

    // Free plan or guest user pagination restriction
    if (isFreeOrGuest && page > 1) {
      return new Response(JSON.stringify({
        totalJobs: 0,
        totalPages: 1,
        page: 1,
        pageSize: previewLimit,
        hasMore: false,
        items: [],
        isGuest,
        isSubscribed,
        isPaywalled: true,
        message: isCompanyQuery
          ? 'Free plan and guests can view up to 5 jobs per company. Upgrade to Pro for complete access.'
          : 'Free plan and guests can view up to 10 jobs. Upgrade to Pro for unlimited job listings.'
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const db = getDb(env);

    if (db) {
      const conditions: string[] = [
        "application_url IS NOT NULL AND application_url != '' AND application_url != '#' AND application_url LIKE 'http%'",
        "id NOT LIKE 'ch-%'"
      ];
      const values: any[] = [];
      let idx = 1;

      // 1. Company Filter (for Company "More" Drawer)
      if (filters.companySlug) {
        conditions.push(`company_slug = $${idx++}`);
        values.push(filters.companySlug);
      } else if (filters.company) {
        conditions.push(`(company_name ILIKE $${idx} OR company_slug ILIKE $${idx})`);
        values.push(`%${filters.company}%`);
        idx++;
      }

      // 2. Full-text / Trigram Search
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

      // 3. Remote / Workplace Arrangement
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

      // 4. Categories / Taxonomy
      const rawCats = filters.categories || filters.taxonomies;
      if (rawCats && rawCats.length > 0) {
        const cats = Array.isArray(rawCats) ? rawCats : [rawCats];
        const catConditions = cats.map((c: string) => {
          values.push(c.toLowerCase());
          return `LOWER(taxonomy) = $${idx++}`;
        });
        conditions.push(`(${catConditions.join(' OR ')})`);
      }

      // 5. Countries
      if (filters.countries && filters.countries.length > 0) {
        const countryConditions = filters.countries.map((c: string) => {
          values.push(`%${c}%`);
          return `locations::text ILIKE $${idx++}`;
        });
        conditions.push(`(is_worldwide = true OR ${countryConditions.join(' OR ')})`);
      }

      // 6. Salary Filter
      if (filters.salaryMinimum && Number(filters.salaryMinimum) > 0) {
        conditions.push(`(salary_max >= $${idx} OR salary_min >= $${idx})`);
        values.push(Number(filters.salaryMinimum));
        idx++;
      }

      // 7. Date Posted Filter
      if (filters.daysAgo && !isNaN(Number(filters.daysAgo))) {
        conditions.push(`published_at >= NOW() - INTERVAL '${Number(filters.daysAgo)} days'`);
      }

      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

      // Count Query
      const countSql = `SELECT COUNT(*) FROM jobs ${whereClause}`;
      const countRes = await db.query(countSql, values);
      const totalJobs = parseInt(countRes.rows[0].count, 10);

      // Pagination
      const pageSize = isFreeOrGuest ? previewLimit : requestedPageSize;
      const offset = (page - 1) * pageSize;
      const dataSql = `
        SELECT * FROM jobs 
        ${whereClause} 
        ORDER BY published_at DESC 
        LIMIT $${idx} OFFSET $${idx + 1}
      `;
      const dataRes = await db.query(dataSql, [...values, pageSize, offset]);

      let items = dataRes.rows.map(mapRowToJobItem);

      // Enforce strict cap: Free plan or guest never sees more than previewLimit (10 for search, 5 for company)
      if (isFreeOrGuest) {
        items = items.slice(0, previewLimit);
      }

      const hasMore = isFreeOrGuest ? false : totalJobs > (offset + items.length);

      return new Response(JSON.stringify({
        totalJobs,
        totalPages: isFreeOrGuest ? 1 : Math.ceil(totalJobs / pageSize),
        page,
        pageSize,
        hasMore,
        items,
        isGuest,
        isSubscribed,
        isPaywalled: isFreeOrGuest && totalJobs > previewLimit,
        previewLimit,
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
      warning: 'Database not connected yet.',
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
