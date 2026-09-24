import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function run() {
  console.log('--- Applying Database Indexing & Idempotency Tables ---');

  // 1. Enable pg_trgm extension for ultra-fast ILIKE searches
  console.log('1. Enabling pg_trgm extension...');
  await pool.query(`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);

  // 2. Add GIN Trigram indexes on searchable text fields
  console.log('2. Creating GIN Trigram indexes on jobs.title, jobs.company_name, jobs.skills...');
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_jobs_title_trgm ON jobs USING gin (title gin_trgm_ops);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_jobs_company_name_trgm ON jobs USING gin (company_name gin_trgm_ops);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_jobs_skills_trgm ON jobs USING gin ((skills::text) gin_trgm_ops);`);

  // 3. Add functional & composite indexes for filters and sorting
  console.log('3. Creating functional & composite filter indexes...');
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_jobs_taxonomy_lower ON jobs (LOWER(taxonomy));`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_jobs_salary ON jobs (salary_min, salary_max);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_jobs_is_worldwide ON jobs (is_worldwide);`);
  
  // 4. Create partial index for verified direct apply jobs sorted by publication date
  console.log('4. Creating partial index for valid published direct ATS jobs...');
  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_jobs_valid_published ON jobs (published_at DESC) 
    WHERE application_url IS NOT NULL AND application_url != '' AND application_url != '#' AND application_url LIKE 'http%';
  `);

  // 5. Create Idempotency Keys table
  console.log('5. Creating idempotency_keys table...');
  await pool.query(`
    CREATE TABLE IF NOT EXISTS idempotency_keys (
      key VARCHAR(255) PRIMARY KEY,
      request_path VARCHAR(255) NOT NULL,
      response_status INTEGER NOT NULL,
      response_body TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_idempotency_created ON idempotency_keys (created_at);`);

  // 6. Create Webhook Events idempotency table
  console.log('6. Creating webhook_events idempotency table...');
  await pool.query(`
    CREATE TABLE IF NOT EXISTS webhook_events (
      event_id VARCHAR(255) PRIMARY KEY,
      event_type VARCHAR(100) NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'processed',
      payload JSONB,
      processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_webhook_events_processed ON webhook_events (processed_at);`);

  console.log('--- Verifying Indexes on jobs table ---');
  const check = await pool.query(`
    SELECT indexname, indexdef 
    FROM pg_indexes 
    WHERE tablename IN ('jobs', 'idempotency_keys', 'webhook_events')
    ORDER BY tablename, indexname;
  `);

  for (const row of check.rows) {
    console.log(`- ${row.indexname}: ${row.indexdef}`);
  }

  console.log('Migration completed successfully!');
  await pool.end();
}

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
