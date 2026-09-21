"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookRoutes = void 0;
const dodoService_js_1 = require("../../services/dodoService.js");
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
        server.log.info(`[Dodo Webhook] Event received: ${eventType}`);
        switch (eventType) {
            case 'subscription.active':
            case 'payment.succeeded':
                server.log.info(`[Dodo Webhook] User ${payload?.data?.customer?.email || 'customer'} activated premium subscription.`);
                break;
            case 'subscription.renewed':
                server.log.info(`[Dodo Webhook] Subscription renewed for ${payload?.data?.customer?.email}.`);
                break;
            case 'subscription.cancelled':
            case 'subscription.past_due':
                server.log.info(`[Dodo Webhook] Subscription suspended for ${payload?.data?.customer?.email}.`);
                break;
            default:
                server.log.info(`[Dodo Webhook] Unhandled event: ${eventType}`);
        }
        return reply.send({ received: true });
    });
};
exports.webhookRoutes = webhookRoutes;
