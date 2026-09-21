import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { JobService, TAXONOMIES, WORK_ARRANGEMENTS, EXPERIENCE_LEVELS, EMPLOYMENT_TYPES, EDUCATION_LEVELS, SALARY_CURRENCIES } from '../../services/jobService.js';
import { JobSearchRequest } from '../../types/index.js';

export const jobRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  // Search jobs matching filter dimensions (POST)
  server.post<{ Body: JobSearchRequest }>('/api/job-search', async (req, reply) => {
    try {
      const isSubscribed = (req.headers['x-user-subscribed'] === 'true') || false;
      const response = await JobService.searchJobs(req.body || {}, isSubscribed);
      return reply.send(response);
    } catch (err: any) {
      server.log.error(err);
      return reply.status(500).send({ error: 'Failed to search jobs', message: err.message });
    }
  });

  // Search jobs matching filter dimensions (GET fallback)
  server.get<{ Querystring: { query?: string; page?: string; pageSize?: string } }>('/api/job-search', async (req, reply) => {
    try {
      const isSubscribed = (req.headers['x-user-subscribed'] === 'true') || false;
      const page = req.query.page ? parseInt(req.query.page, 10) : 1;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
      const query = req.query.query || '';
      const response = await JobService.searchJobs({ page, pageSize, query }, isSubscribed);
      return reply.send(response);
    } catch (err: any) {
      server.log.error(err);
      return reply.status(500).send({ error: 'Failed to search jobs', message: err.message });
    }
  });

  // Get options for filters
  server.get('/api/job-search/options', async (_req, reply) => {
    return reply.send({
      taxonomies: TAXONOMIES,
      workArrangements: WORK_ARRANGEMENTS,
      experienceLevels: EXPERIENCE_LEVELS,
      employmentTypes: EMPLOYMENT_TYPES,
      educationLevels: EDUCATION_LEVELS,
      salaryCurrencies: SALARY_CURRENCIES,
    });
  });

  // Location autocomplete
  server.get<{ Querystring: { q?: string } }>('/api/job-search/locations', async (req, reply) => {
    const query = req.query.q || '';
    const items = JobService.searchLocations(query);
    return reply.send({ items });
  });

  // Keyword autocomplete
  server.get<{ Querystring: { q?: string } }>('/api/job-search/keywords', async (req, reply) => {
    const query = req.query.q || '';
    const items = JobService.searchKeywords(query);
    return reply.send({ items });
  });

  // Company job counts
  server.post<{ Body: { companySlugs: string[]; search?: any } }>('/api/search/company-counts', async (req, reply) => {
    const { companySlugs = [] } = req.body || {};
    const searchRes = await JobService.searchJobs(req.body.search || {});
    const counts: Record<string, number> = {};
    for (const slug of companySlugs) {
      counts[slug] = searchRes.moreJobsCountByCompany?.[slug] || 0;
    }
    return reply.send({ moreJobsCountByCompany: counts });
  });

  // Report job / flag listing
  server.post<{ Body: { jobId: string; jobTitle?: string; companyName?: string; reason?: string; comment?: string; email?: string; url?: string } }>('/api/job-search/not-relevant', async (req, reply) => {
    const { jobId, jobTitle, companyName, reason, comment, email } = req.body || {};
    server.log.info(`[Report Job] ID: ${jobId} | ${jobTitle} @ ${companyName} | Reason: ${reason} | Email: ${email || 'anonymous'} | Comment: ${comment || 'none'}`);
    return reply.send({ 
      success: true, 
      message: 'Report received. Our direct ATS auditing team will verify this listing within 4 hours.' 
    });
  });
};
