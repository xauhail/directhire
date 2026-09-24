import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function run() {
  const indexes = await pool.query(`
    SELECT tablename, indexname, indexdef 
    FROM pg_indexes 
    WHERE schemaname = 'public'
    ORDER BY tablename, indexname;
  `);
  console.log('--- Current Database Indexes ---');
  for (const idx of indexes.rows) {
    console.log(`[${idx.tablename}] ${idx.indexname}: ${idx.indexdef}`);
  }

  const tables = await pool.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    ORDER BY table_name;
  `);
  console.log('\n--- Public Tables ---');
  console.log(tables.rows.map(r => r.table_name).join(', '));

  await pool.end();
}

run().catch(console.error);
