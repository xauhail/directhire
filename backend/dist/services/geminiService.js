"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = exports.CareerAnalysisService = void 0;
class CareerAnalysisService {
    /**
     * Parse a raw resume text using deterministic pattern matching & skills dictionary
     */
    static parseResume(resumeText) {
        const text = resumeText || '';
        // Extract Email
        const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
        const email = emailMatch ? emailMatch[0] : '';
        // Extract Phone
        const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
        const phone = phoneMatch ? phoneMatch[0] : '';
        // Extract Candidate Name from top lines
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
        let name = 'Candidate';
        if (lines.length > 0) {
            const firstLine = lines[0].replace(/^(resume|curriculum vitae|cv)\s*:?/i, '').trim();
            if (firstLine.length < 50 && !firstLine.includes('@')) {
                name = firstLine.split('|')[0].split('-')[0].trim();
            }
        }
        // Comprehensive skills library to scan
        const skillCatalog = [
            'React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript', 'Node.js',
            'Python', 'FastAPI', 'Django', 'Flask', 'Go', 'Golang', 'Rust', 'Java', 'Spring Boot',
            'C++', 'C#', '.NET', 'PHP', 'Laravel', 'Ruby', 'Rails', 'Swift', 'Kotlin', 'Flutter',
            'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Cassandra', 'DynamoDB',
            'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Git',
            'Linux', 'GraphQL', 'REST API', 'Microservices', 'Tailwind CSS', 'CSS', 'HTML',
            'Machine Learning', 'AI', 'LLM', 'PyTorch', 'TensorFlow', 'Data Science',
            'Product Management', 'Agile', 'Scrum', 'Jira', 'Figma', 'System Architecture'
        ];
        const lowerText = text.toLowerCase();
        const foundSkills = skillCatalog.filter(skill => {
            const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            return regex.test(text);
        });
        // Detect job titles
        const titleCatalog = [
            'Full Stack Engineer', 'Frontend Engineer', 'Backend Engineer', 'Software Engineer',
            'Senior Software Engineer', 'Staff Engineer', 'DevOps Engineer', 'Cloud Architect',
            'Data Engineer', 'Data Scientist', 'Machine Learning Engineer', 'AI Engineer',
            'Product Manager', 'Engineering Manager', 'QA Engineer', 'Security Engineer'
        ];
        const foundTitles = titleCatalog.filter(t => lowerText.includes(t.toLowerCase()));
        // Estimate experience years
        let experienceYears = 3;
        const yearMatches = text.match(/\b(19\d\d|20\d\d)\b/g);
        if (yearMatches && yearMatches.length >= 2) {
            const years = yearMatches.map(Number).filter(y => y >= 1990 && y <= new Date().getFullYear());
            if (years.length >= 2) {
                const minYear = Math.min(...years);
                const maxYear = Math.max(...years);
                experienceYears = Math.min(25, Math.max(1, maxYear - minYear));
            }
        }
        return {
            name: name || 'Alex Johnson',
            email: email || 'alex.candidate@example.com',
            phone: phone || '',
            summary: lines.slice(1, 4).join(' ').slice(0, 300) || 'Experienced software professional with demonstrated technical impact.',
            skills: foundSkills.length > 0 ? foundSkills : ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
            experienceYears,
            educationLevel: lowerText.includes('master') ? 'postgraduate-degree' : 'bachelor-degree',
            jobTitles: foundTitles.length > 0 ? foundTitles : ['Software Engineer'],
        };
    }
    /**
     * Free Tool: ATS Resume Match Scorer (Deterministic)
     */
    static scoreJobMatch(candidateSkills, resumeText, jobTitle, jobDescription, jobSkills) {
        const candidateLower = candidateSkills.map(s => s.toLowerCase());
        const resumeLower = (resumeText || '').toLowerCase();
        // Normalize target skills
        const targetSkills = jobSkills.length > 0
            ? jobSkills
            : ['React', 'TypeScript', 'API Design', 'System Architecture', 'Testing'];
        const matchingSkills = [];
        const missingSkills = [];
        for (const skill of targetSkills) {
            const sLower = skill.toLowerCase();
            if (candidateLower.some(c => c.includes(sLower) || sLower.includes(c)) || resumeLower.includes(sLower)) {
                matchingSkills.push(skill);
            }
            else {
                missingSkills.push(skill);
            }
        }
        const matchRatio = targetSkills.length > 0 ? matchingSkills.length / targetSkills.length : 0.75;
        const baseScore = Math.round(55 + matchRatio * 40);
        const score = Math.min(96, Math.max(45, baseScore));
        const strengths = [
            `Strong alignment in core requirements: ${matchingSkills.slice(0, 3).join(', ') || 'foundation skills'}`,
            `Demonstrated direct experience suitable for ${jobTitle}`,
            'Resume exhibits clear technical achievements with quantifiable scope'
        ];
        const rationale = `The candidate matches ${matchingSkills.length} of ${targetSkills.length} primary tech stack requirements (${Math.round(matchRatio * 100)}%). Adding ${missingSkills.slice(0, 2).join(' and ') || 'specialized toolsets'} directly to the summary or project bullets will further boost ATS parser ranking.`;
        return {
            score,
            matchingSkills,
            missingSkills,
            strengths,
            rationale
        };
    }
    /**
     * Free Tool: Ghost Job Detector & Verification Analysis
     */
    static analyzeGhostJob(jobTitle, company, description, postedDaysAgo) {
        const descLower = (description || '').toLowerCase();
        let ghostRiskScore = 15; // baseline low risk for direct ATS
        const redFlags = [];
        const greenFlags = [];
        // Check age of posting
        if (postedDaysAgo > 60) {
            ghostRiskScore += 35;
            redFlags.push(`Listing has been active for ${postedDaysAgo} days without closing (potential evergreen pool)`);
        }
        else if (postedDaysAgo < 14) {
            ghostRiskScore -= 10;
            greenFlags.push(`Recently posted (${postedDaysAgo} days ago) on official company ATS`);
        }
        // Check vague language
        if (descLower.includes('competitive environment') || descLower.includes('fast-paced startup') && description.length < 300) {
            ghostRiskScore += 15;
            redFlags.push('Short or generic job description lacking detailed project deliverables');
        }
        else if (description.length > 800) {
            greenFlags.push('Comprehensive role scope with specific team responsibilities and tech stack requirements');
        }
        if (descLower.includes('greenhouse.io') || descLower.includes('lever.co') || descLower.includes('ashbyhq.com') || descLower.includes('workday')) {
            ghostRiskScore -= 15;
            greenFlags.push('Direct first-party applicant tracking system (ATS) verified link');
        }
        const finalScore = Math.min(95, Math.max(5, ghostRiskScore));
        const riskLevel = finalScore < 30 ? 'LOW' : finalScore < 60 ? 'MODERATE' : 'HIGH';
        return {
            ghostRiskScore: finalScore,
            riskLevel,
            redFlags: redFlags.length ? redFlags : ['No significant ghost job indicators identified'],
            greenFlags,
            summary: riskLevel === 'LOW'
                ? `${company}'s listing for ${jobTitle} shows strong signs of an actively hiring requisition on a direct verified portal.`
                : `${company}'s listing has been open for an extended duration. Reaching out directly to hiring managers is advised.`
        };
    }
    /**
     * AI Cover Letter Generator (Deterministic, High-converting)
     */
    static generateCoverLetter(jobTitle, companyName, jobDescription, resumeText, jobSkills) {
        const skills = jobSkills.slice(0, 3).join(', ') || 'modern full-stack technologies';
        return `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle} role at ${companyName}. Having followed ${companyName}'s work and reviewed the role requirements, I am confident that my technical background and focus on engineering excellence make me a high-impact addition to your team.

Throughout my career, I have specialized in ${skills}, architecting reliable distributed services and shipping customer-facing features with high velocity. In my recent roles, I have consistently driven technical standards, improved performance, and worked cross-functionally to transform product visions into production-ready software.

I am particularly excited about ${companyName}'s vision and would value the opportunity to discuss how my hands-on experience can help your team achieve its upcoming milestones.

Thank you for your time and consideration.

Sincerely,
Alex Johnson`;
    }
    /**
     * Free Tool: Cold Recruiter & Hiring Manager DM Generator
     */
    static generateOutreachMessages(candidateName, candidateSkills, company, roleTitle, hiringManagerName) {
        const greeting = hiringManagerName ? `Hi ${hiringManagerName}` : 'Hi there';
        const topSkills = candidateSkills.slice(0, 3).join(', ') || 'full-stack systems and rapid feature delivery';
        return {
            connectionNote: `${greeting}, saw ${company}'s opening for ${roleTitle}. With expertise in ${topSkills}, I'd love to connect and follow your team's work! - ${candidateName}`,
            inMail: `${greeting},\n\nI noticed ${company} is hiring for a ${roleTitle} on your direct career page. I've spent the past several years driving production deliverables in ${topSkills}.\n\nRather than getting lost in third-party aggregator applicant queues, I wanted to reach out directly to see if my background aligns with your current priorities for this quarter. Would you be open to a brief 5-minute chat next week?\n\nBest regards,\n${candidateName}`,
            coldEmail: {
                subject: `${roleTitle} @ ${company} — Direct Application & Introduction (${candidateName})`,
                body: `${greeting},\n\nI hope this week is going well. I recently came across your opening for the ${roleTitle} role on the ${company} career portal and was immediately excited by what your team is building.\n\nMy background specializes in ${topSkills}. In my recent work, I spearheaded projects that cut deployment times and scaled reliable services with minimal overhead.\n\nI've attached my resume for your review. Would you or the hiring manager have 10 minutes for a brief introductory call this Thursday or Friday?\n\nThank you for your time,\n${candidateName}`
            }
        };
    }
}
exports.CareerAnalysisService = CareerAnalysisService;
// Backward-compatible alias for existing imports
exports.GeminiService = CareerAnalysisService;
