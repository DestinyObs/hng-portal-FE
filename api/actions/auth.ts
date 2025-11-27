'use server';

import { LoginType, RegisterType, UserData } from '@/lib/types';
import {
  makeAuthenticatedRequest,
  makePublicRequest,
  makeOtpRequest,
} from '../config.server';
import { cookies } from 'next/headers';
import { signIn } from '@/auth';
import { ChangePasswordFormValues } from '@/validations/change-password';

export const siginWithGoogle = async () => {
  return await signIn('google', { redirectTo: '/dashboard' });
};
import { SuccessResponse } from '@/types/api-response';
import { GoogleAuthRequest } from '@/types/auth';

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

    (await cookies()).set('user', JSON.stringify(res.data.user), {
      httpOnly: false,
      sameSite: 'strict',
      path: '/',
    });
  }

  return res;
};

export async function google_signin(formData: GoogleAuthRequest) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/google-auth`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    );

    if (response.ok) {
      const data = await response.json();
      (await cookies()).set('token', data?.data?.token as string, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
      });

      (await cookies()).set('user', JSON.stringify(data?.data?.user), {
        httpOnly: false,
        sameSite: 'strict',
        path: '/',
      });

      return data;
    }

    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Authentication failed');
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Authentication failed',
    };
  }
}

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

export const verifyOtp = async (formData: { otp: number }) => {
  const res = await makeOtpRequest<UserData, { otp: number }>(
    '/otp/verify-otp',
    {
      method: 'POST',
      body: { otp: formData.otp },
    },
  );

  if (res.success && res.data?.token) {
    (await cookies()).set('token', res.data.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
  }

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

export const changePassword = async (data: ChangePasswordFormValues) => {
  return await makeAuthenticatedRequest<
    SuccessResponse,
    ChangePasswordFormValues
  >('/talent/profile/change-password', {
    method: 'PUT',
    body: data,
  });
};

export const requestOtpForUnauthenticatedUser = async (formData: {
  email: string;
}) => {
  return await makePublicRequest<SuccessResponse, { email: string }>(
    '/otp/resend-otp',
    {
      method: 'POST',
      body: formData,
    },
  );
};

export const logout = async () => {
  const res = await makeAuthenticatedRequest<SuccessResponse, null>(
    '/auth/logout',
    {
      method: 'POST',
    },
  );
  if (res.success) {
    (await cookies()).delete('user');
    (await cookies()).delete('token');
  }
  return res;
};
