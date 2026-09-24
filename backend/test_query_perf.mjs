import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function run() {
  const start = Date.now();
  const res = await pool.query(`
    EXPLAIN ANALYZE
    SELECT * FROM jobs 
    WHERE application_url IS NOT NULL AND application_url != '' AND application_url != '#' AND application_url LIKE 'http%'
    AND id NOT LIKE 'ch-%'
    ORDER BY published_at DESC 
    LIMIT 10 OFFSET 0;
  `);
  console.log('Query latency (including network roundtrip):', Date.now() - start, 'ms');
  console.log(res.rows.map(r => r['QUERY PLAN']).join('\n'));

  // Also test trigram search
  const tStart = Date.now();
  const tRes = await pool.query(`
    EXPLAIN ANALYZE
    SELECT * FROM jobs 
    WHERE (title ILIKE '%engineer%' OR company_name ILIKE '%anthropic%')
    AND application_url IS NOT NULL AND application_url != '' AND application_url != '#' AND application_url LIKE 'http%'
    ORDER BY published_at DESC 
    LIMIT 10;
  `);
  console.log('\nSearch query latency:', Date.now() - tStart, 'ms');
  console.log(tRes.rows.map(r => r['QUERY PLAN']).join('\n'));

  await pool.end();
}

run().catch(console.error);
