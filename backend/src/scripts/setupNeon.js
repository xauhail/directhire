/**
 * Career Hound — One-Click Neon PostgreSQL Setup Script
 *
 * Usage:
 *   node src/scripts/setupNeon.js [optional_neon_database_url]
 *
 * If no argument is provided, reads DATABASE_URL from .env
 */

const dotenv = require('dotenv');
const { Pool } = require('pg');
const { ALL_SEED_JOBS } = require('../db/seedJobs');

dotenv.config({ path: '.env' });

const connectionString = process.argv[2] || process.env.DATABASE_URL;

if (!connectionString) {
  console.error('\n❌ ERROR: No DATABASE_URL provided!');
  console.error('Please pass your Neon connection string as an argument, or set it in backend/.env:');
  console.error('  node src/scripts/setupNeon.js "postgresql://user:pass@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require"\n');
  process.exit(1);
}

const isNeon = connectionString.includes('neon.tech') || connectionString.includes('sslmode=require');
const pool = new Pool({
  connectionString,
  ssl: isNeon ? { rejectUnauthorized: false } : false,
});

async function main() {
  console.log('\n🚀 Career Hound — Initializing Database on Neon Serverless PostgreSQL');
  console.log(`📡 Connecting to: ${connectionString.replace(/:[^:@]+@/, ':***@')} ...`);

  try {
    const testRes = await pool.query('SELECT current_database(), version()');
    console.log(`✅ Connected successfully to database: ${testRes.rows[0].current_database}`);

    // 1. Create Better Auth tables
    console.log('\n📦 Step 1/4: Creating Better Auth tables (user, session, account, verification)...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "user" (
        "id" TEXT PRIMARY KEY,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL UNIQUE,
        "emailVerified" BOOLEAN NOT NULL DEFAULT false,
        "image" TEXT,
        "plan" TEXT DEFAULT 'free',
        "isSubscribed" BOOLEAN DEFAULT false,
        "onboardingCompleted" BOOLEAN DEFAULT false,
        "subscriptionId" TEXT,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS "session" (
        "id" TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
        "token" TEXT NOT NULL UNIQUE,
        "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL,
        "ipAddress" TEXT,
        "userAgent" TEXT,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS "account" (
        "id" TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
        "accountId" TEXT NOT NULL,
        "providerId" TEXT NOT NULL,
        "accessToken" TEXT,
        "refreshToken" TEXT,
        "idToken" TEXT,
        "accessTokenExpiresAt" TIMESTAMP WITH TIME ZONE,
        "refreshTokenExpiresAt" TIMESTAMP WITH TIME ZONE,
        "scope" TEXT,
        "password" TEXT,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS "verification" (
        "id" TEXT PRIMARY KEY,
        "identifier" TEXT NOT NULL,
        "value" TEXT NOT NULL,
        "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Better Auth tables verified.');

    // 2. Create Jobs Table
    console.log('\n📦 Step 2/4: Creating jobs table & performance indexes...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        company_slug VARCHAR(100) NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        company_industry VARCHAR(100),
        company_logo TEXT,
        company_website TEXT,
        description_excerpt TEXT NOT NULL,
        description_full TEXT,
        work_arrangement VARCHAR(50) NOT NULL,
        employment_types JSONB NOT NULL DEFAULT '["full-time"]'::jsonb,
        experience_level VARCHAR(50) NOT NULL,
        education_level VARCHAR(50) DEFAULT 'bachelor-degree',
        taxonomy VARCHAR(100) NOT NULL,
        locations JSONB NOT NULL DEFAULT '["Worldwide"]'::jsonb,
        is_worldwide BOOLEAN DEFAULT true,
        salary_currency VARCHAR(10) DEFAULT 'USD',
        salary_min INTEGER DEFAULT 0,
        salary_max INTEGER DEFAULT 0,
        salary_unit VARCHAR(20) DEFAULT 'YEAR',
        skills JSONB NOT NULL DEFAULT '[]'::jsonb,
        application_url TEXT,
        direct_apply_source VARCHAR(50) DEFAULT 'company-direct',
        published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_jobs_taxonomy ON jobs(taxonomy);
      CREATE INDEX IF NOT EXISTS idx_jobs_work_arrangement ON jobs(work_arrangement);
      CREATE INDEX IF NOT EXISTS idx_jobs_experience ON jobs(experience_level);
      CREATE INDEX IF NOT EXISTS idx_jobs_published ON jobs(published_at DESC);
      CREATE INDEX IF NOT EXISTS idx_jobs_company_slug ON jobs(company_slug);
    `);
    console.log('✅ Jobs table & indexes verified.');

    // 3. Create Onboarding Profiles Table
    console.log('\n📦 Step 3/4: Creating onboarding_profiles table...');
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
    console.log('✅ Onboarding profiles table verified.');

    // 4. Seed Verified ATS Jobs
    console.log(`\n📦 Step 4/4: Seeding ${ALL_SEED_JOBS.length} verified direct ATS jobs...`);
    for (const job of ALL_SEED_JOBS) {
      await pool.query(`
        INSERT INTO jobs (
          id, title, company_slug, company_name, company_industry,
          company_logo, company_website, description_excerpt, description_full,
          work_arrangement, employment_types, experience_level, education_level,
          taxonomy, locations, is_worldwide, salary_currency, salary_min,
          salary_max, salary_unit, skills, application_url, direct_apply_source,
          published_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24
        ) ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          description_excerpt = EXCLUDED.description_excerpt,
          salary_min = EXCLUDED.salary_min,
          salary_max = EXCLUDED.salary_max,
          skills = EXCLUDED.skills,
          application_url = EXCLUDED.application_url;
      `, [
        job.id,
        job.title,
        job.company_slug,
        job.company_name,
        job.company_industry,
        job.company_logo,
        job.company_website,
        job.description_excerpt,
        job.description_full,
        job.work_arrangement,
        typeof job.employment_types === 'string' ? job.employment_types : JSON.stringify(job.employment_types || ['full-time']),
        job.experience_level,
        job.education_level || 'bachelor-degree',
        job.taxonomy,
        typeof job.locations === 'string' ? job.locations : JSON.stringify(job.locations || ['Worldwide']),
        job.is_worldwide ?? true,
        job.salary_currency || 'USD',
        job.salary_min || 0,
        job.salary_max || 0,
        job.salary_unit || 'YEAR',
        typeof job.skills === 'string' ? job.skills : JSON.stringify(job.skills || []),
        job.application_url,
        job.direct_apply_source || 'company-direct',
        job.published_at || new Date()
      ]);
    }

    const countRes = await pool.query('SELECT COUNT(*) FROM jobs');
    console.log(`✅ Successfully seeded ${countRes.rows[0].count} verified jobs!`);

    // 5. Schema and verified jobs ready for production
    console.log('✅ Database schema verified. Production accounts ready for live user registration.');

    console.log('\n🎉 ALL DONE! Your Neon database is completely set up and ready for Cloudflare deployment!\n');
  } catch (err) {
    console.error('\n❌ Setup error:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
