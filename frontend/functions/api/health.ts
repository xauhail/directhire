export async function onRequest() {
  return new Response(
    JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString(), platform: 'cloudflare-pages' }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    }
  );
}
