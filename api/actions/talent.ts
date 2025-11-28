import { makeAuthenticatedRequest } from '../config.server';
import { RawJob, TalentJobsQueryParams } from '@/types/job-card';
import { APIResponse } from '../config.server';

export const getTalentJobs = async (
  params?: TalentJobsQueryParams,
): Promise<APIResponse<RawJob[]>> => {
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

  return makeAuthenticatedRequest<RawJob[]>('/talent/jobs', {
    method: 'GET',
    params: stringParams,
  });
};

export const getSavedJobs = async (): Promise<APIResponse<RawJob[]>> => {
  return makeAuthenticatedRequest<RawJob[]>('/talent/jobs/bookmark', {
    method: 'GET',
  });
};
