import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { db, auth, getAuthUser } from '../../auth.js';

export const authRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  // ─── Direct Login Handler (Better Auth backed) ─────────────────────────
  server.post<{ Body: { email: string; password: string } }>('/api/auth/login', async (req, reply) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return reply.status(400).send({ error: 'Email and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();

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
    } catch (err: any) {
      server.log.warn({ err: err.message }, '[Auth] Sign in failed');
      return reply.status(401).send({ error: 'Invalid email or password' });
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
};
