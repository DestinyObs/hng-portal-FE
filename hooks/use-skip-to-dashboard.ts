'use client';

import { set_user_in_storage } from '@/api/actions/talent-onboarding';
import { User } from '@/lib/types';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';

export const useSkipToDashboard = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  const skipToDashboard = (redirectTo: string) => {
    try {
      set_user_in_storage(user as User);
      router.push(redirectTo);
    } catch (error) {
      console.error(error);
    }
  };

  return { skipToDashboard };
};
