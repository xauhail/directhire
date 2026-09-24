import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), 'backend/.env') });
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  try {
    console.log('Connecting to Neon DB to purge demo accounts...');

    // 1. Delete onboarding profiles of test users
    const delOnb = await pool.query(
      `DELETE FROM onboarding_profiles 
       WHERE email IN ('test@careerhound.io', 'demo@careerhound.io', 'livecandidate@testmail.com') 
          OR user_id IN ('usr_test_pro', 'usr_demo_free')`
    );
    console.log(`Deleted ${delOnb.rowCount} demo/test onboarding profile(s).`);

    // 2. Delete any accounts linked to test users
    const delAcc = await pool.query(
      `DELETE FROM "account" 
       WHERE "userId" IN ('usr_test_pro', 'usr_demo_free') 
          OR "userId" IN (SELECT id FROM "user" WHERE LOWER(email) IN ('test@careerhound.io', 'demo@careerhound.io', 'livecandidate@testmail.com'))`
    );
    console.log(`Deleted ${delAcc.rowCount} demo/test account record(s).`);

    // 3. Delete any sessions linked to test users
    const delSess = await pool.query(
      `DELETE FROM "session" 
       WHERE "userId" IN ('usr_test_pro', 'usr_demo_free') 
          OR "userId" IN (SELECT id FROM "user" WHERE LOWER(email) IN ('test@careerhound.io', 'demo@careerhound.io', 'livecandidate@testmail.com'))`
    );
    console.log(`Deleted ${delSess.rowCount} demo/test session record(s).`);

    // 4. Delete demo/test users from user table
    const delUser = await pool.query(
      `DELETE FROM "user" 
       WHERE LOWER(email) IN ('test@careerhound.io', 'demo@careerhound.io', 'livecandidate@testmail.com') 
          OR id IN ('usr_test_pro', 'usr_demo_free')`
    );
    console.log(`Deleted ${delUser.rowCount} demo/test user record(s).`);

    // Verify current user count
    const remainingUsers = await pool.query('SELECT id, name, email FROM "user"');
    console.log(`Remaining users in DB: ${remainingUsers.rows.length}`);
    if (remainingUsers.rows.length > 0) {
      console.table(remainingUsers.rows);
    } else {
      console.log('✅ Clean slate: 0 demo users in database. Ready for live real registrations!');
    }

  } catch (err) {
    console.error('Error purging demo users:', err);
  } finally {
    await pool.end();
  }
}

main();
