import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { DodoService } from '../../services/dodoService.js';

export const checkoutRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
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
  // Create Dodo Payments checkout session
  server.post<{ Body: { planTier: 'weekly' | 'monthly' | 'yearly' | 'lifetime'; email: string; name?: string; returnUrl?: string } }>(
    '/api/checkout',
    async (req, reply) => {
      try {
        const { planTier = 'monthly', email = '', name, returnUrl } = req.body || {};

        const session = await DodoService.createCheckoutSession({
          planTier,
          customerEmail: email,
          customerName: name,
          returnUrl,
        });

        return reply.send({
          success: true,
          ...session,
        });
      } catch (err: any) {
        server.log.error(err);
        return reply.status(500).send({ error: 'Failed to create checkout session', message: err.message });
      }
    }
  );
};
