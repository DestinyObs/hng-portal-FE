'use server';

import { makeAuthenticatedRequest } from '@/api/config.server';

export async function getApplicantDetails(
  companyId: string,
  jobId: string,
  applicationId: string
) {
  const response = await makeAuthenticatedRequest(
    `employer/company/${companyId}/jobs/${jobId}/applications/${applicationId}`,
    {
      method: 'GET',
    }
  );

  return response;
}