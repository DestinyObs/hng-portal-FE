import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeAuthenticatedRequest } from '@/api/config.server';
import { toast } from 'sonner';

export const useGetUserProfile = <T>(): UseQueryResult<T> => {
  return useQuery<T>({
    queryKey: ['get-user-profile'],
    queryFn: async () => {
      const res = await makeAuthenticatedRequest(`/talent/settings/profile`);
      return res?.data as T;
    },
  });
};

export const useUpdateUserProfile = <T, V = unknown>() => {
  const queryClient = useQueryClient();
  const { mutate: updateProfile, isPending } = useMutation<T, Error, V>({
    mutationKey: ['update-user-profile'],
    mutationFn: async (payload: V) => {
      const res = await makeAuthenticatedRequest(`/talent/settings/profile`, {
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res?.data as T;
    },
    onSuccess: () => {
      toast.success('Profile updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['get-user-profile'] });
    },

    onError: (error) => {
      toast.error(error.message || 'Failed to update profile.');
    },
  });
  return { updateProfile, isPending };
};
