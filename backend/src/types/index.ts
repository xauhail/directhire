export type WorkplaceType = 'on-site' | 'hybrid' | 'remote-ok' | 'remote-solely';

export type EmploymentType = 
  | 'full-time' 
  | 'part-time' 
  | 'contractor' 
  | 'temporary' 
  | 'per-diem' 
  | 'intern' 
  | 'volunteer' 
  | 'other';

export type ExperienceLevel = '0-to-2' | '2-to-5' | '5-to-10' | '10-plus';

export type EducationLevel = 
  | 'no-requirements' 
  | 'high-school' 
  | 'professional-certificate' 
  | 'associate-degree' 
  | 'bachelor-degree' 
  | 'postgraduate-degree';

export type SalaryUnit = 'hour' | 'day' | 'week' | 'month' | 'year';

export interface LocationItem {
  id: string;
  name: string;
  label: string;
  scope: 'city' | 'region' | 'country' | 'continent' | 'worldwide';
}

export interface CompanyInfo {
  slug: string;
  name: string;
  industry: string;
  logo: string;
  websiteUrl?: string;
}

export interface JobHighlights {
  title: string[];
  description: string[];
}

export interface SalaryInfo {
  currency: string | null;
  min: number | null;
  max: number | null;
  unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR' | null;
  value: number | null;
}

export interface JobItem {
  id: string;
  title: string;
  company: CompanyInfo;
  descriptionExcerpt: string;
  descriptionFull?: string;
  descriptionMasked: boolean;
  workArrangement: 'On-site' | 'Hybrid' | 'Remote OK' | 'Remote Solely';
  employmentTypes: string[];
  experienceLevel: string;
  educationLevel?: string;
  taxonomy: string;
  locations: string[];
  isWorldwide?: boolean;
  published: string;
  salary: SalaryInfo;
  skills: string[];
  matchedSkills?: string[];
  hasApplicationUrl: boolean;
  applicationUrl: string | null;
  relevanceTier?: 'EXACT' | 'RELATED';
  highlights?: JobHighlights;
  directApplySource?: 'greenhouse' | 'lever' | 'ashby' | 'workday' | 'company-direct';
}

export interface JobSearchFilters {
  datePosted?: string; // 'all' | '1-day-ago' | '1-week-ago' | ...
  educationLevels?: string[];
  employmentTypes?: string[];
  experienceLevels?: string[];
  jobTitles?: string[];
  keywordMatch?: 'ANY' | 'ALL';
  keywords?: string[];
  locations?: LocationItem[];
  salaryCurrency?: string;
  salaryMinimum?: number;
  salaryMaximum?: number;
  salaryUnit?: SalaryUnit;
  salarySpecifiedOnly?: boolean;
  taxonomies?: string[];
  worldwide?: boolean;
  workArrangements?: WorkplaceType[];
}

export interface JobSearchRequest {
  mode?: 'GROUPED' | 'FLAT';
  page?: number;
  pageSize?: number;
  query?: string;
  queryMode?: 'FLEXIBLE' | 'EXACT';
  sort?: 'RELEVANCE' | 'NEWEST';
  filters?: JobSearchFilters;
}

export interface JobSearchResponse {
  items: JobItem[];
  page: number;
  pageSize: number;
  totalJobs: number;
  hasMore: boolean;
  isPaywalled: boolean;
  moreJobsCountByCompany?: Record<string, number>;
}

export interface AutoApplyApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  matchScore: number;
  status: 'QUEUED' | 'MATCHED' | 'SUBMITTING' | 'APPLIED' | 'FAILED' | 'SKIPPED';
  appliedAt: string | null;
  screenshotUrl?: string;
  coverLetter?: string;
  submissionMessage?: string;
  directApplySource?: string;
  screeningAnswers?: Record<string, string>;
  errorMessage?: string;
}

export interface AutoApplySettings {
  enabled: boolean;
  minMatchScore: number; // e.g. 80
  dailyLimit: number; // e.g. 20
  appliedToday: number;
  blacklistedCompanies: string[];
  autoTailorResume: boolean;
}

export interface OnboardingData {
  targetTitles: string[];
  workArrangements: WorkplaceType[];
  isWorldwide: boolean;
  locations: string[];
  experienceLevel: ExperienceLevel;
  educationLevel: EducationLevel;
  minSalary: number;
  salaryCurrency: string;
  salaryUnit: SalaryUnit;
  skills: string[];
  resumeText?: string;
  resumeFileName?: string;
}
