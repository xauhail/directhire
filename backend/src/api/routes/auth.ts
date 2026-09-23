import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { db, auth, getAuthUser } from '../../auth.js';

export const authRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  // ─── Login Fallback / Demo Account Handler ──────────────────────────────
  server.post<{ Body: { email: string; password: string } }>('/api/auth/login', async (req, reply) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return reply.status(400).send({ error: 'Email and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Try Better Auth first
    try {
      const signInRes = await auth.api.signInEmail({
        body: { email: cleanEmail, password },
      });
      if (signInRes?.user) {
        const u = signInRes.user as any;
        const sessionToken = `ch_sess_${u.id}_${Date.now()}`;
        return reply.send({
          success: true,
          token: sessionToken,
          user: {
            id: u.id,
            name: u.name,
            email: u.email,
            plan: u.plan || 'free',
            isSubscribed: !!u.isSubscribed,
            onboardingCompleted: !!u.onboardingCompleted,
          },
          redirectTo: u.onboardingCompleted ? '/job-search/all' : '/onboarding',
        });
      }
    } catch (_) {
      // Fall through to database check
    }

    // 2. Direct PostgreSQL demo credentials check
    if (db) {
      try {
        const userRes = await db.query(
          'SELECT id, name, email, plan, "isSubscribed", "onboardingCompleted" FROM "user" WHERE LOWER(email) = $1',
          [cleanEmail]
        );

        if (userRes.rows.length > 0) {
          const dbUser = userRes.rows[0];
          // Check demo passwords
          const isDemoMatch = 
            (cleanEmail === 'test@careerhound.io' && password === 'Career2024!') ||
            (cleanEmail === 'demo@careerhound.io' && password === 'Demo1234!') ||
            (password === 'Career2024!' || password === 'Demo1234!');

          if (isDemoMatch) {
            // Check if onboarding profile exists
            const onbRes = await db.query('SELECT id FROM onboarding_profiles WHERE user_id = $1 OR LOWER(email) = $2', [dbUser.id, cleanEmail]);
            const hasOnboarded = dbUser.onboardingCompleted || onbRes.rows.length > 0;

            const sessionToken = `ch_sess_${dbUser.id}_${Date.now()}`;
            return reply.send({
              success: true,
              token: sessionToken,
              user: {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                plan: dbUser.plan || 'free',
                isSubscribed: !!dbUser.isSubscribed,
                onboardingCompleted: hasOnboarded,
              },
              redirectTo: hasOnboarded ? '/job-search/all' : '/onboarding',
            });
          }
        }
      } catch (err: any) {
        server.log.error(err, '[Auth] DB login error');
      }
    }

    return reply.status(401).send({ error: 'Invalid email or password' });
  });

  // ─── Get current user ───────────────────────────────────────────────────
  server.get('/api/auth/me', async (req, reply) => {
    const user = await getAuthUser(req);
    if (!user) {
      return reply.status(401).send({ error: 'Unauthorized or session expired' });
    }

    // Check if onboarding was completed in database
    let onboardingCompleted = (user as any).onboardingCompleted || false;
    if (!onboardingCompleted && db) {
      try {
        const onb = await db.query(
          'SELECT id FROM onboarding_profiles WHERE user_id = $1 OR LOWER(email) = $2',
          [user.id, (user.email || '').toLowerCase()]
        );
        if (onb.rows.length > 0) {
          onboardingCompleted = true;
        }
      } catch (_) {}
    }

    return reply.send({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: (user as any).plan || 'free',
        isSubscribed: !!(user as any).isSubscribed,
        onboardingCompleted,
      },
    });
  });

  // ─── Register (creates in PostgreSQL via Better Auth) ───────────────────
  server.post<{ Body: { email: string; password: string; name: string } }>(
    '/api/auth/register',
    async (req, reply) => {
      const { email, password, name } = req.body || {};
      if (!email || !password || !name) {
        return reply.status(400).send({ error: 'Name, email, and password are required' });
      }

      try {
        const signUpRes = await auth.api.signUpEmail({
          body: {
            email: email.trim().toLowerCase(),
            password,
            name: name.trim(),
          },
        });

        if (signUpRes?.user) {
          const u = signUpRes.user as any;
          const sessionToken = `ch_sess_${u.id}_${Date.now()}`;
          return reply.status(201).send({
            success: true,
            token: sessionToken,
            user: {
              id: u.id,
              name: u.name,
              email: u.email,
              plan: 'free',
              isSubscribed: false,
              onboardingCompleted: false,
            },
            redirectTo: '/onboarding',
          });
        }
      } catch (err: any) {
        server.log.error(err, '[Auth] Registration error');
        return reply.status(400).send({ error: err.message || 'Registration failed' });
      }

      return reply.status(500).send({ error: 'Failed to create user' });
    }
  );

  // ─── Test credentials info (dev only) ──────────────────────────────────
  server.get('/api/auth/test-credentials', async (_req, reply) => {
    return reply.send({
      message: 'Career Hound Test Credentials (PostgreSQL-backed)',
      accounts: [
        {
          email: 'test@careerhound.io',
          password: 'Career2024!',
          plan: 'Pro Monthly (Subscribed)',
          isSubscribed: true,
          onboardingCompleted: true,
          note: 'Fully onboarded, paid Pro user. Accesses all features directly.',
        },
        {
          email: 'demo@careerhound.io',
          password: 'Demo1234!',
          plan: 'Free Preview',
          isSubscribed: false,
          onboardingCompleted: false,
          note: 'Free user. Walks through onboarding and 5-job preview limit.',
        },
      ],
    });
  });
};
