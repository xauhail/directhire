"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = void 0;
exports.getAuthUser = getAuthUser;
const better_auth_1 = require("better-auth");
const plugins_1 = require("better-auth/plugins");
const mcp_1 = require("@better-auth/mcp");
const cimd_1 = require("@better-auth/cimd");
const node_1 = require("@better-auth/cimd/node");
const node_2 = require("better-auth/node");
const pg_1 = require("pg");
const env_js_1 = require("./config/env.js");
// ── PostgreSQL Pool ──────────────────────────────────────────────────────────
// Connects to PostgreSQL when a valid DATABASE_URL is configured.
// If placeholder password is still present, falls back gracefully to in-memory store.
let pool = null;
exports.db = pool;
const hasPlaceholderPassword = env_js_1.config.databaseUrl?.includes(':password@');
if (env_js_1.config.databaseUrl && !hasPlaceholderPassword) {
    exports.db = pool = new pg_1.Pool({
        connectionString: env_js_1.config.databaseUrl,
        ssl: (env_js_1.config.databaseUrl?.includes('neon.tech') || env_js_1.config.databaseUrl?.includes('sslmode=require') || env_js_1.config.environment === 'production')
            ? { rejectUnauthorized: false }
            : false,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
    });
    pool.on('error', (err) => {
        console.error('[PostgreSQL] Unexpected pool error:', err.message);
    });
    console.log('[Auth] PostgreSQL pool initialized for Better Auth');
}
else if (hasPlaceholderPassword) {
    console.warn('[Auth] DATABASE_URL in .env has default placeholder (:password@). Set your actual PostgreSQL password in backend/.env to connect.');
    console.log('[Auth] Running with Better Auth built-in store until PostgreSQL credentials are saved.');
}
else {
    console.warn('[Auth] DATABASE_URL not set — Better Auth running with built-in store.');
}
// ── Better Auth Instance ─────────────────────────────────────────────────────
exports.auth = (0, better_auth_1.betterAuth)({
    // Connect to PostgreSQL pool when available, otherwise built-in store
    ...(pool ? { database: pool } : {}),
    // Secret used to sign session tokens (must be 32+ chars in production)
    secret: env_js_1.config.betterAuthSecret,
    // The public URL of this backend — used for cookie domains and redirects
    baseURL: env_js_1.config.betterAuthUrl,
    // ── Plugins: JWT, MCP Server, CIMD Client Metadata ────────────────────────
    plugins: [
        (0, plugins_1.jwt)(),
        (0, mcp_1.mcp)({
            loginPage: '/signin',
            consentPage: '/consent',
            resource: `${env_js_1.config.betterAuthUrl}/api/mcp`,
        }),
        (0, cimd_1.cimd)({
            fetchClientMetadataResource: node_1.fetchClientMetadataResource,
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
        expiresIn: 60 * 60 * 24 * 30, // 30 days
        updateAge: 60 * 60 * 24, // Refresh if >1 day old
        cookieCache: {
            enabled: true,
            maxAge: 60 * 5, // 5 min client-side cache
        },
    },
    // ── Cookie Settings ───────────────────────────────────────────────────────
    advanced: {
        crossSubDomainCookies: {
            enabled: false,
        },
        defaultCookieAttributes: {
            secure: env_js_1.config.environment === 'production',
            httpOnly: true,
            sameSite: 'lax',
        },
    },
    // ── Trusted Origins (CORS for auth cookies) ───────────────────────────────
    trustedOrigins: [
        env_js_1.config.frontendUrl,
        'https://careerhound-7sx.pages.dev',
        'https://careerhound.pages.dev',
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
// ── Auth session helper for Fastify routes ───────────────────────────────────
async function getAuthUser(req) {
    try {
        const headers = (0, node_2.fromNodeHeaders)(req.headers || {});
        const session = await exports.auth.api.getSession({ headers });
        if (session?.user) {
            return session.user;
        }
    }
    catch (_) { }
    try {
        const authHeader = req.headers?.authorization;
        const token = authHeader?.replace('Bearer ', '') || req.cookies?.['better-auth.session_token'] || req.cookies?.['ch_token'];
        if (token && pool) {
            const sessRes = await pool.query('SELECT u.* FROM session s JOIN "user" u ON s."userId" = u.id WHERE s.token = $1 AND s."expiresAt" > NOW()', [token]);
            if (sessRes.rows.length > 0) {
                return sessRes.rows[0];
            }
        }
    }
    catch (_) { }
    return null;
}
