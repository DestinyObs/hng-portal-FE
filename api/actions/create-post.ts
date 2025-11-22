'use server';
import { cookies } from 'next/headers';
import { makeAuthenticatedRequest } from '../config.server';
import { JobPostPayload } from '@/schemas/create-post.schema';

const company_id = '019aa688-7042-7113-a059-48068e19b6a9';
const endpoint =
  'https://api.staging.takeda.emerj.net/api/employer/company/019aa688-7042-7113-a059-48068e19b6a9/jobs/store';
// const endpoint = `"${process.env.NEXT_PUBLIC_API_URL}/employer/company/${company_id}/jobs/store"`

export const createPost = async (formData: JobPostPayload) => {
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
