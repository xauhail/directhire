export async function onRequestGet(context: any) {
  const url = new URL(context.request.url);
  const role = (url.searchParams.get('role') || 'Software Engineer').toLowerCase();
  const exp = parseInt(url.searchParams.get('experienceYears') || '3', 10);
  const country = (url.searchParams.get('country') || 'United States').toLowerCase();

  let baseMedian = 125000;
  if (role.includes('senior') || role.includes('lead') || exp >= 5) baseMedian = 165000;
  if (role.includes('principal') || role.includes('staff') || exp >= 8) baseMedian = 210000;
  if (role.includes('intern') || role.includes('junior') || exp <= 2) baseMedian = 85000;
  if (role.includes('product manager')) baseMedian *= 1.05;
  if (role.includes('sales') || role.includes('sdr')) baseMedian = 75000 + exp * 15000;

  let countryMultiplier = 1.0;
  if (country.includes('canada')) countryMultiplier = 0.85;
  else if (country.includes('uk') || country.includes('united kingdom')) countryMultiplier = 0.82;
  else if (country.includes('germany') || country.includes('europe')) countryMultiplier = 0.78;
  else if (country.includes('india')) countryMultiplier = 0.35;

  const medianUSD = Math.round(baseMedian * countryMultiplier);
  const p25 = Math.round(medianUSD * 0.82);
  const p90 = Math.round(medianUSD * 1.35);

  return new Response(JSON.stringify({
    success: true,
    role: url.searchParams.get('role') || 'Software Engineer',
    country: url.searchParams.get('country') || 'United States',
    currency: 'USD',
    percentiles: {
      p25,
      median: medianUSD,
      p90,
    },
    insight: 'Companies applying on Career Hound offer direct compensation with zero recruiter-cut deduction, typically resulting in 15–20% higher take-home pay.'
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
