import { betterAuth } from 'better-auth';
import { getDb } from './db';

let cachedAuth: any = null;
let cachedUri: string | null = null;
let cachedBaseURL: string | null = null;

export function getAuth(env: any, requestOrigin?: string) {
  const uri = env?.DATABASE_URL;
  const baseURL = requestOrigin || env?.BETTER_AUTH_URL || 'https://jobsnation.co';

  if (cachedAuth && cachedUri === uri && cachedBaseURL === baseURL) {
    return cachedAuth;
  }

  const pool = getDb(env);
  const secret = env?.BETTER_AUTH_SECRET || 'e89fc5c72199f34586da234a946890fa24177b96b0eeefda96ef2cf3f225e364';

  cachedUri = uri;
  cachedBaseURL = baseURL;
  cachedAuth = betterAuth({
    ...(pool ? { database: pool } : {}),
    secret,
    baseURL,
    trustedOrigins: [
      'https://jobsnation.co',
      'https://www.jobsnation.co',
      'https://jobsnation.pages.dev',
      'https://careerhound-7sx.pages.dev',
      'https://careerhound.pages.dev',
      ...(requestOrigin ? [requestOrigin] : []),
      'http://localhost:4321',
      'http://localhost:4000',
    ],
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      minPasswordLength: 8,
    },
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ user, url, token }, request) => {
        console.log(`[Better Auth] Verification link for ${user.email}: ${url} (Token: ${token})`);
        const resendKey = env?.RESEND_API_KEY;
        if (resendKey) {
          try {
            await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${resendKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: 'Jobs Nation <support@jobsnation.co>',
                to: [user.email],
                subject: 'Verify your email address - Jobs Nation',
                html: `
                  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
                    <h2 style="color: #0f172a; margin-top: 0;">Verify your Jobs Nation Account</h2>
                    <p style="color: #475569; font-size: 14px; line-height: 1.6;">
                      Hi ${user.name || 'there'},<br/>
                      Please verify your email address to confirm your account and start receiving personalized direct ATS job matches.
                    </p>
                    <p style="margin: 24px 0;">
                      <a href="${url}" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">
                        Verify Email Address →
                      </a>
                    </p>
                    <p style="color: #94a3b8; font-size: 12px;">
                      If button does not work, visit this URL:<br/>
                      <a href="${url}" style="color: #2563eb;">${url}</a>
                    </p>
                  </div>
                `,
              }),
            });
          } catch (e) {
            console.error('[Better Auth] Error sending verification email:', e);
          }
        }
      },
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
