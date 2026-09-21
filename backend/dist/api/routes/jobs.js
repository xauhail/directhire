"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRoutes = void 0;
const jobService_js_1 = require("../../services/jobService.js");
const jobRoutes = async (server) => {
    // Search jobs matching 11 filter dimensions
    server.post('/api/job-search', async (req, reply) => {
        try {
            const isSubscribed = (req.headers['x-user-subscribed'] === 'true') || false;
            const response = jobService_js_1.JobService.searchJobs(req.body || {}, isSubscribed);
            return reply.send(response);
        }
        catch (err) {
            server.log.error(err);
            return reply.status(500).send({ error: 'Failed to search jobs', message: err.message });
        }
    });
    // Get options for filters
    server.get('/api/job-search/options', async (_req, reply) => {
        return reply.send({
            taxonomies: jobService_js_1.TAXONOMIES,
            workArrangements: jobService_js_1.WORK_ARRANGEMENTS,
            experienceLevels: jobService_js_1.EXPERIENCE_LEVELS,
            employmentTypes: jobService_js_1.EMPLOYMENT_TYPES,
            educationLevels: jobService_js_1.EDUCATION_LEVELS,
            salaryCurrencies: jobService_js_1.SALARY_CURRENCIES,
        });
    });
    // Location autocomplete
    server.get('/api/job-search/locations', async (req, reply) => {
        const query = req.query.q || '';
        const items = jobService_js_1.JobService.searchLocations(query);
        return reply.send({ items });
    });
    // Keyword autocomplete
    server.get('/api/job-search/keywords', async (req, reply) => {
        const query = req.query.q || '';
        const items = jobService_js_1.JobService.searchKeywords(query);
        return reply.send({ items });
    });
    // Company job counts
    server.post('/api/search/company-counts', async (req, reply) => {
        const { companySlugs = [] } = req.body || {};
        const searchRes = jobService_js_1.JobService.searchJobs(req.body.search || {});
        const counts = {};
        for (const slug of companySlugs) {
            counts[slug] = searchRes.moreJobsCountByCompany?.[slug] || 0;
        }
        return reply.send({ moreJobsCountByCompany: counts });
    });
    // Report job not relevant
    server.post('/api/job-search/not-relevant', async (req, reply) => {
        server.log.info(`[Report Not Relevant] Job: ${req.body.jobId}, Comment: ${req.body.comment}`);
        return reply.send({ success: true, message: 'Report received. Thank you for keeping Career Hound accurate.' });
    });
};
exports.jobRoutes = jobRoutes;
