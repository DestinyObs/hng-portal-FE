'use server';
import { cookies } from 'next/headers';
import { makeAuthenticatedRequest } from '../config.server';
import {
  JobDraftPayload,
  JobPostPayload,
} from '@/validations/create-post.schema';

export const createPost = async (formData: JobPostPayload) => {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/employer/company/${formData.company_id}/jobs/store`;

  const token = (await cookies()).get('token')?.value;
  if (!token) return false;

  try {
    const res = await makeAuthenticatedRequest<JobPostPayload>(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (res && !res?.success) {
      throw res.errors;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
  }
    if (res && !res?.success) {
      throw res.errors;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

export const updateStatus = async (
  company_id: string,
  jobId: string,
  status: string,
) => {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/employer/company/${company_id}/jobs/${jobId}/${status}`;

  const token = (await cookies()).get('token')?.value;
  if (!token) return false;

  try {
    const res = await makeAuthenticatedRequest<JobPostPayload>(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (res && !res?.success) {
      throw res.errors;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

export const deleteJob = async (company_id: string, jobId: string) => {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/employer/company/${company_id}/jobs/${jobId}`;

  const token = (await cookies()).get('token')?.value;
  if (!token) return false;

  try {
    const res = await makeAuthenticatedRequest(endpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (res && !res?.success) {
      throw res.errors;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

export const draftPost = async (formData: JobDraftPayload) => {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/employer/company/${formData.company_id}/jobs/draft`;

  const token = (await cookies()).get('token')?.value;
  if (!token) return;

  try {
    const res = await makeAuthenticatedRequest<JobDraftPayload>(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (res && !res?.success) {
      throw res.errors;
    }

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

export const updatePost = async (
  companyId: string,
  jobId: string,
  formData: JobPostPayload,
) => {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/employer/company/${companyId}/jobs/${jobId}`;

  const token = (await cookies()).get('token')?.value;
  if (!token) {
    // console.log('Token not found in cookies');
    return false;
  }

  // console.log('Token found:', token);

  // ✅ Extract and normalize skills
  const skillIds = Array.isArray(formData.skills)
    ? (formData.skills as (string | { id: string; name?: string })[])
        .map((skill) => (typeof skill === 'string' ? skill : skill?.id))
        .filter(Boolean)
    : [];

  // ✅ Build clean payload with only the fields the API expects
  const cleanPayload = {
    category_id: formData.category_id,
    title: formData.title,
    description: formData.description,
    skills: skillIds, // ✅ Array of skill IDs only
    acceptance_criteria: formData.acceptance_criteria,
    track_id: formData.track_id,
    job_type_id: formData.job_type_id,
    work_mode_id: formData.work_mode_id,
    price: formData.price,
    state_id: formData.state_id,
    country_id: formData.country_id,
  };

  // console.log('🔍 Clean payload being sent:', JSON.stringify(cleanPayload, null, 2));
  // console.log('🔍 Skills in payload:', cleanPayload.skills);

  const res = await makeAuthenticatedRequest<JobPostPayload>(endpoint, {
    method: 'PUT',
    body: cleanPayload, // ✅ Send clean payload, not raw formData
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};
