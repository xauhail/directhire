import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function decodeHtml(html) {
  if (!html) return '';
  return html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function cleanToPlainText(html) {
  if (!html) return '';
  const decoded = decodeHtml(html);
  return decoded
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function clean() {
  try {
    console.log('[DB Clean] Cleaning job descriptions, decoding HTML, removing hyphens...');

    // 1. Clean work arrangements and employment types
    await pool.query(`
      UPDATE jobs SET work_arrangement = 'On site' WHERE work_arrangement = 'On-site';
      UPDATE jobs SET employment_types = '["Full time"]'::jsonb WHERE employment_types::text ILIKE '%full-time%';
      UPDATE jobs SET employment_types = '["Part time"]'::jsonb WHERE employment_types::text ILIKE '%part-time%';
    `);

    // 2. Fetch all jobs to clean descriptions
    const { rows } = await pool.query('SELECT id, description_excerpt, description_full FROM jobs');
    console.log(`[DB Clean] Processing ${rows.length} jobs...`);

    let updatedCount = 0;
    for (const row of rows) {
      const decodedFull = decodeHtml(row.description_full || row.description_excerpt || '');
      const plainExcerpt = cleanToPlainText(row.description_excerpt || decodedFull);

      // Clean truncation at last space before 320 chars
      let truncatedExcerpt = plainExcerpt;
      if (truncatedExcerpt.length > 320) {
        const lastSpace = truncatedExcerpt.lastIndexOf(' ', 320);
        truncatedExcerpt = (lastSpace > 200 ? truncatedExcerpt.slice(0, lastSpace) : truncatedExcerpt.slice(0, 320)) + '...';
      }

      await pool.query(
        'UPDATE jobs SET description_full = $1, description_excerpt = $2 WHERE id = $3',
        [decodedFull, truncatedExcerpt, row.id]
      );
      updatedCount++;
    }

    console.log(`✅ [DB Clean] Successfully cleaned ${updatedCount} jobs!`);
  } catch (err) {
    console.error('[DB Clean] Error:', err);
  } finally {
    await pool.end();
  }
}

clean();
