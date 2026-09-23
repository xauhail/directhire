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
  daysAgo?: number | string;
  educationLevels?: string[];
  employmentTypes?: string[];
  experienceLevels?: string[];
  jobTitles?: string[];
  keywordMatch?: 'ANY' | 'ALL';
  keywords?: string[];
  locations?: LocationItem[];
  countries?: string[];
  salaryCurrency?: string;
  salaryMinimum?: number;
  salaryMaximum?: number;
  salaryUnit?: SalaryUnit;
  salarySpecifiedOnly?: boolean;
  hasCompensation?: boolean;
  taxonomies?: string[];
  categories?: string[];
  worldwide?: boolean;
  isRemoteOnly?: boolean;
  workArrangements?: WorkplaceType[];
  company?: string;
  companySlug?: string;
}

export interface JobSearchRequest {
  mode?: 'GROUPED' | 'FLAT';
  page?: number;
  pageSize?: number;
  query?: string;
  title?: string;
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
