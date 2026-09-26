"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutRoutes = void 0;
const dodoService_js_1 = require("../../services/dodoService.js");
const checkoutRoutes = async (server) => {
    // Get pricing plans
    server.get('/api/checkout/plans', async (_req, reply) => {
        return reply.send({
            plans: [
                {
                    id: 'weekly',
                    name: 'Weekly Sprint Pass',
                    price: 7.00,
                    interval: 'week',
                    features: [
                        'Direct unmasked ATS job links',
                        'Up to 15 AI Auto-Applies / day',
                        'Real-time Slack / Email alerts',
                        'Cancel anytime'
                    ]
                },
                {
                    id: 'monthly',
                    name: 'Monthly Pro (Most Popular)',
                    price: 20.00,
                    interval: 'month',
                    popular: true,
                    features: [
                        'Unlimited direct job feeds',
                        'Up to 50 AI Auto-Applies / day',
                        'Custom AI cover letters & ATS matching',
                        'Priority screening form solver',
                        'Instant Dodo Payments invoice & receipt'
                    ]
                },
                {
                    id: 'yearly',
                    name: '1-Year Unlimited Pass',
                    price: 99.00,
                    interval: 'year',
                    popular: false,
                    features: [
                        '1 full year of unlimited direct job listings',
                        'Up to 50 AI Auto-Applies / day',
                        'All current & future AI career tools',
                        'Save 58% compared to monthly billing'
                    ]
                }
            ]
        });
    });
    // Server-side in-memory Idempotency Cache (10 min TTL)
    const idempotencyCache = new Map();
    function cleanExpiredIdempotency() {
        const now = Date.now();
        for (const [key, val] of idempotencyCache.entries()) {
            if (val.expiresAt < now)
                idempotencyCache.delete(key);
        }
    }
    // Create Dodo Payments checkout session with idempotency guarantee
    server.post('/api/checkout', async (req, reply) => {
        try {
            cleanExpiredIdempotency();
            const idempKey = req.headers['idempotency-key'] || req.body?.idempotencyKey || '';
            const { planTier = 'monthly', email = '', name, returnUrl } = req.body || {};
            // If idempotent key exists and already processed, return cached response immediately
            if (idempKey && idempotencyCache.has(idempKey)) {
                const cached = idempotencyCache.get(idempKey);
                if (cached.expiresAt > Date.now()) {
                    return reply.send(cached.data);
                }
            }
            const session = await dodoService_js_1.DodoService.createCheckoutSession({
                planTier,
                customerEmail: email,
                customerName: name,
                returnUrl,
            });
            const responsePayload = {
                success: true,
                ...session,
            };
            if (idempKey) {
                idempotencyCache.set(idempKey, {
                    data: responsePayload,
                    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
                });
            }
            return reply.send(responsePayload);
        }
        catch (err) {
            server.log.error(err);
            return reply.status(500).send({ error: 'Failed to create checkout session', message: err.message });
        }
    });
};
exports.checkoutRoutes = checkoutRoutes;
