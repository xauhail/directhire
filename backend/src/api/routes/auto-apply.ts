import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { ApplyEngine } from '../../automation/applyEngine.js';
import { JobService } from '../../services/jobService.js';
import { GeminiService } from '../../services/geminiService.js';
import { AutoApplyApplication, AutoApplySettings } from '../../types/index.js';

// In-memory application log store
const autoApplyLogs: AutoApplyApplication[] = [
  {
    id: 'app_1726748921_a9f1',
    jobId: 'ch-2362348665',
    jobTitle: 'Senior Full Stack Cloud Engineer',
    companyName: 'Dominion Energy',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&auto=format&fit=crop&q=80',
    matchScore: 92,
    status: 'APPLIED',
    appliedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    screenshotUrl: '/receipts/app_1726748921_receipt.png',
    directApplySource: 'Greenhouse ATS Direct',
    submissionMessage: 'Dear Dominion Energy Hiring Team,\n\nI am writing to express my strong interest in the Senior Full Stack Cloud Engineer opening. Having architected fault-tolerant distributed cloud pipelines and modern TypeScript/React applications serving enterprise scale, I am confident my technical experience aligns directly with your team\'s architectural vision.\n\nKey highlights:\n• 6+ years in full-stack architecture with TypeScript, Node.js, and AWS.\n• Spearheaded high-availability cloud migration cutting latency by 35%.\n• Hands-on expertise in automated CI/CD and secure API gateways.\n\nThank you for considering my direct application. I look forward to connecting.\n\nBest regards,\nAlex Johnson',
    coverLetter: 'Dear Hiring Manager,\n\nI am thrilled to apply for the Senior Full Stack Cloud Engineer role at Dominion Energy. With an extensive background across robust cloud platforms and high-velocity engineering, I have led multiple zero-downtime migrations and engineered modern developer tooling that scaled reliably across global regions.\n\nAt my previous role, I worked closely with platform teams to design microservice architectures that processed millions of concurrent transactions with 99.99% availability. Dominion Energy\'s mission of modern, sustainable infrastructure deeply resonates with my own professional values.\n\nI welcome the opportunity to discuss how my technical expertise and passion for reliable distributed systems can bring immediate value to Dominion Energy.\n\nSincerely,\nAlex Johnson',
    screeningAnswers: {
      'Are you legally authorized to work in this location without sponsorship?': 'Yes, I am fully authorized to work without sponsorship.',
      'What makes you a great fit for this position?': 'Over 6 years designing fault-tolerant cloud backends using Node.js, TypeScript, PostgreSQL, and AWS with high availability standards.',
      'What is your experience with automated CI/CD pipelines?': 'Built and maintained GitHub Actions and Docker workflows deploying to Kubernetes clusters with zero downtime.',
      'What is your earliest possible start date?': 'Available within 2 weeks or immediate transition upon offer.'
    }
  },
  {
    id: 'app_1726742011_c4d2',
    jobId: 'ch-2371976427',
    jobTitle: 'Lead AI Systems Engineer',
    companyName: 'Partner AI Labs',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80',
    matchScore: 88,
    status: 'APPLIED',
    appliedAt: new Date(Date.now() - 7 * 3600 * 1000).toISOString(),
    screenshotUrl: '/receipts/app_1726742011_receipt.png',
    directApplySource: 'Ashby ATS Direct',
    submissionMessage: 'Hello Partner AI Labs Talent Team,\n\nI submitted my application for the Lead AI Systems Engineer role directly via your Ashby portal. Having built multi-turn agentic architectures and high-throughput model evaluation pipelines, I wanted to introduce myself directly. I would love the chance to discuss how my frontier model experience can accelerate your roadmap.\n\nBest,\nAlex Johnson',
    coverLetter: 'Dear Partner AI Labs Team,\n\nI am writing to submit my application for the Lead AI Systems Engineer position. With hands-on experience building neural retrieval systems, agent workflows, and low-latency inference pipelines, I have consistently pushed the boundaries of applied artificial intelligence in production.\n\nI am eager to contribute to Partner AI Labs\' cutting-edge initiatives and look forward to speaking with the engineering team.\n\nBest regards,\nAlex Johnson',
    screeningAnswers: {
      'Experience with production LLM deployments?': 'Led deployment of high-throughput generative AI evaluation pipelines utilizing modern neural APIs and vector retrieval with sub-300ms p95 latencies.',
      'Preferred programming languages': 'Python, TypeScript, and Go.',
      'Are you comfortable working in a fully remote, asynchronous culture?': 'Yes, have worked in remote-first global teams across multiple timezones for 4+ years.'
    }
  }
];

let currentSettings: AutoApplySettings = {
  enabled: true,
  minMatchScore: 80,
  dailyLimit: 20,
  appliedToday: 2,
  blacklistedCompanies: [],
  autoTailorResume: true,
};

export const autoApplyRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  // Get auto-apply configuration
  server.get('/api/auto-apply/settings', async (_req, reply) => {
    return reply.send({ settings: currentSettings });
  });

  // Update auto-apply configuration
  server.post<{ Body: Partial<AutoApplySettings> }>('/api/auto-apply/settings', async (req, reply) => {
    currentSettings = { ...currentSettings, ...req.body };
    return reply.send({ success: true, settings: currentSettings });
  });

  // Get application logs
  server.get('/api/auto-apply/logs', async (_req, reply) => {
    return reply.send({ logs: autoApplyLogs });
  });

  // Track a manual application (called when user clicks "Apply Directly" after generating cover letter)
  server.post<{
    Body: {
      jobId: string;
      jobTitle: string;
      companyName: string;
      companyLogo?: string;
      matchScore?: number;
      coverLetter?: string;
      submissionMessage?: string;
      directApplySource?: string;
      screeningAnswers?: Record<string, string>;
    };
  }>('/api/auto-apply/track', async (req, reply) => {
    const { jobId, jobTitle, companyName, companyLogo, matchScore, coverLetter, submissionMessage, directApplySource, screeningAnswers } = req.body;
    if (!jobId || !jobTitle) {
      return reply.status(400).send({ error: 'jobId and jobTitle are required' });
    }
    const newLog: AutoApplyApplication = {
      id: `app_${Date.now()}_manual`,
      jobId,
      jobTitle,
      companyName,
      companyLogo: companyLogo || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&auto=format&fit=crop&q=80',
      matchScore: matchScore || 0,
      status: 'APPLIED',
      appliedAt: new Date().toISOString(),
      coverLetter: coverLetter || undefined,
      submissionMessage: submissionMessage || `Application and resume submitted directly to ${companyName} hiring team.`,
      directApplySource: directApplySource || 'Company Direct ATS',
      screeningAnswers: screeningAnswers || {},
    };
    autoApplyLogs.unshift(newLog);
    currentSettings.appliedToday += 1;
    return reply.send({ success: true, application: newLog });
  });

  // Trigger auto-apply on a specific job or batch of matching jobs
  server.post<{ Body: { jobId?: string } }>('/api/auto-apply/trigger', async (req, reply) => {
    try {
      const searchRes = await JobService.searchJobs({ pageSize: 5 }, true);
      const targetJob = req.body?.jobId 
        ? searchRes.items.find(j => j.id === req.body.jobId) 
        : searchRes.items[0];

      if (!targetJob) {
        return reply.status(404).send({ error: 'No matching job found to auto-apply.' });
      }

      // Candidate profile
      const candidate = {
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        phone: '+1 (555) 234-5678',
        targetTitles: ['Senior Software Engineer', 'Full Stack Developer'],
        workArrangements: ['remote-solely', 'remote-ok'] as any,
        isWorldwide: true,
        locations: ['Worldwide'],
        experienceLevel: '5-to-10' as any,
        educationLevel: 'bachelor-degree' as any,
        minSalary: 120000,
        salaryCurrency: 'USD',
        salaryUnit: 'year' as any,
        skills: ['TypeScript', 'Node.js', 'React', 'AWS', 'Python', 'AI Engineering'],
        resumeText: 'Experienced Senior Engineer with 6 years leading cloud-native web applications and generative AI integrations.'
      };

      const result = await ApplyEngine.submitApplication(targetJob, candidate, 89);

      if (result.success) {
        const submissionNote = `Hello ${targetJob.company.name} Talent Team,\n\nI have submitted my application for the ${targetJob.title} opening directly to your career portal. With background in ${targetJob.skills.slice(0, 3).join(', ')}, I am excited about the opportunity to contribute to your engineering milestones.\n\nBest regards,\n${candidate.name}`;
        const autoCoverLetter = `Dear Hiring Manager at ${targetJob.company.name},\n\nI am writing to express my enthusiasm for the ${targetJob.title} position. Given my background building scalable systems with ${targetJob.skills.slice(0, 3).join(', ')}, I am eager to apply my experience toward solving your team's core technical challenges.\n\nThank you for reviewing my direct application.\n\nSincerely,\n${candidate.name}`;

        const newLog: AutoApplyApplication = {
          id: result.applicationId,
          jobId: targetJob.id,
          jobTitle: targetJob.title,
          companyName: targetJob.company.name,
          companyLogo: targetJob.company.logo,
          matchScore: 89,
          status: 'APPLIED',
          appliedAt: new Date().toISOString(),
          screenshotUrl: result.screenshotUrl,
          directApplySource: targetJob.directApplySource ? `${targetJob.directApplySource.toUpperCase()} Direct ATS` : 'Direct ATS',
          submissionMessage: submissionNote,
          coverLetter: autoCoverLetter,
          screeningAnswers: result.screeningAnswers,
        };
        autoApplyLogs.unshift(newLog);
        currentSettings.appliedToday += 1;
      }

      return reply.send(result);
    } catch (err: any) {
      server.log.error(err);
      return reply.status(500).send({ error: 'Failed to run auto-apply', message: err.message });
    }
  });

  // =========================================================
  // On-Demand AI Cover Letter & Match Score Generation
  // Called ONLY when user clicks "Apply Directly" → "Generate Cover Letter"
  // Gemini is NEVER called proactively — only on explicit user action
  // =========================================================
  server.post<{
    Body: {
      jobId?: string;
      jobTitle: string;
      companyName: string;
      jobDescription: string;
      jobSkills?: string[];
      resumeText: string;
    };
  }>('/api/auto-apply/generate', async (req, reply) => {
    try {
      const { jobTitle, companyName, jobDescription, jobSkills = [], resumeText } = req.body;

      if (!resumeText?.trim()) {
        return reply.status(400).send({ error: 'resumeText is required' });
      }
      if (!jobTitle || !companyName) {
        return reply.status(400).send({ error: 'jobTitle and companyName are required' });
      }

      // 1. Score the match between resume and job
      const matchResult = await GeminiService.scoreJobMatch(
        [], // skills extracted inline from resume
        resumeText,
        jobTitle,
        jobDescription,
        jobSkills
      );

      // 2. Generate a tailored cover letter — ONLY here, on user request
      const coverLetter = await GeminiService.generateCoverLetter(
        resumeText,
        jobTitle,
        companyName,
        jobDescription,
        jobSkills
      );

      // 3. Generate key screening answers
      const screeningQuestions = [
        'Are you authorized to work in this location?',
        `What makes you a great fit for the ${jobTitle} position?`,
        'What is your expected timeline to start?'
      ];

      const screeningAnswers: Record<string, string> = {};
      for (const q of screeningQuestions) {
        screeningAnswers[q] = await GeminiService.generateScreeningAnswer(
          q,
          { name: 'Candidate', skills: jobSkills, resumeText },
          jobTitle,
          companyName
        );
      }

      return reply.send({
        success: true,
        matchScore: matchResult.score,
        matchingSkills: matchResult.matchingSkills,
        missingSkills: matchResult.missingSkills,
        strengths: matchResult.strengths,
        rationale: matchResult.rationale,
        coverLetter,
        screeningAnswers,
      });
    } catch (err: any) {
      server.log.error(err);
      return reply.status(500).send({ error: 'Failed to generate application materials', message: err.message });
    }
  });
};
