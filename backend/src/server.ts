import Fastify from 'fastify';
import cors from '@fastify/cors';
import sensible from '@fastify/sensible';
import multipart from '@fastify/multipart';
import { fromNodeHeaders } from 'better-auth/node';
import { config } from './config/env.js';
import { auth } from './auth.js';
import { jobRoutes } from './api/routes/jobs.js';
import { onboardingRoutes } from './api/routes/onboarding.js';
import { toolRoutes } from './api/routes/tools.js';
import { checkoutRoutes } from './api/routes/checkout.js';
import { webhookRoutes } from './api/routes/webhooks.js';
import { authRoutes } from './api/routes/auth.js';

const server = Fastify({
  logger: true,
});

async function main() {
  // ── CORS ─────────────────────────────────────────────────────────────────
  await server.register(cors, {
    origin: [config.frontendUrl, 'http://localhost:4321', 'http://localhost:4000'],
    credentials: true,                    // required for Better Auth cookies
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

  await server.register(sensible);
  await server.register(multipart, {
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
      const url = `${config.betterAuthUrl}${request.url}`;

      // Convert Node.js headers → Fetch API Headers
      const headers = fromNodeHeaders(request.headers);
      if (!headers.get('origin')) {
        headers.set('origin', config.frontendUrl || 'http://localhost:4321');
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
      const response = await auth.handler(req);

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
    } catch (err: any) {
      server.log.error({ err }, '[BetterAuth] Handler error');
      return reply.status(500).send({ error: 'Auth service error', message: err.message });
    }
  });

  // ── Application API routes ────────────────────────────────────────────────
  await server.register(jobRoutes);
  await server.register(onboardingRoutes);
  await server.register(toolRoutes);
  await server.register(checkoutRoutes);
  await server.register(webhookRoutes);
  await server.register(authRoutes);   // Legacy in-memory auth (kept as fallback/test)

  // ── Clean 404 Not Found Handler ───────────────────────────────────────────
  server.setNotFoundHandler((request, reply) => {
    return reply.status(404).send({ 
      error: 'Not Found', 
      message: `Route ${request.method}:${request.url} not found` 
    });
  });

  // ── Start server ──────────────────────────────────────────────────────────
  try {
    const address = await server.listen({ port: config.port, host: config.host });
    console.log(`🚀 Jobs Nation Fastify Backend running at ${address}`);
    console.log(`🔐 Better Auth: ${config.databaseUrl ? 'PostgreSQL connected' : '⚠️  No DATABASE_URL — using in-memory fallback'}`);
    console.log(`📚 Astro MCP: configured at .agents/mcp_config.json`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

main();
