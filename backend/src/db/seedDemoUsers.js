import { config } from '../../dist/config/env.js';
import { auth } from '../../dist/auth.js';
import pg from 'pg';

async function seedDemoUsers() {
  const uri = config.databaseUrl || process.env.DATABASE_URL;
  const pool = new pg.Pool({ 
    connectionString: uri,
    ssl: (uri && (uri.includes('neon.tech') || uri.includes('sslmode=require'))) ? { rejectUnauthorized: false } : false
  });

  try {
    console.log('[Seed] Connecting to PostgreSQL to sync demo accounts...');

    // 1. Ensure test@careerhound.io exists
    let testUser = await pool.query('SELECT * FROM "user" WHERE LOWER(email) = $1', ['test@careerhound.io']);
    if (testUser.rows.length === 0) {
      console.log('[Seed] Creating test@careerhound.io via Better Auth...');
      try {
        await auth.api.signUpEmail({
          body: {
            email: 'test@careerhound.io',
            password: 'Career2024!',
            name: 'Alex Johnson',
          },
        });
      } catch (e) {
        console.warn('[Seed] Note on creating test@careerhound.io:', e.message);
      }
    }

    // 2. Ensure demo@careerhound.io exists
    let demoUser = await pool.query('SELECT * FROM "user" WHERE LOWER(email) = $1', ['demo@careerhound.io']);
    if (demoUser.rows.length === 0) {
      console.log('[Seed] Creating demo@careerhound.io via Better Auth...');
      try {
        await auth.api.signUpEmail({
          body: {
            email: 'demo@careerhound.io',
            password: 'Demo1234!',
            name: 'Jordan Smith',
          },
        });
      } catch (e) {
        console.warn('[Seed] Note on creating demo@careerhound.io:', e.message);
      }
    }

    // 3. Update test user to be an active PRO subscribed & onboarded user
    await pool.query(`
      UPDATE "user"
      SET 
        "name" = 'Alex Johnson',
        "plan" = 'pro_monthly',
        "isSubscribed" = true,
        "onboardingCompleted" = true,
        "subscriptionId" = 'sub_active_pro_monthly'
      WHERE LOWER(email) = 'test@careerhound.io'
    `);
    console.log('[Seed] Updated test@careerhound.io -> plan: pro_monthly, isSubscribed: true, onboardingCompleted: true');

    // 4. Update demo user to be a free user
    await pool.query(`
      UPDATE "user"
      SET 
        "name" = 'Jordan Smith',
        "plan" = 'free',
        "isSubscribed" = false,
        "onboardingCompleted" = false
      WHERE LOWER(email) = 'demo@careerhound.io'
    `);
    console.log('[Seed] Updated demo@careerhound.io -> plan: free, isSubscribed: false, onboardingCompleted: false');

    // 5. Create a default onboarding profile for test@careerhound.io if none exists
    const testUserRow = await pool.query('SELECT id FROM "user" WHERE LOWER(email) = $1', ['test@careerhound.io']);
    if (testUserRow.rows.length > 0) {
      const uId = testUserRow.rows[0].id;
      await pool.query(`
        INSERT INTO onboarding_profiles (
          id, user_id, email, target_titles, work_arrangements, is_worldwide, locations,
          experience_level, education_level, min_salary, salary_currency, salary_unit, skills, resume_text
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
        )
        ON CONFLICT (id) DO UPDATE SET
          target_titles = EXCLUDED.target_titles,
          skills = EXCLUDED.skills,
          min_salary = EXCLUDED.min_salary,
          updated_at = NOW();
      `, [
        `onb_${uId}`,
        uId,
        'test@careerhound.io',
        JSON.stringify(['Full Stack Engineer', 'Senior Software Engineer']),
        JSON.stringify(['remote-ok', 'hybrid']),
        true,
        JSON.stringify(['Worldwide', 'United States']),
        '5-to-10',
        'bachelor-degree',
        140000,
        'USD',
        'year',
        JSON.stringify(['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS']),
        'Alex Johnson | Full Stack Software Engineer | React, Node.js, PostgreSQL, AWS'
      ]);
      console.log('[Seed] Created / updated onboarding profile for test@careerhound.io');
    }

    console.log('[Seed] Demo accounts successfully configured in PostgreSQL.');
  } catch (err) {
    console.error('[Seed] Error seeding demo accounts:', err);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

seedDemoUsers();
