const NEON_AUTH_URL = 'https://ep-jolly-union-b48km1q7.neonauth.c-6.us-east-2.aws.neon.tech/neondb/auth';

export async function onRequest(context: any) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Strip leading /api/auth prefix to target Neon Auth endpoint
  const subPath = url.pathname.replace(/^\/api\/auth/, '') || '';
  const targetBase = (env?.NEON_AUTH_URL || NEON_AUTH_URL).replace(/\/$/, '');
  const targetUrl = `${targetBase}${subPath}${url.search}`;

  const forwardHeaders = new Headers(request.headers);
  forwardHeaders.set('Origin', url.origin);

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: forwardHeaders,
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer(),
      redirect: 'manual',
    });

    const responseHeaders = new Headers(response.headers);
    responseHeaders.set('Access-Control-Allow-Origin', url.origin);
    responseHeaders.set('Access-Control-Allow-Credentials', 'true');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Neon Auth proxy error', message: err.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
