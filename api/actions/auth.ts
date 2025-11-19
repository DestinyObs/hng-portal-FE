'use server';

import { LoginType, RegisterType, UserData } from '@/lib/types';
import { makePublicRequest } from '../config.server';
import { cookies } from 'next/headers';

export const login = async (formData: LoginType) => {
  const res = await makePublicRequest<UserData, LoginType>('/auth/login', {
    method: 'POST',
    body: formData,
  });

  (await cookies()).set('token', res.data?.token as string, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  });

  return res;
};

export const register = async (formData: RegisterType) => {
  const res = await makePublicRequest<UserData, RegisterType>(
    '/auth/register',
    {
      method: 'POST',
      body: formData,
    },
  );
  return res;
};