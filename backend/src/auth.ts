/**
 * Better Auth — Core Auth Instance
 *
 * This file configures the Better Auth authentication engine.
 * It connects to PostgreSQL via the `pg` Pool and exposes:
 *  - Email/password sign-up & sign-in
 *  - Session management (cookie-based, httpOnly)
 *  - Custom user fields (plan, onboardingCompleted)
 *
 * Better Auth auto-creates these tables in PostgreSQL via CLI:
 *   npx @better-auth/cli migrate
 *
 * Tables created:
 *  - user        (id, name, email, emailVerified, image, createdAt, updatedAt, + custom fields)
 *  - session     (id, userId, token, expiresAt, ipAddress, userAgent, createdAt, updatedAt)
 *  - account     (id, userId, accountId, providerId, accessToken, ...)
 *  - verification (id, identifier, value, expiresAt, createdAt, updatedAt)
 */

import { betterAuth } from 'better-auth';
import { jwt } from 'better-auth/plugins';
import { mcp } from '@better-auth/mcp';
import { cimd } from '@better-auth/cimd';
import { fetchClientMetadataResource } from '@better-auth/cimd/node';
import { fromNodeHeaders } from 'better-auth/node';
import { Pool } from 'pg';
import { config } from './config/env.js';


// ── PostgreSQL Pool ──────────────────────────────────────────────────────────
// Connects to PostgreSQL when a valid DATABASE_URL is configured.
// If placeholder password is still present, falls back gracefully to in-memory store.
let pool: Pool | null = null;
const hasPlaceholderPassword = config.databaseUrl?.includes(':password@');

if (config.databaseUrl && !hasPlaceholderPassword) {
  pool = new Pool({
    connectionString: config.databaseUrl,
    ssl: config.environment === 'production' ? { rejectUnauthorized: false } : false,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  pool.on('error', (err) => {
    console.error('[PostgreSQL] Unexpected pool error:', err.message);
  });

  console.log('[Auth] PostgreSQL pool initialized for Better Auth');
} else if (hasPlaceholderPassword) {
  console.warn('[Auth] DATABASE_URL in .env has default placeholder (:password@). Set your actual PostgreSQL password in backend/.env to connect.');
  console.log('[Auth] Running with Better Auth built-in store until PostgreSQL credentials are saved.');
} else {
  console.warn('[Auth] DATABASE_URL not set — Better Auth running with built-in store.');
}

// ── Better Auth Instance ─────────────────────────────────────────────────────
export const auth = betterAuth({
  // Connect to PostgreSQL pool when available, otherwise built-in store
  ...(pool ? { database: pool } : {}),

  // Secret used to sign session tokens (must be 32+ chars in production)
  secret: config.betterAuthSecret,

  // The public URL of this backend — used for cookie domains and redirects
  baseURL: config.betterAuthUrl,

  // ── Plugins: JWT, MCP Server, CIMD Client Metadata ────────────────────────
  plugins: [
    jwt(),
    mcp({
      loginPage: '/signin',
      consentPage: '/consent',
      resource: `${config.betterAuthUrl}/api/mcp`,
    }),
    cimd({
      fetchClientMetadataResource,
      metadataProfile: 'mcp-2026-07-28',
    }),
  ],

  // ── Email & Password ───────────────────────────────────────────────────────
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set true in production
    minPasswordLength: 8,
  },

  // ── Session Configuration ─────────────────────────────────────────────────
  session: {
    expiresIn: 60 * 60 * 24 * 30,         // 30 days
    updateAge: 60 * 60 * 24,               // Refresh if >1 day old
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,                       // 5 min client-side cache
    },
  },

  // ── Cookie Settings ───────────────────────────────────────────────────────
  advanced: {
    crossSubDomainCookies: {
      enabled: false,
    },
    defaultCookieAttributes: {
      secure: config.environment === 'production',
      httpOnly: true,
      sameSite: 'lax',
    },
  },

  // ── Trusted Origins (CORS for auth cookies) ───────────────────────────────
  trustedOrigins: [
    config.frontendUrl,
    'http://localhost:4321',
    'http://localhost:4000',
  ],

  // ── Custom User Fields ────────────────────────────────────────────────────
  // These extend the `user` table with career-specific columns
  user: {
    additionalFields: {
      plan: {
        type: 'string',
        defaultValue: 'free',
        required: false,
      },
      isSubscribed: {
        type: 'boolean',
        defaultValue: false,
        required: false,
      },
      onboardingCompleted: {
        type: 'boolean',
        defaultValue: false,
        required: false,
      },
      subscriptionId: {
        type: 'string',
        required: false,
      },
    },
  },
});

// ── Export the pg pool for use in other services ─────────────────────────────
export { pool as db };

// ── Auth session helper for Fastify routes ───────────────────────────────────
export async function getAuthUser(req: any) {
  try {
    const headers = fromNodeHeaders(req.headers || {});
    const session = await auth.api.getSession({ headers });
    if (session?.user) {
      return session.user;
    }
  } catch (_) {}

  try {
    const authHeader = req.headers?.authorization;
    const token = authHeader?.replace('Bearer ', '') || req.cookies?.['better-auth.session_token'] || req.cookies?.['ch_token'];
    if (token && pool) {
      const sessRes = await pool.query(
        'SELECT u.* FROM session s JOIN "user" u ON s."userId" = u.id WHERE s.token = $1 AND s."expiresAt" > NOW()',
        [token]
      );
      if (sessRes.rows.length > 0) {
        return sessRes.rows[0];
      }
    }
  } catch (_) {}

  return null;
}

// ── Type helper ──────────────────────────────────────────────────────────────
export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;

