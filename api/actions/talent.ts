import { makeAuthenticatedRequest } from '../config.server';
import {
  RawJob2,
  TalentJobsQueryParams,
  TalentApplication,
} from '@/types/job-card';
import { APIResponse, SuccessResponse } from '@/types/api-response';

export const getTalentJobs = async (
  params?: TalentJobsQueryParams,
): Promise<APIResponse<RawJob2[]>> => {
  const stringParams: Record<string, string> = {};
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          // Handle array values if necessary, e.g., by joining or sending multiple params
          stringParams[key] = value.join(',');
        } else {
          stringParams[key] = String(value);
        }
      }
    }
  }

  return makeAuthenticatedRequest<RawJob2[]>('/talent/jobs', {
    method: 'GET',
    params: stringParams,
  });
};

export const getSavedJobs = async (): Promise<APIResponse<RawJob2[]>> => {
  return makeAuthenticatedRequest<RawJob2[]>('/talent/jobs/bookmark', {
    method: 'GET',
  });
};

export const getTalentApplications = async (): Promise<
  APIResponse<TalentApplication[]>
> => {
  return makeAuthenticatedRequest<TalentApplication[]>('/talent/applications', {
    method: 'GET',
  });
};

export const saveJob = async (
  jobId: string,
): Promise<APIResponse<SuccessResponse>> => {
  return makeAuthenticatedRequest<SuccessResponse>(
    `/talent/jobs/${jobId}/bookmark`,
    {
      method: 'PUT',
    },
  );
};
