const POPULAR_LOCATIONS = [
  'Worldwide',
  'United States',
  'Remote (United States)',
  'San Francisco, CA',
  'New York, NY',
  'Austin, TX',
  'Seattle, WA',
  'Boston, MA',
  'London, United Kingdom',
  'Toronto, Canada',
  'Vancouver, Canada',
  'Berlin, Germany',
  'Munich, Germany',
  'Sydney, Australia',
  'Melbourne, Australia',
  'Singapore',
  'Bangalore, India',
  'Remote (Worldwide)',
];

export async function onRequest(context: any) {
  const url = new URL(context.request.url);
  const q = (url.searchParams.get('q') || '').toLowerCase().trim();

  const items = q
    ? POPULAR_LOCATIONS.filter(loc => loc.toLowerCase().includes(q))
    : POPULAR_LOCATIONS.slice(0, 10);

  return new Response(JSON.stringify({ items }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=600',
    },
  });
}
