const TAXONOMIES = [
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

const WORK_ARRANGEMENTS = [
  { label: 'On-site', value: 'on-site', description: 'No remote at all.' },
  { label: 'Hybrid', value: 'hybrid', description: 'Split between office and remote.' },
  { label: 'Remote OK', value: 'remote-ok', description: 'Fully remote, but an office is available.' },
  { label: 'Remote Solely', value: 'remote-solely', description: 'Fully remote, no office.' }
];

const EXPERIENCE_LEVELS = [
  { label: '0–2 years', value: '0-to-2' },
  { label: '2–5 years', value: '2-to-5' },
  { label: '5–10 years', value: '5-to-10' },
  { label: '10+ years', value: '10-plus' }
];

const EMPLOYMENT_TYPES = [
  { label: 'Full-time', value: 'full-time' },
  { label: 'Part-time', value: 'part-time' },
  { label: 'Contractor', value: 'contractor' },
  { label: 'Temporary', value: 'temporary' },
  { label: 'Per diem', value: 'per-diem' },
  { label: 'Intern', value: 'intern' },
  { label: 'Volunteer', value: 'volunteer' },
  { label: 'Other', value: 'other' }
];

const EDUCATION_LEVELS = [
  { label: 'No education required', value: 'no-requirements' },
  { label: 'High school', value: 'high-school' },
  { label: 'Professional certificate', value: 'professional-certificate' },
  { label: 'Associate degree', value: 'associate-degree' },
  { label: "Bachelor's degree", value: 'bachelor-degree' },
  { label: 'Postgraduate degree', value: 'postgraduate-degree' }
];

const SALARY_CURRENCIES = [
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

const COUNTRIES = [
  { label: 'Worldwide (Anywhere)', value: 'Worldwide' },
  { label: 'United States', value: 'United States' },
  { label: 'United Kingdom', value: 'United Kingdom' },
  { label: 'Canada', value: 'Canada' },
  { label: 'Australia', value: 'Australia' },
  { label: 'Germany', value: 'Germany' },
  { label: 'India', value: 'India' },
  { label: 'Singapore', value: 'Singapore' },
  { label: 'Switzerland', value: 'Switzerland' },
  { label: 'United Arab Emirates', value: 'United Arab Emirates' }
];

export async function onRequest() {
  return new Response(JSON.stringify({
    taxonomies: TAXONOMIES,
    categories: TAXONOMIES,
    countries: COUNTRIES,
    workArrangements: WORK_ARRANGEMENTS,
    experienceLevels: EXPERIENCE_LEVELS,
    employmentTypes: EMPLOYMENT_TYPES,
    educationLevels: EDUCATION_LEVELS,
    salaryCurrencies: SALARY_CURRENCIES,
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
