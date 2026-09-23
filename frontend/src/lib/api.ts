const BACKEND_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? 'http://localhost:4000'
  : 'http://localhost:4000';

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BACKEND_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    let errorMsg = `API Error ${res.status}`;
    try {
      const json = await res.json();
      errorMsg = json.message || json.error || errorMsg;
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }
  return res.json();
}

// Job Search
export async function searchJobs(params: any, isSubscribed = false, isAuthenticated = false) {
  return fetchApi<any>('/api/job-search', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'x-user-subscribed': isSubscribed ? 'true' : 'false',
      'x-user-authenticated': isAuthenticated ? 'true' : 'false',
    },
    body: JSON.stringify(params),
  });
}

export async function getSearchOptions() {
  return fetchApi<any>('/api/job-search/options');
}

export async function searchLocations(q: string) {
  return fetchApi<{ items: any[] }>(`/api/job-search/locations?q=${encodeURIComponent(q)}`);
}

export async function searchKeywords(q: string) {
  return fetchApi<{ items: any[] }>(`/api/job-search/keywords?q=${encodeURIComponent(q)}`);
}

// Onboarding
export async function submitOnboarding(data: any) {
  return fetchApi<any>('/api/onboarding', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function parseResume(resumeText: string) {
  return fetchApi<any>('/api/onboarding/parse-resume', {
    method: 'POST',
    body: JSON.stringify({ resumeText }),
  });
}

// Free Traffic Tools
export async function getAtsScore(resumeText: string, jobDescription: string, jobTitle?: string) {
  return fetchApi<any>('/api/tools/ats-score', {
    method: 'POST',
    body: JSON.stringify({ resumeText, jobDescription, jobTitle }),
  });
}

export async function detectGhostJob(jobTitle: string, company: string, description: string, postedDaysAgo?: number) {
  return fetchApi<any>('/api/tools/ghost-detector', {
    method: 'POST',
    body: JSON.stringify({ jobTitle, company, description, postedDaysAgo }),
  });
}

export async function generateOutreach(candidateName: string, skills: string[], company: string, roleTitle: string, hiringManagerName?: string) {
  return fetchApi<any>('/api/tools/generate-outreach', {
    method: 'POST',
    body: JSON.stringify({ candidateName, skills, company, roleTitle, hiringManagerName }),
  });
}

export async function getSalaryBenchmark(role: string, experienceYears: number, country: string) {
  return fetchApi<any>(`/api/tools/salary-benchmark?role=${encodeURIComponent(role)}&experienceYears=${experienceYears}&country=${encodeURIComponent(country)}`);
}

// Dodo Payments Checkout
export async function createCheckoutSession(planTier: string, email: string, name?: string) {
  return fetchApi<any>('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({ planTier, email, name }),
  });
}
