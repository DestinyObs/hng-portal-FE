import { ViewJobApplications } from '@/types/view-job-applicants';
import { makeAuthenticatedRequest } from '../config.server';

export const view_applicants_per_company = async (company_id: string) => {
  const res = await makeAuthenticatedRequest<ViewJobApplications>(
    `employer/company/${company_id}/applications`,
    {
      method: 'GET',
    },
  );
  return res;
};

export const view_applicants_per_job = async (
  company_id: string,
  job_id: string,
) => {
  const res = await makeAuthenticatedRequest<ViewJobApplications>(
    `employer/company/${company_id}/jobs/${job_id}/applications`,
    {
      method: 'GET',
    },
  );
  return res;
};

// export const view_single_application = async (application_id: string) => {
//   try {
//     // These three pieces come from your URL or from the list you already fetch
//     const company_id = localStorage.getItem('company_id') || 'YOUR_COMPANY_ID_HERE';
//     const job_id = localStorage.getItem('current_job_id') || 'JOB_ID_FROM_CONTEXT';

//     // If you don’t have them stored, you can get them from the current page URL
//     const path = window.location.pathname;
//     const match = path.match(/company\/([a-f0-9-]+)\/.*\/([a-f0-9-]+)$/);
//     const actual_company_id = match ? match[1] : company_id;
//     const actual_job_id = match ? match[2] : job_id;

//     const url = `https://api.staging.connect.hng.tech/api/employer/company/${actual_company_id}/jobs/${actual_job_id}/applications/${application_id}`;

//     console.log('Fetching single application from:', url);

//     const res = await fetch(url, {
//       method: 'GET',
//       credentials: 'include',
//       cache: 'no-store',
//     });

//     if (!res.ok) {
//       console.error('API returned', res.status);
//       return { success: false };
//     }

//     const json = await res.json();
//     console.log('Single application data:', json);

//     // The real data is inside json.data or json.data.application — we cover both
//     return { 
//       success: true, 
//       data: json.data?.application || json.data || json 
//     };

//   } catch (error) {
//     console.error('Fetch failed:', error);
//     return { success: false };
//   }
// };