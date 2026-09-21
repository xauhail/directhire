import { db } from '../auth.js';
import { JobItem, JobSearchRequest, JobSearchResponse, LocationItem } from '../types/index.js';

export const TAXONOMIES = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Software', value: 'software' },
  { label: 'Technology', value: 'technology' },
  { label: 'Data & Analytics', value: 'data-and-analytics' },
  { label: 'Art & Design', value: 'art-and-design' },
  { label: 'Creative & Media', value: 'creative-and-media' },
  { label: 'Management & Leadership', value: 'management-and-leadership' },
  { label: 'Consulting', value: 'consulting' },
  { label: 'Administrative', value: 'administrative' },
  { label: 'Legal', value: 'legal' },
  { label: 'Finance & Accounting', value: 'finance-and-accounting' },
  { label: 'Human Resources', value: 'human-resources' },
  { label: 'Manufacturing', value: 'manufacturing' },
  { label: 'Environmental & Sustainability', value: 'environmental-and-sustainability' },
  { label: 'Security & Safety', value: 'security-and-safety' },
  { label: 'Science & Research', value: 'science-and-research' },
  { label: 'Food & Beverage', value: 'food-and-beverage' },
  { label: 'Hospitality', value: 'hospitality' },
  { label: 'Sales', value: 'sales' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Government & Public Sector', value: 'government-and-public-sector' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Agriculture', value: 'agriculture' },
  { label: 'Education', value: 'education' },
  { label: 'Customer Service & Support', value: 'customer-service-and-support' },
  { label: 'Social Services', value: 'social-services' },
  { label: 'Construction', value: 'construction' },
  { label: 'Trades', value: 'trades' },
  { label: 'Transportation', value: 'transportation' },
  { label: 'Logistics', value: 'logistics' },
  { label: 'Retail', value: 'retail' },
  { label: 'Energy', value: 'energy' },
  { label: 'Sports & Recreation', value: 'sports-and-recreation' }
];

export const WORK_ARRANGEMENTS = [
  { label: 'On-site', value: 'on-site', description: 'No remote at all.' },
  { label: 'Hybrid', value: 'hybrid', description: 'Split between office and remote.' },
  { label: 'Remote OK', value: 'remote-ok', description: 'Fully remote, but an office is available.' },
  { label: 'Remote Solely', value: 'remote-solely', description: 'Fully remote, no office.' }
];

export const EXPERIENCE_LEVELS = [
  { label: '0–2 years', value: '0-to-2' },
  { label: '2–5 years', value: '2-to-5' },
  { label: '5–10 years', value: '5-to-10' },
  { label: '10+ years', value: '10-plus' }
];

export const EMPLOYMENT_TYPES = [
  { label: 'Full-time', value: 'full-time' },
  { label: 'Part-time', value: 'part-time' },
  { label: 'Contractor', value: 'contractor' },
  { label: 'Temporary', value: 'temporary' },
  { label: 'Per diem', value: 'per-diem' },
  { label: 'Intern', value: 'intern' },
  { label: 'Volunteer', value: 'volunteer' },
  { label: 'Other', value: 'other' }
];

export const EDUCATION_LEVELS = [
  { label: 'No education required', value: 'no-requirements' },
  { label: 'High school', value: 'high-school' },
  { label: 'Professional certificate', value: 'professional-certificate' },
  { label: 'Associate degree', value: 'associate-degree' },
  { label: "Bachelor's degree", value: 'bachelor-degree' },
  { label: 'Postgraduate degree', value: 'postgraduate-degree' }
];

export const SALARY_CURRENCIES = [
  { label: 'USD', value: 'USD' },
  { label: 'CAD', value: 'CAD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'GBP', value: 'GBP' },
  { label: 'AUD', value: 'AUD' },
  { label: 'INR', value: 'INR' },
  { label: 'SGD', value: 'SGD' },
  { label: 'CHF', value: 'CHF' },
  { label: 'JPY', value: 'JPY' }
];

function mapRowToJobItem(row: any): JobItem {
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
    workArrangement: row.work_arrangement as any,
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
      unit: (row.salary_unit || 'YEAR') as any,
      value: row.salary_min || row.salary_max || 0
    },
    skills,
    hasApplicationUrl: Boolean(row.application_url),
    applicationUrl: row.application_url || null,
    relevanceTier: 'EXACT',
    directApplySource: row.direct_apply_source || 'company-direct'
  };
}

export class JobService {
  /**
   * Search jobs from PostgreSQL database
   */
  static async searchJobs(params: JobSearchRequest, isSubscribed = false): Promise<JobSearchResponse> {
    const {
      page = 1,
      pageSize = 10,
      query = '',
      sort = 'RELEVANCE',
      filters = {}
    } = params;

    // If PostgreSQL pool is available, query directly
    if (db) {
      try {
        const conditions: string[] = [];
        const values: any[] = [];
        let idx = 1;

        // 1. Text Query Filter
        if (query && query.trim()) {
          const q = query.trim();
          const queryMode = params.queryMode || 'FLEXIBLE';

          if (queryMode === 'EXACT') {
            conditions.push(`(
              title ILIKE $${idx} OR 
              company_name ILIKE $${idx} OR 
              description_excerpt ILIKE $${idx} OR 
              skills::text ILIKE $${idx} OR
              taxonomy ILIKE $${idx}
            )`);
            values.push(`%${q}%`);
            idx++;
          } else {
            // Flexible mode: matches entire phrase OR key words
            const words = q.split(/\s+/).filter(w => w.length > 2);
            if (words.length <= 1) {
              conditions.push(`(
                title ILIKE $${idx} OR 
                company_name ILIKE $${idx} OR 
                description_excerpt ILIKE $${idx} OR 
                skills::text ILIKE $${idx} OR
                taxonomy ILIKE $${idx}
              )`);
              values.push(`%${q}%`);
              idx++;
            } else {
              const phraseIdx = idx++;
              values.push(`%${q}%`);
              
              const wordClauses: string[] = [];
              for (const word of words) {
                const wIdx = idx++;
                wordClauses.push(`(title ILIKE $${wIdx} OR description_excerpt ILIKE $${wIdx} OR skills::text ILIKE $${wIdx} OR taxonomy ILIKE $${wIdx})`);
                values.push(`%${word}%`);
              }
              
              conditions.push(`(
                (title ILIKE $${phraseIdx} OR company_name ILIKE $${phraseIdx} OR description_excerpt ILIKE $${phraseIdx} OR skills::text ILIKE $${phraseIdx} OR taxonomy ILIKE $${phraseIdx})
                OR (${wordClauses.join(' AND ')})
              )`);
            }
          }
        }

        // 2. Workplace Types
        if (filters.workArrangements && filters.workArrangements.length > 0) {
          const normalized = filters.workArrangements.map(w => {
            if (w === 'remote-solely') return 'Remote Solely';
            if (w === 'remote-ok') return 'Remote OK';
            if (w === 'hybrid') return 'Hybrid';
            if (w === 'on-site') return 'On-site';
            return w;
          });
          conditions.push(`work_arrangement = ANY($${idx})`);
          values.push(normalized);
          idx++;
        }

        // 3. Taxonomies
        if (filters.taxonomies && filters.taxonomies.length > 0) {
          conditions.push(`LOWER(taxonomy) = ANY($${idx})`);
          values.push(filters.taxonomies.map(t => t.toLowerCase()));
          idx++;
        }

        // 4. Experience Levels
        if (filters.experienceLevels && filters.experienceLevels.length > 0) {
          conditions.push(`experience_level = ANY($${idx})`);
          values.push(filters.experienceLevels);
          idx++;
        }

        // 5. Worldwide Only
        if (filters.worldwide) {
          conditions.push(`(is_worldwide = true OR locations::text ILIKE '%worldwide%')`);
        }

        // 6. Salary Minimum and Maximum
        if (filters.salaryMinimum && filters.salaryMinimum > 0) {
          conditions.push(`(salary_max >= $${idx} OR salary_min >= $${idx})`);
          values.push(filters.salaryMinimum);
          idx++;
        }
        if (filters.salaryMaximum && filters.salaryMaximum > 0) {
          conditions.push(`(salary_min <= $${idx} OR salary_max <= $${idx})`);
          values.push(filters.salaryMaximum);
          idx++;
        }

        // 7. Date Posted
        if (filters.datePosted && filters.datePosted !== 'all') {
          let hoursAgo = 24 * 30; // default 30 days
          if (filters.datePosted === '1-day-ago') hoursAgo = 24;
          else if (filters.datePosted === '3-days-ago') hoursAgo = 72;
          else if (filters.datePosted === '1-week-ago') hoursAgo = 24 * 7;
          else if (filters.datePosted === '1-month-ago') hoursAgo = 24 * 30;

          conditions.push(`published_at >= NOW() - INTERVAL '${hoursAgo} HOURS'`);
        }

        // 8. Keywords
        if (filters.keywords && filters.keywords.length > 0) {
          for (const kw of filters.keywords) {
            conditions.push(`skills::text ILIKE $${idx}`);
            values.push(`%${kw}%`);
            idx++;
          }
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

        // Total count
        const countQuery = `SELECT COUNT(*) FROM jobs ${whereClause}`;
        const countResult = await db.query(countQuery, values);
        const totalJobs = parseInt(countResult.rows[0].count, 10);

        // Sorting
        const orderBy = sort === 'NEWEST' 
          ? 'ORDER BY published_at DESC' 
          : 'ORDER BY published_at DESC, id ASC';

        // Pagination
        const offset = (page - 1) * pageSize;
        const limitValues = [...values, pageSize, offset];
        const dataQuery = `
          SELECT * FROM jobs 
          ${whereClause} 
          ${orderBy} 
          LIMIT $${idx} OFFSET $${idx + 1}
        `;

        const dataResult = await db.query(dataQuery, limitValues);
        const items = dataResult.rows.map(mapRowToJobItem);

        // Company counts
        const companyCounts: Record<string, number> = {};
        for (const item of items) {
          companyCounts[item.company.slug] = (companyCounts[item.company.slug] || 0) + 1;
        }
        const moreJobsCountByCompany: Record<string, number> = {};
        for (const [slug, count] of Object.entries(companyCounts)) {
          if (count > 1) moreJobsCountByCompany[slug] = count - 1;
        }

        return {
          items,
          page,
          pageSize,
          totalJobs,
          hasMore: offset + items.length < totalJobs,
          isPaywalled: false,
          moreJobsCountByCompany,
        };
      } catch (err) {
        console.error('[JobService] PostgreSQL query error:', err);
      }
    }

    // Fallback if db is unavailable
    return {
      items: [],
      page: 1,
      pageSize,
      totalJobs: 0,
      hasMore: false,
      isPaywalled: false,
      moreJobsCountByCompany: {},
    };
  }

  /**
   * Search locations for autocomplete
   */
  static searchLocations(query: string): LocationItem[] {
    const q = query.trim().toLowerCase();
    const allLocations: LocationItem[] = [
      { id: 'loc-ww', name: 'Worldwide', label: 'Worldwide (Remote from Anywhere)', scope: 'worldwide' },
      { id: 'loc-us', name: 'United States', label: 'United States', scope: 'country' },
      { id: 'loc-ca', name: 'Canada', label: 'Canada', scope: 'country' },
      { id: 'loc-uk', name: 'United Kingdom', label: 'United Kingdom', scope: 'country' },
      { id: 'loc-eu', name: 'Europe', label: 'Europe (Remote)', scope: 'continent' },
      { id: 'loc-sf', name: 'San Francisco', label: 'San Francisco, California, United States', scope: 'city' },
      { id: 'loc-nyc', name: 'New York', label: 'New York, New York, United States', scope: 'city' },
      { id: 'loc-austin', name: 'Austin', label: 'Austin, Texas, United States', scope: 'city' },
      { id: 'loc-toronto', name: 'Toronto', label: 'Toronto, Ontario, Canada', scope: 'city' },
      { id: 'loc-london', name: 'London', label: 'London, Greater London, United Kingdom', scope: 'city' },
      { id: 'loc-berlin', name: 'Berlin', label: 'Berlin, Germany', scope: 'city' },
    ];

    if (!q) return allLocations.slice(0, 8);
    return allLocations.filter(l => l.label.toLowerCase().includes(q) || l.name.toLowerCase().includes(q));
  }

  /**
   * Search skills & keywords for autocomplete
   */
  static searchKeywords(query: string): Array<{ label: string; value: string }> {
    const q = query.trim().toLowerCase();
    const commonKeywords = [
      'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'FastAPI',
      'Go', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'SQL', 'GraphQL',
      'Tailwind CSS', 'Playwright', 'Product Management', 'Outbound Sales', 'HubSpot',
      'Data Engineering', 'Machine Learning', 'AI Engineering', 'Rust', 'Linux'
    ];

    if (!q) return commonKeywords.slice(0, 10).map(k => ({ label: k, value: k }));
    return commonKeywords
      .filter(k => k.toLowerCase().includes(q))
      .map(k => ({ label: k, value: k }));
  }
}
