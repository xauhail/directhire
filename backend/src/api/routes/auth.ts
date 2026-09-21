import { FastifyInstance, FastifyPluginAsync } from 'fastify';

// ─────────────────────────────────────────────────────────────────
// Test / Demo user accounts
// In production these would be stored in a database with hashed passwords
// ─────────────────────────────────────────────────────────────────
const TEST_USERS = [
  {
    id: 'user_test_001',
    email: 'test@careerhound.io',
    password: 'Career2024!',
    name: 'Alex Johnson',
    plan: 'pro_monthly',
    isSubscribed: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    onboardingCompleted: true,
    createdAt: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'user_test_002',
    email: 'demo@careerhound.io',
    password: 'Demo1234!',
    name: 'Jordan Smith',
    plan: 'free',
    isSubscribed: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    onboardingCompleted: false,
    createdAt: new Date().toISOString(),
  },
];

export const authRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  // ─── Login ───────────────────────────────────────────────────
  server.post<{ Body: { email: string; password: string } }>('/api/auth/login', async (req, reply) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return reply.status(400).send({ error: 'Email and password are required' });
    }

    const user = TEST_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return reply.status(401).send({ error: 'Invalid email or password' });
    }

    const { password: _pw, ...safeUser } = user;

    // In production, issue a signed JWT here
    const sessionToken = `ch_sess_${user.id}_${Date.now()}`;

    return reply.send({
      success: true,
      token: sessionToken,
      user: safeUser,
      redirectTo: safeUser.onboardingCompleted ? '/search' : '/onboarding',
    });
  });

  // ─── Get current user (using token from header) ───────────────
  server.get('/api/auth/me', async (req, reply) => {
    const token = (req.headers['authorization'] || '').replace('Bearer ', '');
    if (!token.startsWith('ch_sess_')) {
      return reply.status(401).send({ error: 'Unauthorized' });
    }

    // Extract user_id from token pattern: ch_sess_<userId>_<timestamp>
    const parts = token.split('_');
    const userId = parts.slice(2, parts.length - 1).join('_');
    const user = TEST_USERS.find(u => u.id === userId);

    if (!user) return reply.status(401).send({ error: 'Session expired' });
    const { password: _pw, ...safeUser } = user;
    return reply.send({ user: safeUser });
  });

  // ─── Register (mock) ──────────────────────────────────────────
  server.post<{ Body: { email: string; password: string; name: string } }>(
    '/api/auth/register',
    async (req, reply) => {
      const { email, name } = req.body || {};
      if (!email || !name) {
        return reply.status(400).send({ error: 'Email and name are required' });
      }

      // In production, create user in DB; here we just acknowledge
      const newUser = {
        id: `user_${Date.now()}`,
        email,
        name,
        plan: 'free',
        isSubscribed: false,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
      };

      const sessionToken = `ch_sess_${newUser.id}_${Date.now()}`;

      return reply.status(201).send({
        success: true,
        token: sessionToken,
        user: newUser,
        redirectTo: '/onboarding',
      });
    }
  );

  // ─── Test credentials info (dev only) ─────────────────────────
  server.get('/api/auth/test-credentials', async (_req, reply) => {
    return reply.send({
      message: 'Career Hound Test Credentials (dev only)',
      accounts: [
        {
          email: 'test@careerhound.io',
          password: 'Career2024!',
          plan: 'Pro Monthly (Subscribed)',
          note: 'Fully onboarded, subscribed user with full feature access',
        },
        {
          email: 'demo@careerhound.io',
          password: 'Demo1234!',
          plan: 'Free',
          note: 'New user, will redirect to onboarding after login',
        },
      ],
    });
  });
};
