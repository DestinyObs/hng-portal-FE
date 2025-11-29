import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { makeAuthenticatedRequest } from '@/api/config.server';

export const useGetUserProfile = <T>(): UseQueryResult<T> => {
  return useQuery<T>({
    queryKey: ['get-user-profile'],
    queryFn: async () => {
      const res = await makeAuthenticatedRequest(`/talent/settings/profile`);
      return res?.data as T;
    },
  });
};
