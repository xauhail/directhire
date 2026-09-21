import { atom } from 'nanostores';

export interface FilterState {
  datePosted: string;
  educationLevels: string[];
  employmentTypes: string[];
  experienceLevels: string[];
  jobTitles: string[];
  keywordMatch: 'ANY' | 'ALL';
  keywords: string[];
  locations: any[];
  salaryCurrency: string;
  salaryMinimum: number | null;
  salaryUnit: 'year' | 'month' | 'hour';
  salarySpecifiedOnly: boolean;
  taxonomies: string[];
  worldwide: boolean;
  workArrangements: string[];
}

export const defaultFilters: FilterState = {
  datePosted: 'all',
  educationLevels: [],
  employmentTypes: [],
  experienceLevels: [],
  jobTitles: [],
  keywordMatch: 'ANY',
  keywords: [],
  locations: [],
  salaryCurrency: 'USD',
  salaryMinimum: null,
  salaryUnit: 'year',
  salarySpecifiedOnly: false,
  taxonomies: [],
  worldwide: false,
  workArrangements: [],
};

export const $searchQuery = atom<string>('');
export const $queryMode = atom<'FLEXIBLE' | 'EXACT'>('FLEXIBLE');
export const $sortMode = atom<'RELEVANCE' | 'NEWEST'>('RELEVANCE');
export const $filters = atom<FilterState>(defaultFilters);
export const $isSubscribed = atom<boolean>(false);
export const $isCheckoutModalOpen = atom<boolean>(false);
export const $selectedPlanTier = atom<'weekly' | 'monthly' | 'yearly'>('monthly');
export const $isAllFiltersModalOpen = atom<boolean>(false);
