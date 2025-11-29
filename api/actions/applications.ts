import { makeAuthenticatedRequest } from '@/api/config.server';
import { JobApplicationPayload } from '@/types/job-application-form';

export const applyForJob = async (payload: JobApplicationPayload) => {
  const formData = new FormData();
  formData.append('cover_letter', payload.cover_letter);
  formData.append('resume', payload.resume);
  formData.append('job_id', payload.job_id);

  const res = await makeAuthenticatedRequest('/talent/applications', {
    method: 'POST',
    body: formData,
  });

  return res?.data;
};
