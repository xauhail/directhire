"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdempotencyService = void 0;
class IdempotencyService {
    /**
     * Checks if an idempotency key was previously processed within the last 24h
     */
    static async getRecord(db, key) {
        if (!db || !key)
            return null;
        try {
            const res = await db.query(`SELECT key, request_path, response_status, response_body, created_at 
         FROM idempotency_keys 
         WHERE key = $1 AND created_at > NOW() - INTERVAL '24 hours'`, [key]);
            if (res.rows.length === 0)
                return null;
            return res.rows[0];
        }
        catch (err) {
            console.warn('[IdempotencyService] Failed to check key:', err);
            return null;
        }
    }
    /**
     * Saves the response for an idempotency key
     */
    static async saveRecord(db, key, requestPath, status, body) {
        if (!db || !key)
            return;
        try {
            await db.query(`INSERT INTO idempotency_keys (key, request_path, response_status, response_body, created_at)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (key) DO UPDATE 
         SET response_status = EXCLUDED.response_status,
             response_body = EXCLUDED.response_body,
             created_at = NOW()`, [key, requestPath, status, body]);
        }
        catch (err) {
            console.warn('[IdempotencyService] Failed to save record:', err);
        }
    }
    /**
     * Checks if a webhook event ID has already been recorded
     */
    static async isWebhookProcessed(db, eventId) {
        if (!db || !eventId)
            return false;
        try {
            const res = await db.query(`SELECT event_id FROM webhook_events WHERE event_id = $1`, [eventId]);
            return res.rows.length > 0;
        }
        catch (err) {
            console.warn('[IdempotencyService] Failed to check webhook event:', err);
            return false;
        }
    }
    /**
     * Records a processed webhook event
     */
    static async recordWebhook(db, eventId, eventType, payload) {
        if (!db || !eventId)
            return;
        try {
            await db.query(`INSERT INTO webhook_events (event_id, event_type, status, payload, processed_at)
         VALUES ($1, $2, 'processed', $3, NOW())
         ON CONFLICT (event_id) DO NOTHING`, [eventId, eventType, JSON.stringify(payload || {})]);
        }
        catch (err) {
            console.warn('[IdempotencyService] Failed to record webhook event:', err);
        }
    }
}
exports.IdempotencyService = IdempotencyService;
