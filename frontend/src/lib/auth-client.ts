/**
 * Neon Auth (Managed Better Auth) — Frontend Client
 *
 * Connected directly to Neon Auth instance:
 * https://ep-jolly-union-b48km1q7.neonauth.c-6.us-east-2.aws.neon.tech/neondb/auth
 *
 * Configured with:
 * - Email / Password authentication
 * - Email OTP (Verification code) via Neon's shared email provider (auth@mail.myneon.app)
 * - Session tracking
 */

import { createAuthClient } from 'better-auth/client';
import { emailOTPClient } from 'better-auth/client/plugins';

export const NEON_AUTH_URL =
  (import.meta as any).env?.PUBLIC_NEON_AUTH_URL ||
  'https://ep-jolly-union-b48km1q7.neonauth.c-6.us-east-2.aws.neon.tech/neondb/auth';

export const authClient = createAuthClient({
  baseURL: NEON_AUTH_URL,
  plugins: [
    emailOTPClient(),
  ],
});

// ── Authentication Helpers ───────────────────────────────────────────────────

/** Get the current session. Returns null if not authenticated. */
export async function getSession() {
  const { data } = await authClient.getSession();
  return data;
}

/** Check if the user is currently authenticated. */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session?.user;
}

/** Sign in with email + password. Returns session data or error. */
export async function signInWithEmail(email: string, password: string) {
  return authClient.signIn.email({ email, password });
}

/** Sign up with name + email + password. */
export async function signUpWithEmail(name: string, email: string, password: string) {
  return authClient.signUp.email({ name, email, password });
}

/** Send 6-digit email verification OTP via Neon Auth (auth@mail.myneon.app) */
export async function sendVerificationOtp(email: string) {
  return (authClient as any).emailOtp.sendVerificationOtp({
    email,
    type: 'email-verification',
  });
}

/** Verify email with 6-digit OTP code */
export async function verifyEmailOtp(email: string, otp: string) {
  return (authClient as any).emailOtp.verifyEmail({
    email,
    otp,
  });
}

/** Sign out the current user. */
export async function signOut() {
  return authClient.signOut();
}
