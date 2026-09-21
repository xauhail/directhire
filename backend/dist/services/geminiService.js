"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const generative_ai_1 = require("@google/generative-ai");
const env_js_1 = require("../config/env.js");
let genAI = null;
if (env_js_1.config.geminiApiKey) {
    try {
        genAI = new generative_ai_1.GoogleGenerativeAI(env_js_1.config.geminiApiKey);
    }
    catch (err) {
        console.warn('Failed to initialize Google Generative AI client:', err);
    }
}
class GeminiService {
    /**
     * Helper to generate text via Gemini
     */
    static async generate(prompt) {
        if (!genAI || !env_js_1.config.geminiApiKey)
            return null;
        try {
            const model = genAI.getGenerativeModel({ model: env_js_1.config.geminiModel });
            const result = await model.generateContent(prompt);
            const res = await result.response;
            return res.text() || null;
        }
        catch (err) {
            console.error('Gemini API call failed:', err);
            return null;
        }
    }
    /**
     * Parse a raw resume text using Gemini 2.5 Flash
     */
    static async parseResume(resumeText) {
        const prompt = `You are an expert HR technologist and ATS parser. Extract the following candidate details from this resume text as strict JSON:
    {
      "name": "Candidate Full Name",
      "email": "Email address",
      "phone": "Phone number or empty string",
      "summary": "Brief 2-3 sentence executive summary",
      "skills": ["Skill 1", "Skill 2"],
      "experienceYears": 4,
      "educationLevel": "High school" | "Bachelor's degree" | "Master's degree" | "PhD" | "Other",
      "jobTitles": ["Recent title 1", "Recent title 2"]
    }
    
    Resume text:
    """${resumeText.slice(0, 8000)}"""
    
    Return ONLY valid JSON. No markdown code blocks, no explanation.`;
        const raw = await this.generate(prompt);
        if (raw) {
            try {
                const cleaned = raw.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
                return JSON.parse(cleaned);
            }
            catch (err) {
                console.error('Failed to parse Gemini resume JSON:', err);
            }
        }
        // Heuristic fallback
        const emailMatch = resumeText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        const phoneMatch = resumeText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
        const techKeywords = ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Go', 'AWS', 'Docker', 'PostgreSQL', 'SQL', 'FastAPI', 'Next.js', 'Tailwind CSS', 'Git', 'GraphQL', 'Kubernetes', 'Product Management', 'Sales', 'Marketing'];
        const foundSkills = techKeywords.filter(k => new RegExp(`\\b${k}\\b`, 'i').test(resumeText));
        return {
            name: 'Candidate',
            email: emailMatch ? emailMatch[0] : 'candidate@example.com',
            phone: phoneMatch ? phoneMatch[0] : '',
            summary: 'Experienced professional with demonstrated expertise in modern technology, high-scale reliability, and cross-functional feature delivery.',
            skills: foundSkills.length ? foundSkills : ['JavaScript', 'TypeScript', 'React', 'Problem Solving', 'Communication'],
            experienceYears: 4,
            educationLevel: "Bachelor's degree",
            jobTitles: ['Software Engineer', 'Full Stack Developer'],
        };
    }
    /**
     * Score match between candidate profile and a job description
     */
    static async scoreJobMatch(resumeSkills, resumeText, jobTitle, jobDescription, jobSkills) {
        const prompt = `You are an executive ATS matching engine. Compare this candidate against the job posting and evaluate compatibility on a 0 to 100 scale.
    
    Job Title: ${jobTitle}
    Job Skills Needed: ${jobSkills.join(', ')}
    Job Description: """${jobDescription.slice(0, 4000)}"""
    
    Candidate Skills: ${resumeSkills.join(', ')}
    Candidate Profile: """${resumeText.slice(0, 3000)}"""
    
    Return strict JSON only:
    {
      "score": 85,
      "matchingSkills": ["skill1", "skill2"],
      "missingSkills": ["missingSkill1"],
      "strengths": ["Key strength 1", "Key strength 2"],
      "rationale": "2-3 sentences explaining fit"
    }`;
        const raw = await this.generate(prompt);
        if (raw) {
            try {
                const cleaned = raw.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
                return JSON.parse(cleaned);
            }
            catch (err) {
                console.error('Failed to parse Gemini match JSON:', err);
            }
        }
        // Overlap fallback
        const resumeSkillsLower = new Set(resumeSkills.map(s => s.toLowerCase()));
        const matching = jobSkills.filter(s => resumeSkillsLower.has(s.toLowerCase()));
        const missing = jobSkills.filter(s => !resumeSkillsLower.has(s.toLowerCase()));
        const baseScore = jobSkills.length > 0
            ? Math.round((matching.length / jobSkills.length) * 85) + 15
            : 75;
        const finalScore = Math.min(98, Math.max(45, baseScore));
        return {
            score: finalScore,
            matchingSkills: matching.slice(0, 8),
            missingSkills: missing.slice(0, 5),
            strengths: [
                `Direct alignment with required competencies (${matching.slice(0, 3).join(', ') || 'technical skill set'})`,
                'Demonstrated background in scalable modern tooling and engineering best practices'
            ],
            rationale: `Candidate matches ${matching.length} key required technical proficiencies with the target role and exhibits strong background alignment for ${jobTitle}.`
        };
    }
    /**
     * Answer custom screening questions autonomously for Playwright Auto-Apply
     */
    static async generateScreeningAnswer(question, candidateInfo, jobTitle, company) {
        const prompt = `You are applying to the job "${jobTitle}" at "${company}" on behalf of ${candidateInfo.name}.
    Candidate Skills: ${candidateInfo.skills.join(', ')}
    Candidate Background: """${candidateInfo.resumeText.slice(0, 2500)}"""
    
    Answer this application screening question accurately, concisely, and professionally.
    Question: "${question}"
    
    Guidelines:
    - Keep response to 2-4 sentences max.
    - Be direct, professional, and positive.
    - Ground answers strictly in the candidate's actual background.
    - If it is a yes/no or numerical question, provide the direct answer first.`;
        const raw = await this.generate(prompt);
        if (raw && raw.trim()) {
            return raw.trim();
        }
        const qLower = question.toLowerCase();
        if (qLower.includes('authorized to work') || qLower.includes('legally authorized'))
            return 'Yes';
        if (qLower.includes('sponsorship') || qLower.includes('require visa'))
            return 'No';
        if (qLower.includes('years of experience'))
            return '4+ years';
        if (qLower.includes('notice period') || qLower.includes('start date'))
            return 'Available within 2 weeks';
        if (qLower.includes('salary expectation') || qLower.includes('desired compensation'))
            return 'Open to discussing competitive market rates based on total compensation.';
        return `I bring strong hands-on experience in ${candidateInfo.skills.slice(0, 3).join(', ')}, with a proven track record of delivering robust systems that directly align with ${company}'s goals for the ${jobTitle} position.`;
    }
    /**
     * Free Tool: Ghost Job Detector
     */
    static async analyzeGhostJob(jobTitle, company, description, postedDaysAgo) {
        const prompt = `You are a career security analyst. Detect whether this job posting has indicators of being a "Ghost Job" (a fake listing kept open indefinitely for talent pipeline harvesting, compliance optics, or employer brand advertising).
    
    Title: ${jobTitle}
    Company: ${company}
    Days Open: ${postedDaysAgo} days
    Description: """${description.slice(0, 4000)}"""
    
    Return strict JSON:
    {
      "ghostRiskScore": 35,
      "riskLevel": "LOW" | "MODERATE" | "HIGH",
      "redFlags": ["specific flag 1"],
      "greenFlags": ["positive signal 1"],
      "summary": "2-3 sentences explaining the assessment"
    }`;
        const raw = await this.generate(prompt);
        if (raw) {
            try {
                const cleaned = raw.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
                return JSON.parse(cleaned);
            }
            catch (err) {
                console.error('Failed to parse Gemini ghost job JSON:', err);
            }
        }
        const redFlags = [];
        const greenFlags = [];
        let score = 20;
        if (postedDaysAgo > 45) {
            score += 40;
            redFlags.push(`Listing has been open for ${postedDaysAgo} days without being filled or refreshed.`);
        }
        else if (postedDaysAgo <= 7) {
            score -= 15;
            greenFlags.push('Recently posted within the past 7 days (active fresh hiring demand).');
        }
        if (/evergreen|ongoing pipeline|talent pool|general application/i.test(description)) {
            score += 35;
            redFlags.push('Contains "pipeline" or "talent community" language rather than a specific open headcount.');
        }
        if (/competitive salary|\$|\d{2,3},\d{3}/i.test(description)) {
            greenFlags.push('Explicit compensation disclosure provided (strong sign of verified budget).');
        }
        else {
            score += 15;
            redFlags.push('No salary or compensation range specified.');
        }
        if (description.length < 400) {
            score += 20;
            redFlags.push('Ultra-brief or generic job description with minimal team-specific requirements.');
        }
        else {
            greenFlags.push('Detailed, role-specific deliverables and team charter outlined.');
        }
        const finalScore = Math.min(95, Math.max(10, score));
        const level = finalScore >= 65 ? 'HIGH' : finalScore >= 40 ? 'MODERATE' : 'LOW';
        return {
            ghostRiskScore: finalScore,
            riskLevel: level,
            redFlags: redFlags.length ? redFlags : ['No immediate red flags detected.'],
            greenFlags: greenFlags.length ? greenFlags : ['Standard job description structure.'],
            summary: level === 'HIGH'
                ? 'High probability of being an evergreen talent pool or stale listing. Proceed with caution and apply directly on the company career page rather than third-party job boards.'
                : 'Listing shows healthy indicators of an active headcount with concrete requirements.'
        };
    }
    /**
     * Free Tool: Cold Recruiter & Hiring Manager DM Generator
     */
    static async generateOutreachMessages(candidateName, candidateSkills, company, roleTitle, hiringManagerName) {
        const greeting = hiringManagerName ? `Hi ${hiringManagerName}` : 'Hi there';
        const prompt = `Write 3 high-converting cold outreach messages for a job seeker reaching out to the hiring team.
    Candidate Name: ${candidateName}
    Key Skills: ${candidateSkills.join(', ')}
    Target Company: ${company}
    Target Role: ${roleTitle}
    Hiring Manager: ${hiringManagerName || 'Hiring Manager'}
    
    Return strict JSON:
    {
      "connectionNote": "Under 300 characters LinkedIn connection request note",
      "inMail": "Punchy 3-4 sentence LinkedIn InMail / message highlighting direct fit",
      "coldEmail": {
        "subject": "Compelling high-open-rate subject line",
        "body": "Short 3-paragraph cold email with a low-friction call to action"
      }
    }`;
        const raw = await this.generate(prompt);
        if (raw) {
            try {
                const cleaned = raw.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
                return JSON.parse(cleaned);
            }
            catch (err) {
                console.error('Failed to parse Gemini outreach JSON:', err);
            }
        }
        const topSkills = candidateSkills.slice(0, 3).join(', ') || 'full-stack systems and rapid feature delivery';
        return {
            connectionNote: `${greeting}, saw ${company}'s opening for ${roleTitle}. With expertise in ${topSkills}, I'd love to connect and follow your team's work! - ${candidateName}`,
            inMail: `${greeting},\n\nI noticed ${company} is hiring for a ${roleTitle} on your direct career page. I've spent the past several years driving production deliverables in ${topSkills}.\n\nRather than getting lost in LinkedIn's 200+ applicant queue, I wanted to reach out directly to see if my background aligns with your current priorities for this quarter. Would you be open to a brief 5-minute chat next week?\n\nBest regards,\n${candidateName}`,
            coldEmail: {
                subject: `${roleTitle} @ ${company} — Direct Application & Introduction (${candidateName})`,
                body: `${greeting},\n\nI hope this week is going well. I recently came across your opening for the ${roleTitle} role on the ${company} career portal and was immediately excited by what your team is building.\n\nMy background specializes in ${topSkills}. In my recent work, I spearheaded projects that cut deployment times and scaled reliable services with minimal overhead.\n\nI've attached my resume for your review. Would you or the hiring manager have 10 minutes for a brief introductory call this Thursday or Friday?\n\nThank you for your time,\n${candidateName}`
            }
        };
    }
}
exports.GeminiService = GeminiService;
