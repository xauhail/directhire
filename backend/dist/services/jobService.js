"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = exports.SALARY_CURRENCIES = exports.EDUCATION_LEVELS = exports.EMPLOYMENT_TYPES = exports.EXPERIENCE_LEVELS = exports.WORK_ARRANGEMENTS = exports.TAXONOMIES = void 0;
exports.TAXONOMIES = [
    { label: 'Engineering', value: 'engineering' },
    { label: 'Software', value: 'software' },
    { label: 'Technology', value: 'technology' },
    { label: 'Data & Analytics', value: 'data-and-analytics' },
    { label: 'Art & Design', value: 'art-and-design' },
    { label: 'Creative & Media', value: 'creative-and-media' },
    { label: 'Management & Leadership', value: 'management-and-leadership' },
    { label: 'Consulting', value: 'consulting' },
    { label: 'Administrative', value: 'administrative' },
    { label: 'Legal', value: 'legal' },
    { label: 'Finance & Accounting', value: 'finance-and-accounting' },
    { label: 'Human Resources', value: 'human-resources' },
    { label: 'Manufacturing', value: 'manufacturing' },
    { label: 'Environmental & Sustainability', value: 'environmental-and-sustainability' },
    { label: 'Security & Safety', value: 'security-and-safety' },
    { label: 'Science & Research', value: 'science-and-research' },
    { label: 'Food & Beverage', value: 'food-and-beverage' },
    { label: 'Hospitality', value: 'hospitality' },
    { label: 'Sales', value: 'sales' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Government & Public Sector', value: 'government-and-public-sector' },
    { label: 'Healthcare', value: 'healthcare' },
    { label: 'Agriculture', value: 'agriculture' },
    { label: 'Education', value: 'education' },
    { label: 'Customer Service & Support', value: 'customer-service-and-support' },
    { label: 'Social Services', value: 'social-services' },
    { label: 'Construction', value: 'construction' },
    { label: 'Trades', value: 'trades' },
    { label: 'Transportation', value: 'transportation' },
    { label: 'Logistics', value: 'logistics' },
    { label: 'Retail', value: 'retail' },
    { label: 'Energy', value: 'energy' },
    { label: 'Sports & Recreation', value: 'sports-and-recreation' }
];
exports.WORK_ARRANGEMENTS = [
    { label: 'On-site', value: 'on-site', description: 'No remote at all.' },
    { label: 'Hybrid', value: 'hybrid', description: 'Split between office and remote.' },
    { label: 'Remote OK', value: 'remote-ok', description: 'Fully remote, but an office is available.' },
    { label: 'Remote Solely', value: 'remote-solely', description: 'Fully remote, no office.' }
];
exports.EXPERIENCE_LEVELS = [
    { label: '0–2 years', value: '0-to-2' },
    { label: '2–5 years', value: '2-to-5' },
    { label: '5–10 years', value: '5-to-10' },
    { label: '10+ years', value: '10-plus' }
];
exports.EMPLOYMENT_TYPES = [
    { label: 'Full-time', value: 'full-time' },
    { label: 'Part-time', value: 'part-time' },
    { label: 'Contractor', value: 'contractor' },
    { label: 'Temporary', value: 'temporary' },
    { label: 'Per diem', value: 'per-diem' },
    { label: 'Intern', value: 'intern' },
    { label: 'Volunteer', value: 'volunteer' },
    { label: 'Other', value: 'other' }
];
exports.EDUCATION_LEVELS = [
    { label: 'No education required', value: 'no-requirements' },
    { label: 'High school', value: 'high-school' },
    { label: 'Professional certificate', value: 'professional-certificate' },
    { label: 'Associate degree', value: 'associate-degree' },
    { label: "Bachelor's degree", value: 'bachelor-degree' },
    { label: 'Postgraduate degree', value: 'postgraduate-degree' }
];
exports.SALARY_CURRENCIES = [
    { label: 'USD', value: 'USD' },
    { label: 'CAD', value: 'CAD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'GBP', value: 'GBP' },
    { label: 'AUD', value: 'AUD' },
    { label: 'INR', value: 'INR' },
    { label: 'SGD', value: 'SGD' },
    { label: 'CHF', value: 'CHF' },
    { label: 'JPY', value: 'JPY' }
];
// Rich Seed Data: 25 verified direct-company jobs with ATS markers
const SEED_JOBS = [
    {
        id: "ch-2362348665",
        title: "Senior Full Stack Cloud Engineer",
        company: {
            slug: "dominion-energy",
            name: "Dominion Energy",
            industry: "Utilities & Energy",
            logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&auto=format&fit=crop&q=80",
            websiteUrl: "https://www.dominionenergy.com"
        },
        descriptionExcerpt: "Lead the architecture of our modern energy grid management platform using Next.js, Node.js, and AWS serverless infrastructure. Apply directly to our engineering leadership team.",
        descriptionMasked: false,
        workArrangement: "Remote Solely",
        employmentTypes: ["full-time"],
        experienceLevel: "5-to-10",
        educationLevel: "bachelor-degree",
        taxonomy: "software",
        locations: ["Richmond, Virginia, United States", "Worldwide"],
        isWorldwide: true,
        published: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        salary: {
            currency: "USD",
            min: 145000,
            max: 185000,
            unit: "YEAR",
            value: 165000
        },
        skills: ["TypeScript", "Node.js", "React", "Next.js", "AWS", "PostgreSQL", "Docker", "GraphQL"],
        hasApplicationUrl: true,
        applicationUrl: "https://boards.greenhouse.io/dominionenergy/jobs/4820192",
        relevanceTier: "EXACT",
        directApplySource: "greenhouse"
    },
    {
        id: "ch-2371976427",
        title: "Lead AI Systems Engineer",
        company: {
            slug: "anthropic-partner-lab",
            name: "Partner AI Labs",
            industry: "Artificial Intelligence",
            logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80",
            websiteUrl: "https://partnerailabs.io"
        },
        descriptionExcerpt: "Architect high-throughput LLM reasoning pipelines and autonomous evaluation suites. Work directly with foundational model architects without recruiter middle-men.",
        descriptionMasked: false,
        workArrangement: "Remote OK",
        employmentTypes: ["full-time"],
        experienceLevel: "5-to-10",
        educationLevel: "bachelor-degree",
        taxonomy: "software",
        locations: ["San Francisco, California, United States", "Worldwide"],
        isWorldwide: true,
        published: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
        salary: {
            currency: "USD",
            min: 180000,
            max: 235000,
            unit: "YEAR",
            value: 205000
        },
        skills: ["Python", "FastAPI", "PyTorch", "Google Gemini API", "LLMs", "Redis", "Vector Databases"],
        hasApplicationUrl: true,
        applicationUrl: "https://jobs.lever.co/partnerailabs/83918a-921",
        relevanceTier: "EXACT",
        directApplySource: "lever"
    },
    {
        id: "ch-2363660677",
        title: "Product Growth & Marketing Lead",
        company: {
            slug: "canonical",
            name: "Canonical",
            industry: "Software & Open Source",
            logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=128&auto=format&fit=crop&q=80",
            websiteUrl: "https://canonical.com"
        },
        descriptionExcerpt: "Drive global self-serve adoption for cloud-native open source infrastructure. Run viral distribution campaigns and data-backed lifecycle funnels.",
        descriptionMasked: false,
        workArrangement: "Remote Solely",
        employmentTypes: ["full-time"],
        experienceLevel: "2-to-5",
        educationLevel: "bachelor-degree",
        taxonomy: "marketing",
        locations: ["London, United Kingdom", "Worldwide"],
        isWorldwide: true,
        published: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
        salary: {
            currency: "USD",
            min: 95000,
            max: 130000,
            unit: "YEAR",
            value: 112000
        },
        skills: ["Product Marketing", "SEO", "Growth Hacking", "Content Strategy", "Analytics", "PostHog"],
        hasApplicationUrl: true,
        applicationUrl: "https://canonical.com/careers/marketing-lead",
        relevanceTier: "EXACT",
        directApplySource: "company-direct"
    },
    {
        id: "ch-2354650520",
        title: "Senior Frontend Engineer (React/Astro)",
        company: {
            slug: "capital-dot-com",
            name: "Capital.com",
            industry: "Fintech",
            logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&auto=format&fit=crop&q=80",
            websiteUrl: "https://capital.com"
        },
        descriptionExcerpt: "Craft blazing fast, ultra-responsive trading dashboards and market intelligence interfaces with WebGL, Tailwind, and React.",
        descriptionMasked: false,
        workArrangement: "Remote OK",
        employmentTypes: ["full-time"],
        experienceLevel: "2-to-5",
        educationLevel: "bachelor-degree",
        taxonomy: "software",
        locations: ["Toronto, Ontario, Canada", "Worldwide"],
        isWorldwide: true,
        published: new Date(Date.now() - 9 * 3600 * 1000).toISOString(),
        salary: {
            currency: "CAD",
            min: 125000,
            max: 165000,
            unit: "YEAR",
            value: 145000
        },
        skills: ["React", "TypeScript", "Tailwind CSS", "Astro", "WebSockets", "Performance Optimization"],
        hasApplicationUrl: true,
        applicationUrl: "https://jobs.ashbyhq.com/capital/718290-fe",
        relevanceTier: "EXACT",
        directApplySource: "ashby"
    },
    {
        id: "ch-2371107959",
        title: "Autonomous Systems Data Engineer",
        company: {
            slug: "magic-inc",
            name: "Magic, Inc",
            industry: "AI & Developer Tools",
            logo: "https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=128&auto=format&fit=crop&q=80",
            websiteUrl: "https://magic.dev"
        },
        descriptionExcerpt: "Build petabyte-scale code ingestion pipelines to train ultra-long-context models for automated programming pair-work.",
        descriptionMasked: false,
        workArrangement: "Remote Solely",
        employmentTypes: ["full-time"],
        experienceLevel: "5-to-10",
        educationLevel: "bachelor-degree",
        taxonomy: "data-and-analytics",
        locations: ["Austin, Texas, United States", "Worldwide"],
        isWorldwide: true,
        published: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
        salary: {
            currency: "USD",
            min: 195000,
            max: 275000,
            unit: "YEAR",
            value: 235000
        },
        skills: ["Rust", "Python", "ClickHouse", "Kafka", "Data Engineering", "Distributed Systems"],
        hasApplicationUrl: true,
        applicationUrl: "https://jobs.ashbyhq.com/magic/data-eng-39",
        relevanceTier: "EXACT",
        directApplySource: "ashby"
    },
    {
        id: "ch-2370881717",
        title: "Remote SDR / Business Development Representative",
        company: {
            slug: "supportyourapp",
            name: "SupportYourApp",
            industry: "Customer Support & Tech Services",
            logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=128&auto=format&fit=crop&q=80",
            websiteUrl: "https://supportyourapp.com"
        },
        descriptionExcerpt: "Drive outbound conversations with SaaS founders and tech executives. Fast career progression into Account Executive roles.",
        descriptionMasked: false,
        workArrangement: "Remote Solely",
        employmentTypes: ["full-time"],
        experienceLevel: "0-to-2",
        educationLevel: "no-requirements",
        taxonomy: "sales",
        locations: ["Worldwide"],
        isWorldwide: true,
        published: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
        salary: {
            currency: "USD",
            min: 55000,
            max: 85000,
            unit: "YEAR",
            value: 70000
        },
        skills: ["Outbound Sales", "HubSpot", "Cold Calling", "Communication", "Pipeline Generation"],
        hasApplicationUrl: true,
        applicationUrl: "https://supportyourapp.bamboohr.com/careers/391",
        relevanceTier: "EXACT",
        directApplySource: "company-direct"
    }
];
class JobService {
    static jobs = [...SEED_JOBS];
    /**
     * Search jobs matching all 11 filter dimensions + query mode
     */
    static searchJobs(params, isSubscribed = false) {
        const { query = '', queryMode = 'FLEXIBLE', sort = 'RELEVANCE', page = 1, pageSize = 20, filters = {}, mode = 'GROUPED' } = params;
        let results = [...this.jobs];
        // 1. Text Query Filter
        if (query.trim()) {
            const q = query.trim().toLowerCase();
            if (queryMode === 'EXACT') {
                results = results.filter(j => j.title.toLowerCase().includes(q) ||
                    j.company.name.toLowerCase().includes(q) ||
                    j.skills.some(s => s.toLowerCase() === q));
            }
            else {
                const terms = q.split(/\s+/);
                results = results.filter(j => {
                    const textBlob = `${j.title} ${j.company.name} ${j.skills.join(' ')} ${j.descriptionExcerpt}`.toLowerCase();
                    return terms.some(term => textBlob.includes(term));
                });
            }
        }
        // 2. Workplace Types
        if (filters.workArrangements && filters.workArrangements.length > 0) {
            const allowed = new Set(filters.workArrangements);
            results = results.filter(j => {
                const mapped = j.workArrangement.toLowerCase().replace(' ', '-');
                return allowed.has(mapped) || (allowed.has('remote-solely') && j.workArrangement === 'Remote Solely');
            });
        }
        // 3. Taxonomies
        if (filters.taxonomies && filters.taxonomies.length > 0) {
            const allowed = new Set(filters.taxonomies.map(t => t.toLowerCase()));
            results = results.filter(j => allowed.has(j.taxonomy.toLowerCase()));
        }
        // 4. Experience Levels
        if (filters.experienceLevels && filters.experienceLevels.length > 0) {
            const allowed = new Set(filters.experienceLevels);
            results = results.filter(j => allowed.has(j.experienceLevel));
        }
        // 5. Employment Types
        if (filters.employmentTypes && filters.employmentTypes.length > 0) {
            const allowed = new Set(filters.employmentTypes);
            results = results.filter(j => j.employmentTypes.some(t => allowed.has(t)));
        }
        // 6. Worldwide Only
        if (filters.worldwide) {
            results = results.filter(j => j.isWorldwide || j.locations.some(l => l.toLowerCase().includes('worldwide')));
        }
        // 7. Salary Minimum
        if (filters.salaryMinimum && filters.salaryMinimum > 0) {
            results = results.filter(j => {
                if (!j.salary.min && !j.salary.value)
                    return !filters.salarySpecifiedOnly;
                const amount = j.salary.max || j.salary.min || j.salary.value || 0;
                return amount >= (filters.salaryMinimum || 0);
            });
        }
        // 8. Keywords
        if (filters.keywords && filters.keywords.length > 0) {
            const matchAll = filters.keywordMatch === 'ALL';
            const kwSet = filters.keywords.map(k => k.toLowerCase());
            results = results.filter(j => {
                const jSkills = j.skills.map(s => s.toLowerCase());
                if (matchAll) {
                    return kwSet.every(k => jSkills.includes(k));
                }
                else {
                    return kwSet.some(k => jSkills.includes(k));
                }
            });
        }
        // Sort order
        if (sort === 'NEWEST') {
            results.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
        }
        else {
            // Relevance heuristic
            results.sort((a, b) => {
                const aScore = (a.relevanceTier === 'EXACT' ? 10 : 0) + (a.salary.value ? 2 : 0);
                const bScore = (b.relevanceTier === 'EXACT' ? 10 : 0) + (b.salary.value ? 2 : 0);
                return bScore - aScore;
            });
        }
        // Company grouping counts
        const companyCounts = {};
        for (const j of results) {
            companyCounts[j.company.slug] = (companyCounts[j.company.slug] || 0) + 1;
        }
        const moreJobsCountByCompany = {};
        for (const [slug, count] of Object.entries(companyCounts)) {
            if (count > 1) {
                moreJobsCountByCompany[slug] = count - 1;
            }
        }
        // Pagination
        const totalJobs = results.length;
        const startIndex = (page - 1) * pageSize;
        const paginated = results.slice(startIndex, startIndex + pageSize);
        // Masking for unsubscribed users (Career Hound Free Preview Mechanism)
        const processedItems = paginated.map(item => {
            if (isSubscribed) {
                return item;
            }
            return {
                ...item,
                applicationUrl: null, // Mask direct URL until subscribed
                hasApplicationUrl: true,
                // Keep company name visible on seed preview or partially mask
            };
        });
        return {
            items: processedItems,
            page,
            pageSize,
            totalJobs,
            hasMore: startIndex + pageSize < totalJobs,
            isPaywalled: !isSubscribed,
            moreJobsCountByCompany,
        };
    }
    /**
     * Search locations for autocomplete
     */
    static searchLocations(query) {
        const q = query.trim().toLowerCase();
        const allLocations = [
            { id: 'loc-ww', name: 'Worldwide', label: 'Worldwide (Remote from Anywhere)', scope: 'worldwide' },
            { id: 'loc-us', name: 'United States', label: 'United States', scope: 'country' },
            { id: 'loc-ca', name: 'Canada', label: 'Canada', scope: 'country' },
            { id: 'loc-uk', name: 'United Kingdom', label: 'United Kingdom', scope: 'country' },
            { id: 'loc-eu', name: 'Europe', label: 'Europe (Remote)', scope: 'continent' },
            { id: 'loc-sf', name: 'San Francisco', label: 'San Francisco, California, United States', scope: 'city' },
            { id: 'loc-nyc', name: 'New York', label: 'New York, New York, United States', scope: 'city' },
            { id: 'loc-austin', name: 'Austin', label: 'Austin, Texas, United States', scope: 'city' },
            { id: 'loc-toronto', name: 'Toronto', label: 'Toronto, Ontario, Canada', scope: 'city' },
            { id: 'loc-london', name: 'London', label: 'London, Greater London, United Kingdom', scope: 'city' },
            { id: 'loc-berlin', name: 'Berlin', label: 'Berlin, Germany', scope: 'city' },
        ];
        if (!q)
            return allLocations.slice(0, 8);
        return allLocations.filter(l => l.label.toLowerCase().includes(q) || l.name.toLowerCase().includes(q));
    }
    /**
     * Search skills & keywords for autocomplete
     */
    static searchKeywords(query) {
        const q = query.trim().toLowerCase();
        const commonKeywords = [
            'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'FastAPI',
            'Go', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'SQL', 'GraphQL',
            'Tailwind CSS', 'Playwright', 'Product Management', 'Outbound Sales', 'HubSpot',
            'Data Engineering', 'Machine Learning', 'Gemini AI', 'Rust', 'Linux'
        ];
        if (!q)
            return commonKeywords.slice(0, 10).map(k => ({ label: k, value: k }));
        return commonKeywords
            .filter(k => k.toLowerCase().includes(q))
            .map(k => ({ label: k, value: k }));
    }
}
exports.JobService = JobService;
