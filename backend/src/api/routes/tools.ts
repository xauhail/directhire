import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { GeminiService } from '../../services/geminiService.js';

export const toolRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  // Free Tool 1: ATS Resume Scanner & Keyword Matcher
  server.post<{ Body: { resumeText: string; jobDescription: string; jobTitle?: string } }>(
    '/api/tools/ats-score',
    async (req, reply) => {
      try {
        const { resumeText, jobDescription, jobTitle = 'Target Role' } = req.body || {};
        if (!resumeText || !jobDescription) {
          return reply.status(400).send({ error: 'Both resumeText and jobDescription are required.' });
        }

        // Parse skills from resume
        const parsedResume = await GeminiService.parseResume(resumeText);
        
        // Extract common requirements from description
        const techPool = ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'FastAPI', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'SQL', 'GraphQL', 'Tailwind CSS', 'Git', 'Agile', 'Product Management', 'Sales', 'Communication'];
        const jobSkills = techPool.filter(k => new RegExp(`\\b${k}\\b`, 'i').test(jobDescription));

        const match = await GeminiService.scoreJobMatch(
          parsedResume.skills,
          resumeText,
          jobTitle,
          jobDescription,
          jobSkills.length ? jobSkills : ['Technical Competency', 'Cross-functional Collaboration', 'Problem Solving']
        );

        return reply.send({
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
        });
      } catch (err: any) {
        server.log.error(err);
        return reply.status(500).send({ error: 'Failed to compute ATS score', message: err.message });
      }
    }
  );

  // Free Tool 2: Ghost Job & Stale Listing Detector
  server.post<{ Body: { jobTitle: string; company: string; description: string; postedDaysAgo?: number } }>(
    '/api/tools/ghost-detector',
    async (req, reply) => {
      try {
        const { jobTitle, company, description, postedDaysAgo = 14 } = req.body || {};
        if (!description || !jobTitle) {
          return reply.status(400).send({ error: 'jobTitle and description are required.' });
        }

        const analysis = await GeminiService.analyzeGhostJob(
          jobTitle,
          company || 'Unknown Company',
          description,
          Number(postedDaysAgo) || 14
        );

        return reply.send({
          success: true,
          ...analysis,
        });
      } catch (err: any) {
        server.log.error(err);
        return reply.status(500).send({ error: 'Failed to analyze ghost job risk', message: err.message });
      }
    }
  );

  // Free Tool 3: Cold Recruiter & Hiring Manager Outreach Generator
  server.post<{ Body: { candidateName?: string; skills?: string[]; company: string; roleTitle?: string; role?: string; hiringManagerName?: string; recruiterName?: string; pitch?: string } }>(
    '/api/tools/generate-outreach',
    async (req, reply) => {
      try {
        const body = req.body || ({} as any);
        const candidateName = body.candidateName || 'Job Seeker';
        const company = body.company || 'Target Company';
        const roleTitle = body.roleTitle || body.role || 'Software Engineer';
        const hiringManagerName = body.hiringManagerName || body.recruiterName || 'Hiring Manager';
        const skills = body.skills || (body.pitch ? [body.pitch] : ['Software Engineering', 'Problem Solving']);

        const messages = await GeminiService.generateOutreachMessages(
          candidateName,
          skills,
          company,
          roleTitle,
          hiringManagerName
        );

        return reply.send({
          success: true,
          messages,
          linkedinNote: messages.connectionNote,
          inmailMessage: messages.inMail,
          coldEmail: messages.coldEmail?.body,
          emailSubject: messages.coldEmail?.subject
        });
      } catch (err: any) {
        server.log.error(err);
        return reply.status(500).send({ error: 'Failed to generate outreach messages', message: err.message });
      }
    }
  );

  // Free Tool 4: Remote & Tech Salary Comparison Benchmark
  server.get<{ Querystring: { role?: string; experienceYears?: string; country?: string } }>(
    '/api/tools/salary-benchmark',
    async (req, reply) => {
      const role = (req.query.role || 'Software Engineer').toLowerCase();
      const exp = parseInt(req.query.experienceYears || '3', 10);
      const country = (req.query.country || 'United States').toLowerCase();

      // Base US salary calculations
      let baseMedian = 125000;
      if (role.includes('senior') || role.includes('lead') || exp >= 5) baseMedian = 165000;
      if (role.includes('principal') || role.includes('staff') || exp >= 8) baseMedian = 210000;
      if (role.includes('intern') || role.includes('junior') || exp <= 2) baseMedian = 85000;
      if (role.includes('product manager')) baseMedian *= 1.05;
      if (role.includes('sales') || role.includes('sdr')) baseMedian = 75000 + exp * 15000;

      // Adjust for global country index
      let countryMultiplier = 1.0;
      if (country.includes('canada')) countryMultiplier = 0.85;
      else if (country.includes('uk') || country.includes('united kingdom')) countryMultiplier = 0.82;
      else if (country.includes('germany') || country.includes('europe')) countryMultiplier = 0.78;
      else if (country.includes('india')) countryMultiplier = 0.35;

      const medianUSD = Math.round(baseMedian * countryMultiplier);
      const p25 = Math.round(medianUSD * 0.82);
      const p90 = Math.round(medianUSD * 1.35);

      return reply.send({
        success: true,
        role: req.query.role || 'Software Engineer',
        country: req.query.country || 'United States',
        currency: 'USD',
        percentiles: {
          p25,
          median: medianUSD,
          p90,
        },
        insight: `Companies applying on Jobs Nation offer direct compensation with zero recruiter-cut deduction, typically resulting in 15–20% higher take-home pay.`
      });
    }
  );
};
