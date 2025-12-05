'use server';

import { makeAuthenticatedRequest } from '@/api/config.server';

export async function updateApplicationStatus(
  companyId: string,
  jobId: string,
  applicationId: string,
  newStatus: 'pending' | 'approved' | 'rejected'
) {
  // The endpoint format from your Bruno file:
  // PUT /employer/company/{companyId}/jobs/{jobId}/applications/{applicationId}/status/{newStatus}
  
  console.log('Server action called with:', { companyId, jobId, applicationId, newStatus });
  
  const endpoint = `employer/company/${companyId}/jobs/${jobId}/applications/${applicationId}/status/${newStatus}`;
  
  console.log('Calling endpoint:', endpoint);
  
  const response = await makeAuthenticatedRequest(
    endpoint,
    {
      method: 'PUT',
    }
  );

  console.log('Server action response:', response);

  return response;
}