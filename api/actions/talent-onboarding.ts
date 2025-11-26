'use server';

import { TalentOnboardingResponse } from '@/types/onboarding-talent';
import { makeAuthenticatedRequest } from '../config.server';
import { cookies } from 'next/headers';
import { User } from '@/lib/types';

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
  const res = await makeAuthenticatedRequest<
    TalentOnboardingResponse,
    FormData
  >('/talent/onboarding', {
    method: 'POST',
    body: data,
  });
  if (res.success) {
    (await cookies()).set('user', JSON.stringify(res.data), {
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
