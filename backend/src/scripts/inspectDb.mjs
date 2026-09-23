import { config } from '../../dist/config/env.js';
import pg from 'pg';

async function check() {
  const pool = new pg.Pool({ connectionString: config.databaseUrl });
  try {
    const res = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
    console.log('Tables:', res.rows.map(r => r.table_name));

    for (const t of ['user', 'session', 'account', 'verification', 'onboarding_profiles', 'jobs']) {
      const colRes = await pool.query(
        "SELECT column_name, data_type FROM information_schema.columns WHERE table_name=$1",
        [t]
      );
      if (colRes.rows.length > 0) {
        console.log(`Columns of ${t}:`, colRes.rows.map(c => `${c.column_name} (${c.data_type})`).join(', '));
      } else {
        console.log(`Table ${t} does not exist.`);
      }
    }
    const onbRes = await pool.query('SELECT email, target_titles, skills, min_salary FROM onboarding_profiles');
    console.log('Onboarding Profiles in DB:', onbRes.rows);
    const usersRes = await pool.query('SELECT id, name, email, plan, "isSubscribed", "onboardingCompleted" FROM "user"');
    console.log('Users in DB:', usersRes.rows);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

check();
