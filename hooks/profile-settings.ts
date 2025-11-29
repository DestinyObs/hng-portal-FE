import { useAuthStore } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";
import { makeAuthenticatedRequest } from "@/api/config.server";
import { UserProfile } from "@/types/profile-settings";

export const useGetProfileData = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      const response = await makeAuthenticatedRequest<UserProfile>(
        '/talent/settings/profile',
        {
          method: 'GET',
        },
      );

      return response.data;
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });
};
