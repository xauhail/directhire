"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: parseInt(process.env.PORT || '4000', 10),
    host: process.env.HOST || '0.0.0.0',
    environment: process.env.NODE_ENV || 'development',
    // Google Gemini API
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    geminiModel: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    // Dodo Payments
    dodoPaymentsApiKey: process.env.DODO_PAYMENTS_API_KEY || '',
    dodoPaymentsWebhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY || '',
    dodoPaymentsMode: (process.env.DODO_PAYMENTS_MODE || 'test_mode'),
    // Plans / Product IDs
    dodoWeeklyProductId: process.env.DODO_PRODUCT_WEEKLY || 'prod_weekly_pass',
    dodoMonthlyProductId: process.env.DODO_PRODUCT_MONTHLY || 'prod_monthly_pass',
    dodoLifetimeProductId: process.env.DODO_PRODUCT_LIFETIME || 'prod_lifetime_pass',
    // App URLs
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:4321',
    // Redis for BullMQ
    redisUrl: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
};
