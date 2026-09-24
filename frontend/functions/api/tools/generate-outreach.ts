import { CareerAnalysisService } from '../../_lib/careerService';

export async function onRequestPost(context: any) {
  try {
    const body: any = await context.request.json().catch(() => ({}));
    const candidateName = body.candidateName || 'Job Seeker';
    const company = body.company || 'Target Company';
    const roleTitle = body.roleTitle || body.role || 'Software Engineer';
    const hiringManagerName = body.hiringManagerName || body.recruiterName || 'Hiring Manager';
    const skills = body.skills || (body.pitch ? [body.pitch] : ['Software Engineering', 'Problem Solving']);

    const messages = CareerAnalysisService.generateOutreachMessages(
      candidateName,
      skills,
      company,
      roleTitle,
      hiringManagerName
    );

    return new Response(JSON.stringify({
      success: true,
      messages,
      linkedinNote: messages.connectionNote,
      inmailMessage: messages.inMail,
      coldEmail: messages.coldEmail?.body,
      emailSubject: messages.coldEmail?.subject
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Failed to generate outreach messages', message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
