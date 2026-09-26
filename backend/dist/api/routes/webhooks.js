"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookRoutes = void 0;
const dodoService_js_1 = require("../../services/dodoService.js");
const idempotencyService_js_1 = require("../../services/idempotencyService.js");
const webhookRoutes = async (server) => {
    // Dodo Payments Webhook Receiver
    server.post('/api/webhooks/dodo', async (req, reply) => {
        const signature = req.headers['webhook-signature'] || req.headers['x-dodo-signature'];
        const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
        const isValid = dodoService_js_1.DodoService.verifyWebhook(rawBody, signature);
        if (!isValid) {
            server.log.warn('[Dodo Webhook] Invalid signature received.');
            return reply.status(401).send({ error: 'Invalid webhook signature.' });
        }
        const payload = req.body;
        const eventType = payload?.event || payload?.type || 'unknown';
        const customerEmail = payload?.data?.customer?.email || payload?.data?.email;
        const subscriptionId = payload?.data?.subscription_id || payload?.data?.id;
        const eventId = payload?.webhook_id ||
            payload?.event_id ||
            payload?.data?.id ||
            req.headers['webhook-id'] ||
            (customerEmail ? `${customerEmail}_${eventType}_${subscriptionId || 'sub'}` : null);
        const db = server.db;
        if (db && eventId) {
            const alreadyProcessed = await idempotencyService_js_1.IdempotencyService.isWebhookProcessed(db, eventId);
            if (alreadyProcessed) {
                server.log.info(`[Dodo Webhook] Deduplicated already processed event: ${eventId}`);
                return reply.send({ received: true, deduplicated: true });
            }
        }
        server.log.info(`[Dodo Webhook] Event received: ${eventType}`);
        switch (eventType) {
            case 'subscription.active':
            case 'payment.succeeded':
                server.log.info(`[Dodo Webhook] User ${customerEmail || 'customer'} activated premium subscription.`);
                if (db && customerEmail) {
                    await db.query(`
            UPDATE "user"
            SET "isSubscribed" = true, "plan" = 'pro_monthly', "subscriptionId" = COALESCE($1, "subscriptionId"), "updatedAt" = NOW()
            WHERE LOWER(email) = LOWER($2)
          `, [subscriptionId || null, customerEmail]);
                }
                break;
            case 'subscription.renewed':
                server.log.info(`[Dodo Webhook] Subscription renewed for ${customerEmail}.`);
                if (db && customerEmail) {
                    await db.query(`
            UPDATE "user"
            SET "isSubscribed" = true, "updatedAt" = NOW()
            WHERE LOWER(email) = LOWER($1)
          `, [customerEmail]);
                }
                break;
            case 'subscription.cancelled':
            case 'subscription.past_due':
                server.log.info(`[Dodo Webhook] Subscription suspended for ${customerEmail}.`);
                if (db && customerEmail) {
                    await db.query(`
            UPDATE "user"
            SET "isSubscribed" = false, "plan" = 'free', "updatedAt" = NOW()
            WHERE LOWER(email) = LOWER($1)
          `, [customerEmail]);
                }
                break;
            default:
                server.log.info(`[Dodo Webhook] Unhandled event: ${eventType}`);
        }
        if (db && eventId) {
            await idempotencyService_js_1.IdempotencyService.recordWebhook(db, eventId, eventType, payload);
        }
        return reply.send({ received: true });
    });
};
exports.webhookRoutes = webhookRoutes;
