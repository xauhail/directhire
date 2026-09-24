import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  host: process.env.HOST || '0.0.0.0',
  environment: process.env.NODE_ENV || 'development',
  

  // Dodo Payments
  dodoPaymentsApiKey: process.env.DODO_PAYMENTS_API_KEY || '',
  dodoPaymentsWebhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY || '',
  dodoPaymentsMode: (process.env.DODO_PAYMENTS_MODE || 'test_mode') as 'test_mode' | 'live_mode',
  
  // Plans / Product IDs
  dodoWeeklyProductId: process.env.DODO_PRODUCT_WEEKLY || 'pdt_0NoCoSmvftI788ZiRmxcg',
  dodoMonthlyProductId: process.env.DODO_PRODUCT_MONTHLY || 'pdt_0NoCoSp04hYLAtmjbseJt',
  dodoYearlyProductId: process.env.DODO_PRODUCT_YEARLY || 'pdt_0No0Hg5BSrOkY9wb34YxP',
  
  // App URLs
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:4321',
  
  // Redis for BullMQ
  redisUrl: process.env.REDIS_URL || 'redis://127.0.0.1:6379',

  // ── Better Auth + PostgreSQL ────────────────────────────────────
  // Set DATABASE_URL to your PostgreSQL connection string
  // e.g. postgresql://postgres:password@localhost:5432/careerhound
  databaseUrl: process.env.DATABASE_URL || '',
  
  // Better Auth requires a strong secret (32+ chars). Generate with:
  // node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  betterAuthSecret: process.env.BETTER_AUTH_SECRET || 'dev-secret-change-in-production-32chars!!',
  betterAuthUrl: process.env.BETTER_AUTH_URL || 'http://localhost:4000',
};

