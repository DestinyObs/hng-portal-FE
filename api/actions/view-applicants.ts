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
