"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoApplyRoutes = void 0;
const applyEngine_js_1 = require("../../automation/applyEngine.js");
const jobService_js_1 = require("../../services/jobService.js");
// In-memory application log store
const autoApplyLogs = [
    {
        id: 'app_1726748921_a9f1',
        jobId: 'ch-2362348665',
        jobTitle: 'Senior Full Stack Cloud Engineer',
        companyName: 'Dominion Energy',
        companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&auto=format&fit=crop&q=80',
        matchScore: 92,
        status: 'APPLIED',
        appliedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
        screenshotUrl: '/receipts/app_1726748921_receipt.png',
        screeningAnswers: {
            'Are you authorized to work in this location?': 'Yes',
            'What makes you a great fit?': '5+ years building distributed cloud services with Next.js, Node.js, and AWS with high availability standards.'
        }
    },
    {
        id: 'app_1726742011_c4d2',
        jobId: 'ch-2371976427',
        jobTitle: 'Lead AI Systems Engineer',
        companyName: 'Partner AI Labs',
        companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80',
        matchScore: 88,
        status: 'APPLIED',
        appliedAt: new Date(Date.now() - 7 * 3600 * 1000).toISOString(),
        screenshotUrl: '/receipts/app_1726742011_receipt.png',
        screeningAnswers: {
            'Experience with LLMs?': 'Led deployment of high-throughput generative AI evaluation pipelines utilizing Google Gemini API and vector retrieval.'
        }
    }
];
let currentSettings = {
    enabled: true,
    minMatchScore: 80,
    dailyLimit: 20,
    appliedToday: 2,
    blacklistedCompanies: [],
    autoTailorResume: true,
};
const autoApplyRoutes = async (server) => {
    // Get auto-apply configuration
    server.get('/api/auto-apply/settings', async (_req, reply) => {
        return reply.send({ settings: currentSettings });
    });
    // Update auto-apply configuration
    server.post('/api/auto-apply/settings', async (req, reply) => {
        currentSettings = { ...currentSettings, ...req.body };
        return reply.send({ success: true, settings: currentSettings });
    });
    // Get application logs
    server.get('/api/auto-apply/logs', async (_req, reply) => {
        return reply.send({ logs: autoApplyLogs });
    });
    // Trigger auto-apply on a specific job or batch of matching jobs
    server.post('/api/auto-apply/trigger', async (req, reply) => {
        try {
            const searchRes = jobService_js_1.JobService.searchJobs({ pageSize: 5 }, true);
            const targetJob = req.body?.jobId
                ? searchRes.items.find(j => j.id === req.body.jobId)
                : searchRes.items[0];
            if (!targetJob) {
                return reply.status(404).send({ error: 'No matching job found to auto-apply.' });
            }
            // Candidate profile
            const candidate = {
                name: 'Alex Johnson',
                email: 'alex.johnson@example.com',
                phone: '+1 (555) 234-5678',
                targetTitles: ['Senior Software Engineer', 'Full Stack Developer'],
                workArrangements: ['remote-solely', 'remote-ok'],
                isWorldwide: true,
                locations: ['Worldwide'],
                experienceLevel: '5-to-10',
                educationLevel: 'bachelor-degree',
                minSalary: 120000,
                salaryCurrency: 'USD',
                salaryUnit: 'year',
                skills: ['TypeScript', 'Node.js', 'React', 'AWS', 'Python', 'Google Gemini API'],
                resumeText: 'Experienced Senior Engineer with 6 years leading cloud-native web applications and generative AI integrations.'
            };
            const result = await applyEngine_js_1.ApplyEngine.submitApplication(targetJob, candidate, 89);
            if (result.success) {
                const newLog = {
                    id: result.applicationId,
                    jobId: targetJob.id,
                    jobTitle: targetJob.title,
                    companyName: targetJob.company.name,
                    companyLogo: targetJob.company.logo,
                    matchScore: 89,
                    status: 'APPLIED',
                    appliedAt: new Date().toISOString(),
                    screenshotUrl: result.screenshotUrl,
                    screeningAnswers: result.screeningAnswers,
                };
                autoApplyLogs.unshift(newLog);
                currentSettings.appliedToday += 1;
            }
            return reply.send(result);
        }
        catch (err) {
            server.log.error(err);
            return reply.status(500).send({ error: 'Failed to run auto-apply', message: err.message });
        }
    });
};
exports.autoApplyRoutes = autoApplyRoutes;
