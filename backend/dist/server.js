"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const sensible_1 = __importDefault(require("@fastify/sensible"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const node_1 = require("better-auth/node");
const env_js_1 = require("./config/env.js");
const auth_js_1 = require("./auth.js");
const jobs_js_1 = require("./api/routes/jobs.js");
const onboarding_js_1 = require("./api/routes/onboarding.js");
const tools_js_1 = require("./api/routes/tools.js");
const checkout_js_1 = require("./api/routes/checkout.js");
const webhooks_js_1 = require("./api/routes/webhooks.js");
const auth_js_2 = require("./api/routes/auth.js");
const server = (0, fastify_1.default)({
    logger: true,
});
async function main() {
    // ── CORS ─────────────────────────────────────────────────────────────────
    await server.register(cors_1.default, {
        origin: [env_js_1.config.frontendUrl, 'http://localhost:4321', 'http://localhost:4000'],
        credentials: true, // required for Better Auth cookies
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cookie',
            'x-user-subscribed',
            'x-user-authenticated',
            'x-csrf-token',
            'better-auth.session_token',
            'x-requested-with',
            'Accept'
        ],
    });
    await server.register(sensible_1.default);
    await server.register(multipart_1.default, {
        limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    });
    // ── Health check ─────────────────────────────────────────────────────────
    server.get('/health', async () => ({ status: 'healthy', timestamp: new Date().toISOString() }));
    server.get('/api/health', async () => ({ status: 'healthy', timestamp: new Date().toISOString() }));
    // ── Better Auth — catch-all handler ──────────────────────────────────────
    // All /api/auth/* requests are delegated to Better Auth's built-in handler.
    // This gives us: sign-in, sign-up, sign-out, get-session, change-password, etc.
    //
    // Better Auth endpoints (auto-generated):
    //   POST /api/auth/sign-up/email          → register new user
    //   POST /api/auth/sign-in/email          → login with email+password
    //   POST /api/auth/sign-out               → clear session cookie
    //   GET  /api/auth/get-session            → returns current session + user
    //   POST /api/auth/change-password        → update password
    //   POST /api/auth/forget-password        → initiate password reset
    //   POST /api/auth/reset-password         → complete password reset
    //
    // The handler accepts standard Fetch API Request objects and returns Responses.
    server.all('/api/auth/*', async (request, reply) => {
        try {
            // Build full URL
            const url = `${env_js_1.config.betterAuthUrl}${request.url}`;
            // Convert Node.js headers → Fetch API Headers
            const headers = (0, node_1.fromNodeHeaders)(request.headers);
            if (!headers.get('origin')) {
                headers.set('origin', env_js_1.config.frontendUrl || 'http://localhost:4321');
            }
            // Build Fetch-compatible Request
            const req = new Request(url, {
                method: request.method,
                headers,
                body: ['GET', 'HEAD'].includes(request.method)
                    ? undefined
                    : JSON.stringify(request.body),
            });
            // Let Better Auth handle it
            const response = await auth_js_1.auth.handler(req);
            // Forward status + headers back to Fastify
            reply.status(response.status);
            response.headers.forEach((value, key) => {
                // Don't forward transfer-encoding — Fastify handles it
                if (key.toLowerCase() !== 'transfer-encoding') {
                    reply.header(key, value);
                }
            });
            const body = await response.text();
            return reply.send(body || null);
        }
        catch (err) {
            server.log.error({ err }, '[BetterAuth] Handler error');
            return reply.status(500).send({ error: 'Auth service error', message: err.message });
        }
    });
    // ── Application API routes ────────────────────────────────────────────────
    await server.register(jobs_js_1.jobRoutes);
    await server.register(onboarding_js_1.onboardingRoutes);
    await server.register(tools_js_1.toolRoutes);
    await server.register(checkout_js_1.checkoutRoutes);
    await server.register(webhooks_js_1.webhookRoutes);
    await server.register(auth_js_2.authRoutes); // Legacy in-memory auth (kept as fallback/test)
    // ── Clean 404 Not Found Handler ───────────────────────────────────────────
    server.setNotFoundHandler((request, reply) => {
        return reply.status(404).send({
            error: 'Not Found',
            message: `Route ${request.method}:${request.url} not found`
        });
    });
    // ── Start server ──────────────────────────────────────────────────────────
    try {
        const address = await server.listen({ port: env_js_1.config.port, host: env_js_1.config.host });
        console.log(`🚀 Jobs Nation Fastify Backend running at ${address}`);
        console.log(`🔐 Better Auth: ${env_js_1.config.databaseUrl ? 'PostgreSQL connected' : '⚠️  No DATABASE_URL — using in-memory fallback'}`);
        console.log(`📚 Astro MCP: configured at .agents/mcp_config.json`);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}
main();
