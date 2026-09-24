import { Pool } from '@neondatabase/serverless';

export interface IdempotencyRecord {
  key: string;
  requestPath: string;
  responseStatus: number;
  responseBody: string;
  createdAt: string;
}

/**
 * Checks if a mutation request with this idempotency key was already completed.
 */
export async function getIdempotencyRecord(db: Pool, key: string): Promise<IdempotencyRecord | null> {
  if (!db || !key) return null;
  try {
    const res = await db.query(
      `SELECT key, request_path, response_status, response_body, created_at 
       FROM idempotency_keys 
       WHERE key = $1 AND created_at > NOW() - INTERVAL '24 hours'`,
      [key]
    );
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return {
      key: row.key,
      requestPath: row.request_path,
      responseStatus: row.response_status,
      responseBody: row.response_body,
      createdAt: row.created_at,
    };
  } catch (err) {
    console.warn('[Idempotency] Failed to check key:', err);
    return null;
  }
}

/**
 * Saves the response of a successful or completed mutation with its idempotency key.
 */
export async function saveIdempotencyRecord(
  db: Pool,
  key: string,
  requestPath: string,
  status: number,
  body: string
): Promise<void> {
  if (!db || !key) return;
  try {
    await db.query(
      `INSERT INTO idempotency_keys (key, request_path, response_status, response_body, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (key) DO UPDATE 
       SET response_status = EXCLUDED.response_status,
           response_body = EXCLUDED.response_body,
           created_at = NOW()`,
      [key, requestPath, status, body]
    );
  } catch (err) {
    console.warn('[Idempotency] Failed to store key record:', err);
  }
}

/**
 * Checks if a webhook event ID has already been processed to prevent replay/duplicate triggers.
 */
export async function isWebhookEventProcessed(db: Pool, eventId: string): Promise<boolean> {
  if (!db || !eventId) return false;
  try {
    const res = await db.query(
      `SELECT event_id FROM webhook_events WHERE event_id = $1`,
      [eventId]
    );
    return res.rows.length > 0;
  } catch (err) {
    console.warn('[Idempotency] Failed to check webhook event:', err);
    return false;
  }
}

/**
 * Records that a webhook event has been successfully handled.
 */
export async function recordWebhookEvent(
  db: Pool,
  eventId: string,
  eventType: string,
  payload: any
): Promise<void> {
  if (!db || !eventId) return;
  try {
    await db.query(
      `INSERT INTO webhook_events (event_id, event_type, status, payload, processed_at)
       VALUES ($1, $2, 'processed', $3, NOW())
       ON CONFLICT (event_id) DO NOTHING`,
      [eventId, eventType, JSON.stringify(payload || {})]
    );
  } catch (err) {
    console.warn('[Idempotency] Failed to record webhook event:', err);
  }
}
