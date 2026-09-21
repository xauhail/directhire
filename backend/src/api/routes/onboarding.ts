import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { GeminiService } from '../../services/geminiService.js';
import { JobService } from '../../services/jobService.js';
import { OnboardingData } from '../../types/index.js';

export const onboardingRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  // Parse uploaded resume text or extracted document text
  server.post<{ Body: { resumeText: string } }>('/api/onboarding/parse-resume', async (req, reply) => {
    try {
      const text = req.body?.resumeText || '';
      if (!text.trim()) {
        return reply.status(400).send({ error: 'Resume text is required' });
      }

      const parsed = await GeminiService.parseResume(text);
      return reply.send({ success: true, profile: parsed });
    } catch (err: any) {
      server.log.error(err);
      return reply.status(500).send({ error: 'Failed to parse resume', message: err.message });
    }
  });

  // Save complete 6-step onboarding quiz profile
  server.post<{ Body: OnboardingData }>('/api/onboarding', async (req, reply) => {
    try {
      const data = req.body;
      server.log.info({ data }, '[Onboarding] Saved candidate preferences');

      // Generate personalized search results based on onboarding choices
      const searchRes = await JobService.searchJobs({
        query: data.targetTitles?.[0] || '',
        filters: {
          workArrangements: data.workArrangements,
          experienceLevels: data.experienceLevel ? [data.experienceLevel] : undefined,
          keywords: data.skills,
          worldwide: data.isWorldwide,
          salaryMinimum: data.minSalary,
        },
        pageSize: 10,
      });

      return reply.send({
        success: true,
        message: 'Onboarding completed successfully',
        matchingJobsCount: searchRes.totalJobs,
        sampleMatches: searchRes.items,
      });
    } catch (err: any) {
      server.log.error(err);
      return reply.status(500).send({ error: 'Failed to complete onboarding', message: err.message });
    }
  });
};
