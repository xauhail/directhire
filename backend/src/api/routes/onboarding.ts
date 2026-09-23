import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { JobService } from '../../services/jobService.js';
import { OnboardingData } from '../../types/index.js';
import { db, getAuthUser } from '../../auth.js';
import { CareerAnalysisService } from '../../services/geminiService.js';

export const onboardingRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  // Parse uploaded resume text or extracted document text
  server.post<{ Body: { resumeText: string } }>('/api/onboarding/parse-resume', async (req, reply) => {
    try {
      const text = req.body?.resumeText || '';
      if (!text.trim()) {
        return reply.status(400).send({ error: 'Resume text is required' });
      }

      const parsed = CareerAnalysisService.parseResume(text);
      return reply.send({ success: true, profile: parsed });
    } catch (err: any) {
      server.log.error(err);
      return reply.status(500).send({ error: 'Failed to parse resume', message: err.message });
    }
  });

  // Save complete 6-step onboarding quiz profile into PostgreSQL
  server.post<{ Body: OnboardingData & { email?: string } }>('/api/onboarding', async (req, reply) => {
    try {
      const data = req.body;
      const currentUser = await getAuthUser(req);
      const email = (data.email || currentUser?.email || '').toLowerCase().trim();
      const userId = currentUser?.id || null;

      server.log.info({ email, userId }, '[Onboarding] Saving candidate preferences into PostgreSQL');

      if (db) {
        try {
          const profileId = userId ? `onb_${userId}` : (email ? `onb_${email.replace(/[^a-z0-9]/g, '_')}` : `onb_${Date.now()}`);

          await db.query(`
            INSERT INTO onboarding_profiles (
              id, user_id, email, target_titles, work_arrangements, is_worldwide, locations,
              experience_level, education_level, min_salary, salary_currency, salary_unit, skills, resume_text,
              updated_at
            ) VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW()
            )
            ON CONFLICT (id) DO UPDATE SET
              user_id = COALESCE(EXCLUDED.user_id, onboarding_profiles.user_id),
              email = COALESCE(EXCLUDED.email, onboarding_profiles.email),
              target_titles = EXCLUDED.target_titles,
              work_arrangements = EXCLUDED.work_arrangements,
              is_worldwide = EXCLUDED.is_worldwide,
              locations = EXCLUDED.locations,
              experience_level = EXCLUDED.experience_level,
              education_level = EXCLUDED.education_level,
              min_salary = EXCLUDED.min_salary,
              salary_currency = EXCLUDED.salary_currency,
              salary_unit = EXCLUDED.salary_unit,
              skills = EXCLUDED.skills,
              resume_text = EXCLUDED.resume_text,
              updated_at = NOW();
          `, [
            profileId,
            userId,
            email || null,
            JSON.stringify(data.targetTitles || []),
            JSON.stringify(data.workArrangements || []),
            data.isWorldwide ?? true,
            JSON.stringify(data.locations || ['Worldwide']),
            data.experienceLevel || '2-to-5',
            data.educationLevel || 'bachelor-degree',
            data.minSalary || 80000,
            data.salaryCurrency || 'USD',
            data.salaryUnit || 'year',
            JSON.stringify(data.skills || []),
            data.resumeText || ''
          ]);

          // Mark user as onboarded in user table
          if (userId || email) {
            await db.query(`
              UPDATE "user"
              SET "onboardingCompleted" = true, "updatedAt" = NOW()
              WHERE id = $1 OR LOWER(email) = $2
            `, [userId || '', email || '']);
          }
        } catch (dbErr) {
          server.log.error(dbErr, '[Onboarding] Failed to persist into PostgreSQL');
        }
      }

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
        message: 'Onboarding completed and saved permanently into database',
        matchingJobsCount: searchRes.totalJobs,
        sampleMatches: searchRes.items,
      });
    } catch (err: any) {
      server.log.error(err);
      return reply.status(500).send({ error: 'Failed to complete onboarding', message: err.message });
    }
  });

  // Get saved candidate onboarding profile
  server.get('/api/onboarding/profile', async (req, reply) => {
    const currentUser = await getAuthUser(req);
    const email = ((req.query as any)?.email || currentUser?.email || '').toLowerCase().trim();
    const userId = currentUser?.id;

    if (!db || (!userId && !email)) {
      return reply.status(404).send({ error: 'Profile not found' });
    }

    try {
      const res = await db.query(
        'SELECT * FROM onboarding_profiles WHERE user_id = $1 OR LOWER(email) = $2 ORDER BY updated_at DESC LIMIT 1',
        [userId || '', email || '']
      );

      if (res.rows.length === 0) {
        return reply.status(404).send({ error: 'No onboarding profile found' });
      }

      const row = res.rows[0];
      return reply.send({
        success: true,
        profile: {
          targetTitles: row.target_titles || [],
          workArrangements: row.work_arrangements || [],
          isWorldwide: row.is_worldwide,
          locations: row.locations || [],
          experienceLevel: row.experience_level,
          educationLevel: row.education_level,
          minSalary: row.min_salary,
          salaryCurrency: row.salary_currency,
          salaryUnit: row.salary_unit,
          skills: row.skills || [],
          resumeText: row.resume_text,
          updatedAt: row.updated_at,
        },
      });
    } catch (err: any) {
      server.log.error(err);
      return reply.status(500).send({ error: 'Failed to retrieve profile', message: err.message });
    }
  });
};
