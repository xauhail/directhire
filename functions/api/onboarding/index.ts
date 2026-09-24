import { getDb } from '../../_lib/db';

export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    const data: any = await request.json().catch(() => ({}));
    const email = (data.email || '').toLowerCase().trim();
    const userId = data.userId || null;

    const db = getDb(env);

    if (db) {
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

      if (userId || email) {
        await db.query(`
          UPDATE "user"
          SET "onboardingCompleted" = true, "updatedAt" = NOW()
          WHERE id = $1 OR LOWER(email) = $2
        `, [userId || '', email || '']);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Onboarding completed and saved permanently into database',
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Failed to complete onboarding', message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
