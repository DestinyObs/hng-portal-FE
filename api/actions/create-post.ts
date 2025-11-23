'use server';
import { cookies } from 'next/headers';
import { makeAuthenticatedRequest } from '../config.server';
import { JobPostPayload } from '@/schemas/create-post.schema';

export const createPost = async (formData: JobPostPayload) => {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/employer/company/${formData.company_id}/jobs/store`;

  const token = (await cookies()).get('token')?.value;
  if (!token) {
    console.log('Token not found in cookies');
    return false;
  }

  console.log('Token found:', token);

  const res = await makeAuthenticatedRequest<JobPostPayload>(endpoint, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};
