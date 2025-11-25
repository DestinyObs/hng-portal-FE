import { JobCardProps } from '@/types/job-card';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { makeAuthenticatedRequest } from '@/api/config.server';

export const useGetAllJobs = <T = JobCardProps[]>(
  companyId: string | undefined,
): UseQueryResult<T> => {
  return useQuery<T>({
    queryKey: ['get-all-jobs'],
    queryFn: async () => {
      const res = await makeAuthenticatedRequest(
        `employer/company/${companyId}/jobs`,
      );
      return res?.data as T;
    },
    enabled: !!companyId,
  });
};
