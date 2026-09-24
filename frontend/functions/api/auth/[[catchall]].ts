import { getAuth } from '../../_lib/auth';

export async function onRequest(context: any) {
  const { request, env } = context;
  const origin = new URL(request.url).origin;

  try {
    const auth = getAuth(env, origin);
    return await auth.handler(request);
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Auth error', message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
