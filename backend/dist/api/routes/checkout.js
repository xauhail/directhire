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
                    price: 12.99,
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
                    price: 34.99,
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
                    id: 'lifetime',
                    name: 'Lifetime All-Access Pass',
                    price: 149.00,
                    interval: 'one-time',
                    features: [
                        'Lifetime access to all direct listings',
                        'Unlimited AI Auto-Applies forever',
                        'All current & future Free Growth Tools',
                        'Zero recurring subscription charges'
                    ]
                }
            ]
        });
    });
    // Create Dodo Payments checkout session
    server.post('/api/checkout', async (req, reply) => {
        try {
            const { planTier = 'weekly', email, name, returnUrl } = req.body || {};
            if (!email) {
                return reply.status(400).send({ error: 'Customer email is required to initiate checkout.' });
            }
            const session = await dodoService_js_1.DodoService.createCheckoutSession({
                planTier,
                customerEmail: email,
                customerName: name,
                returnUrl,
            });
            return reply.send({
                success: true,
                ...session,
            });
        }
        catch (err) {
            server.log.error(err);
            return reply.status(500).send({ error: 'Failed to create checkout session', message: err.message });
        }
    });
};
exports.checkoutRoutes = checkoutRoutes;
