import { betterAuth } from 'better-auth';
import { getDb } from './db';

let cachedAuth: any = null;
let cachedUri: string | null = null;

export function getAuth(env: any, requestOrigin?: string) {
  const uri = env?.DATABASE_URL;
  if (cachedAuth && cachedUri === uri) {
    return cachedAuth;
  }

  const pool = getDb(env);
  const baseURL = env?.BETTER_AUTH_URL || requestOrigin || 'http://localhost:4321';
  const secret = env?.BETTER_AUTH_SECRET || 'e89fc5c72199f34586da234a946890fa24177b96b0eeefda96ef2cf3f225e364';

  cachedUri = uri;
  cachedAuth = betterAuth({
    ...(pool ? { database: pool } : {}),
    secret,
    baseURL,
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      minPasswordLength: 8,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 30, // 30 days
      updateAge: 60 * 60 * 24,       // 1 day
    },
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

  return cachedAuth;
}
