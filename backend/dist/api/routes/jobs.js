"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRoutes = void 0;
const jobService_js_1 = require("../../services/jobService.js");
function parseQueryParamsToSearchRequest(q) {
    const page = q.page ? parseInt(String(q.page), 10) : 1;
    const pageSize = q.pageSize ? parseInt(String(q.pageSize), 10) : 10;
    const query = q.query || q.title || q.q || '';
    const title = q.title || '';
    const parseArrayParam = (val) => {
        if (!val)
            return [];
        if (Array.isArray(val))
            return val.flatMap(v => String(v).split(',')).map(s => s.trim()).filter(Boolean);
        return String(val).split(',').map(s => s.trim()).filter(Boolean);
    };
    const categories = parseArrayParam(q.categories || q.category || q.taxonomies || q.taxonomy);
    const countries = parseArrayParam(q.countries || q.country);
    const workArrangements = parseArrayParam(q.workArrangements || q.workplace);
    const isRemoteOnly = q.isRemoteOnly === 'true' || q.isRemoteOnly === true || q.remote === 'true';
    const hasCompensation = q.hasCompensation === 'true' || q.hasCompensation === true || q.compensation === 'true';
    const filters = {
        categories: categories.length ? categories : undefined,
        taxonomies: categories.length ? categories : undefined,
        countries: countries.length ? countries : undefined,
        workArrangements: workArrangements.length ? workArrangements : undefined,
        isRemoteOnly: isRemoteOnly || undefined,
        hasCompensation: hasCompensation || undefined,
        salaryMinimum: q.salaryMinimum ? Number(q.salaryMinimum) : (q.minSalary ? Number(q.minSalary) : undefined),
        salaryMaximum: q.salaryMaximum ? Number(q.salaryMaximum) : (q.maxSalary ? Number(q.maxSalary) : undefined),
        daysAgo: q.daysAgo || undefined,
        datePosted: q.datePosted || undefined,
        worldwide: q.worldwide === 'true' || q.worldwide === true || undefined,
    };
    return {
        page,
        pageSize,
        query,
        title,
        queryMode: q.queryMode === 'EXACT' ? 'EXACT' : 'FLEXIBLE',
        sort: q.sort === 'NEWEST' ? 'NEWEST' : 'RELEVANCE',
        filters,
    };
}
const jobRoutes = async (server) => {
    const handleJobSearch = async (req, reply) => {
        try {
            const isSubscribed = (req.headers['x-user-subscribed'] === 'true') || false;
            const isAuthHeader = (req.headers['x-user-authenticated'] === 'true');
            const hasAuthToken = !!req.headers.authorization;
            const hasSessionCookie = !!(req.cookies && (req.cookies['better-auth.session_token'] || req.cookies['ch_token']));
            const isGuest = !isSubscribed && !isAuthHeader && !hasAuthToken && !hasSessionCookie;
            const isPost = req.method === 'POST';
            let searchParams;
            if (isPost && req.body && Object.keys(req.body).length > 0) {
                searchParams = {
                    ...req.body,
                    filters: {
                        ...(req.body.filters || {}),
                        categories: req.body.filters?.categories || req.body.filters?.taxonomies,
                    }
                };
            }
            else {
                searchParams = parseQueryParamsToSearchRequest(req.query || {});
            }
            const response = await jobService_js_1.JobService.searchJobs(searchParams, isSubscribed, isGuest);
            return reply.send(response);
        }
        catch (err) {
            server.log.error(err);
            return reply.status(500).send({ error: 'Failed to search jobs', message: err.message });
        }
    };
    // Primary CareerHound Search Routes
    server.post('/api/job-search', handleJobSearch);
    server.get('/api/job-search', handleJobSearch);
    server.get('/api/job-search/all', handleJobSearch);
    // Aliases for /api/jobs
    server.post('/api/jobs', handleJobSearch);
    server.get('/api/jobs', handleJobSearch);
    // Get options for filters
    const handleFilterOptions = async (_req, reply) => {
        return reply.send({
            taxonomies: jobService_js_1.TAXONOMIES,
            categories: jobService_js_1.TAXONOMIES,
            countries: jobService_js_1.COUNTRIES,
            workArrangements: jobService_js_1.WORK_ARRANGEMENTS,
            experienceLevels: jobService_js_1.EXPERIENCE_LEVELS,
            employmentTypes: jobService_js_1.EMPLOYMENT_TYPES,
            educationLevels: jobService_js_1.EDUCATION_LEVELS,
            salaryCurrencies: jobService_js_1.SALARY_CURRENCIES,
        });
    };
    server.get('/api/job-search/options', handleFilterOptions);
    server.get('/api/jobs/filters', handleFilterOptions);
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
        const searchRes = await jobService_js_1.JobService.searchJobs(req.body.search || {});
        const counts = {};
        for (const slug of companySlugs) {
            counts[slug] = searchRes.moreJobsCountByCompany?.[slug] || 0;
        }
        return reply.send({ moreJobsCountByCompany: counts });
    });
    // Report job / flag listing
    server.post('/api/job-search/not-relevant', async (req, reply) => {
        const { jobId, jobTitle, companyName, reason, comment, email } = req.body || {};
        server.log.info(`[Report Job] ID: ${jobId} | ${jobTitle} @ ${companyName} | Reason: ${reason} | Email: ${email || 'anonymous'} | Comment: ${comment || 'none'}`);
        return reply.send({
            success: true,
            message: 'Report received. Our direct ATS auditing team will verify this listing within 4 hours.'
        });
    });
};
exports.jobRoutes = jobRoutes;
