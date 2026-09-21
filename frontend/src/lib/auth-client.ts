/**
 * Better Auth — Frontend Client
 *
 * This module exposes a typed auth client that communicates with the
 * Better Auth backend running at http://localhost:4000/api/auth/*.
 *
 * Usage in any Astro page script or component:
 *
 *   import { authClient } from '../lib/auth-client';
 *
 *   // Sign up
 *   const { data, error } = await authClient.signUp.email({
 *     name: 'Alex Johnson',
 *     email: 'alex@example.com',
 *     password: 'SecurePass123!',
 *   });
 *
 *   // Sign in
 *   const { data, error } = await authClient.signIn.email({
 *     email: 'alex@example.com',
 *     password: 'SecurePass123!',
 *   });
 *
 *   // Get current session
 *   const session = await authClient.getSession();
 *
 *   // Sign out
 *   await authClient.signOut();
 *
 * Better Auth automatically manages session cookies (httpOnly).
 * No manual token storage in localStorage is needed for secure auth.
 */

import { createAuthClient } from 'better-auth/client';

export const authClient = createAuthClient({
  // The Better Auth backend URL
  baseURL: 'http://localhost:4000',
});

// ── Helpers ───────────────────────────────────────────────────────────────────

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

/** Sign out the current user. */
export async function signOut() {
  return authClient.signOut();
}
