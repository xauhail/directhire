"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const sensible_1 = __importDefault(require("@fastify/sensible"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const env_js_1 = require("./config/env.js");
const jobs_js_1 = require("./api/routes/jobs.js");
const onboarding_js_1 = require("./api/routes/onboarding.js");
const tools_js_1 = require("./api/routes/tools.js");
const auto_apply_js_1 = require("./api/routes/auto-apply.js");
const checkout_js_1 = require("./api/routes/checkout.js");
const webhooks_js_1 = require("./api/routes/webhooks.js");
const server = (0, fastify_1.default)({
    logger: true,
});
async function main() {
    // Register plugins
    await server.register(cors_1.default, {
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    });
    await server.register(sensible_1.default);
    await server.register(multipart_1.default, {
        limits: {
            fileSize: 10 * 1024 * 1024, // 10MB for resume uploads
        },
    });
    // Health check
    server.get('/health', async () => ({ status: 'healthy', timestamp: new Date().toISOString() }));
    server.get('/api/health', async () => ({ status: 'healthy', timestamp: new Date().toISOString() }));
    // Register API routes
    await server.register(jobs_js_1.jobRoutes);
    await server.register(onboarding_js_1.onboardingRoutes);
    await server.register(tools_js_1.toolRoutes);
    await server.register(auto_apply_js_1.autoApplyRoutes);
    await server.register(checkout_js_1.checkoutRoutes);
    await server.register(webhooks_js_1.webhookRoutes);
    // Start listener
    try {
        const address = await server.listen({ port: env_js_1.config.port, host: env_js_1.config.host });
        console.log(`🚀 Career Hound Fastify Backend running at ${address}`);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}
main();
