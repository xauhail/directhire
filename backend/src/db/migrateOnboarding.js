import { config } from '../../dist/config/env.js';
import pg from 'pg';

async function migrateOnboarding() {
  const uri = config.databaseUrl || process.env.DATABASE_URL;
  const pool = new pg.Pool({ 
    connectionString: uri,
    ssl: (uri && (uri.includes('neon.tech') || uri.includes('sslmode=require'))) ? { rejectUnauthorized: false } : false
  });
  try {
    console.log('[Migration] Connecting to PostgreSQL at:', config.databaseUrl.replace(/:[^:@]+@/, ':***@'));
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS onboarding_profiles (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        email TEXT,
        target_titles JSONB,
        work_arrangements JSONB,
        is_worldwide BOOLEAN DEFAULT true,
        locations JSONB,
        experience_level VARCHAR(50),
        education_level VARCHAR(50),
        min_salary INTEGER,
        salary_currency VARCHAR(10) DEFAULT 'USD',
        salary_unit VARCHAR(10) DEFAULT 'year',
        skills JSONB,
        resume_text TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_onboarding_user_id ON onboarding_profiles(user_id);
      CREATE INDEX IF NOT EXISTS idx_onboarding_email ON onboarding_profiles(email);
    `);

    console.log('[Migration] onboarding_profiles table created successfully.');
  } catch (err) {
    console.error('[Migration] Failed to migrate onboarding_profiles table:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrateOnboarding();
