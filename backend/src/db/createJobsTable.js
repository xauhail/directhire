require('dotenv').config({ path: '.env' });
const { Client } = require('pg');

async function createJobsTable() {
  const uri = process.env.DATABASE_URL || 'postgresql://postgres:50h41L%40$$@localhost:5432/careerhound';
  const client = new Client({ 
    connectionString: uri,
    ssl: uri.includes('neon.tech') || uri.includes('sslmode=require') ? { rejectUnauthorized: false } : false
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Create jobs table
    await client.query(`
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

    console.log('Table "jobs" created or verified successfully!');
    await client.end();
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  }
}

createJobsTable();
