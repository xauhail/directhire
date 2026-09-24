const POPULAR_KEYWORDS = [
  'Software Engineer',
  'Frontend Engineer',
  'Backend Engineer',
  'Full Stack Engineer',
  'DevOps Engineer',
  'Cloud Architect',
  'Product Manager',
  'Data Scientist',
  'Data Engineer',
  'Machine Learning Engineer',
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'AWS',
  'PostgreSQL',
  'Docker',
  'Kubernetes',
  'GraphQL',
  'Tailwind CSS',
  'Next.js',
];

export async function onRequest(context: any) {
  const url = new URL(context.request.url);
  const q = (url.searchParams.get('q') || '').toLowerCase().trim();

  const items = q
    ? POPULAR_KEYWORDS.filter(k => k.toLowerCase().includes(q))
    : POPULAR_KEYWORDS.slice(0, 10);

  return new Response(JSON.stringify({ items }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=600',
    },
  });
}
