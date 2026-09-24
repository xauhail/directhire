import { CareerAnalysisService } from '../../_lib/careerService';

export async function onRequestPost(context: any) {
  try {
    const body: any = await context.request.json().catch(() => ({}));
    const { jobTitle, company, description, postedDaysAgo = 14 } = body;

    if (!description || !jobTitle) {
      return new Response(JSON.stringify({ error: 'jobTitle and description are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const analysis = CareerAnalysisService.analyzeGhostJob(
      jobTitle,
      company || 'Unknown Company',
      description,
      Number(postedDaysAgo) || 14
    );

    return new Response(JSON.stringify({
      success: true,
      ...analysis,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Failed to analyze ghost job risk', message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
