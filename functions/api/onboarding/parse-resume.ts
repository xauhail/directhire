import { CareerAnalysisService } from '../../_lib/careerService';

export async function onRequestPost(context: any) {
  try {
    const body: any = await context.request.json().catch(() => ({}));
    const text = body.resumeText || '';

    if (!text.trim()) {
      return new Response(JSON.stringify({ error: 'Resume text is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const parsed = CareerAnalysisService.parseResume(text);

    return new Response(JSON.stringify({ success: true, profile: parsed }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Failed to parse resume', message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
