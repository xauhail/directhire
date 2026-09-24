import { CareerAnalysisService } from '../../_lib/careerService';

export async function onRequestPost(context: any) {
  try {
    const body: any = await context.request.json().catch(() => ({}));
    const { resumeText, jobDescription, jobTitle = 'Target Role' } = body;

    if (!resumeText || !jobDescription) {
      return new Response(JSON.stringify({ error: 'Both resumeText and jobDescription are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const parsedResume = CareerAnalysisService.parseResume(resumeText);
    const techPool = ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'FastAPI', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'SQL', 'GraphQL', 'Tailwind CSS', 'Git', 'Agile', 'Product Management', 'Sales', 'Communication'];
    const jobSkills = techPool.filter(k => new RegExp(`\\b${k}\\b`, 'i').test(jobDescription));

    const match = CareerAnalysisService.scoreJobMatch(
      parsedResume.skills,
      resumeText,
      jobTitle,
      jobDescription,
      jobSkills.length ? jobSkills : ['Technical Competency', 'Cross-functional Collaboration', 'Problem Solving']
    );

    return new Response(JSON.stringify({
      success: true,
      score: match.score,
      matchingSkills: match.matchingSkills,
      missingSkills: match.missingSkills,
      strengths: match.strengths,
      rationale: match.rationale,
      bulletSuggestions: [
        `Spearheaded production feature deliverables utilizing ${match.matchingSkills.slice(0, 2).join(' and ') || 'modern frameworks'}, accelerating product roadmap by 30%.`,
        `Collaborated with cross-functional engineering teams to implement reliable, maintainable code architectures with high test coverage.`,
        `Demonstrated proficiency in ${match.missingSkills[0] || 'emerging technologies'} by developing scalable prototypes and conducting technical spikes.`
      ]
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Failed to compute ATS score', message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
