'use server';

import { LoginType, RegisterType, UserData } from '@/lib/types';
import {
  makeAuthenticatedRequest,
  makePublicRequest,
  makeOtpRequest,
} from '../config.server';
import { cookies } from 'next/headers';
import { SuccessResponse } from '@/app/(auth)/components/types';

export const login = async (formData: LoginType) => {
  const res = await makePublicRequest<UserData, LoginType>('/auth/login', {
    method: 'POST',
    body: formData,
  });

  if (res.success) {
    (await cookies()).set('token', res.data?.token as string, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    console.log(res);
  }

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

  if (res.success) {
    (await cookies()).set('token', res.data?.token as string, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
  }

  return res;
};

export const verifyOtp = async (formData: { otp: string }) => {
  const res = await makeOtpRequest<SuccessResponse, { otp: number }>(
    '/otp/verify-otp',
    {
      method: 'POST',
      body: { otp: parseInt(formData.otp, 10) },
    },
  );
  return res;
};

export const resendOtp = async () => {
  const res = await makeOtpRequest<SuccessResponse, null>('/otp/resend-otp', {
    method: 'POST',
  });
  return res;
};

export const forgotPassword = async (formData: { email: string }) => {
  const res = await makePublicRequest<SuccessResponse, { email: string }>(
    '/auth/forgot-password',
    {
      method: 'POST',
      body: formData,
    },
  );
  return res;
};

export const resetPassword = async (formData: {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}) => {
  const res = await makePublicRequest<SuccessResponse, typeof formData>(
    '/auth/reset-password',
    {
      method: 'POST',
      body: formData,
    },
  );
  return res;
};

export const logout = async () => {
  const res = await makeAuthenticatedRequest<SuccessResponse, null>(
    '/auth/logout',
    {
      method: 'POST',
    },
  );
  return res;
};
