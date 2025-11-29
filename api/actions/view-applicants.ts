'use server';

import { ViewJobApplications } from '@/types/view-job-applicants';
import { makeAuthenticatedRequest } from '../config.server';

export const view_applicants_per_job = async (company_id: string) => {
  return await makeAuthenticatedRequest<ViewJobApplications>(
    `employer/company/${company_id}/applications`,
    {
      method: 'GET',
    },
  );
};
