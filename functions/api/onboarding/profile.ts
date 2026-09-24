import { getDb } from '../../_lib/db';

export async function onRequestGet(context: any) {
  const { request, env } = context;

  const url = new URL(request.url);
  const email = (url.searchParams.get('email') || '').toLowerCase().trim();
  const userId = url.searchParams.get('userId');

  const db = getDb(env);

  if (!db || (!userId && !email)) {
    return new Response(JSON.stringify({ error: 'Profile not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const res = await db.query(
      'SELECT * FROM onboarding_profiles WHERE user_id = $1 OR LOWER(email) = $2 ORDER BY updated_at DESC LIMIT 1',
      [userId || '', email || '']
    );

    if (res.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'No onboarding profile found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const row = res.rows[0];
    return new Response(JSON.stringify({
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
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Failed to retrieve profile', message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
