import { makeAuthenticatedRequest } from '@/api/config.server';
import { JobApplicationPayload } from '@/types/job-application-form';

export const applyForJob = async (payload: JobApplicationPayload) => {
  const formData = new FormData();

  // Append text fields directly (not as objects with .value)
  formData.append('cover_letter', payload.cover_letter);
  formData.append('job_id', payload.job_id);

  // Append file - ensure it's a File or Blob object
  formData.append('resume', payload.resume);
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }
  try {
    const res = await makeAuthenticatedRequest('/talent/applications', {
      method: 'POST',
      body: formData,
      // DO NOT set Content-Type header - let fetch set it automatically with boundary
    });
    console.log(res);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
