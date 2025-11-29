'use server';

import { TalentOnboardingResponse } from '@/types/onboarding-talent';
import { makeAuthenticatedRequest } from '../config.server';
import { cookies } from 'next/headers';
import { User, UserData } from '@/lib/types';
import { getEssentialUserData } from '@/lib/utils';

export const talent_onboarding_api = async (data: FormData) => {
  return await makeAuthenticatedRequest<TalentOnboardingResponse, FormData>(
    '/talent/onboarding',
    {
      method: 'POST',
      body: data,
    },
  );
};

export const talent_portfolio_api = async (data: FormData) => {
  const res = await makeAuthenticatedRequest<UserData, FormData>(
    '/talent/onboarding',
    {
      method: 'POST',
      body: data,
    },
  );

  const user = getEssentialUserData(res.data.user);

  if (res.success) {
    (await cookies()).set('user', JSON.stringify(user), {
      httpOnly: false,
      sameSite: 'strict',
      path: '/',
    });
  }

  return res;
};

export const set_user_in_storage = async (data: User) => {
  (await cookies()).set('user', JSON.stringify(data));
};
