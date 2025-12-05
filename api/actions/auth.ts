'use server';

import { LoginType, RegisterType, UserData } from '@/lib/types';
import {
  makeAuthenticatedRequest,
  makePublicRequest,
  makeOtpRequest,
} from '../config.server';
import { cookies } from 'next/headers';
import { ChangePasswordFormValues } from '@/validations/change-password';

import { SuccessResponse } from '@/types/api-response';
import { GoogleAuthRequest } from '@/types/auth';
import { getEssentialUserData } from '@/lib/utils';

export const login = async (formData: LoginType) => {
  const res = await makePublicRequest<UserData, LoginType>('/auth/login', {
    method: 'POST',
    body: formData,
  });

  if (res.success) {
    const user = getEssentialUserData(res.data.user);
    (await cookies()).set('token', res.data?.token as string, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    (await cookies()).set('user', JSON.stringify(user), {
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
      const user = getEssentialUserData(data.data.user);
      (await cookies()).set('token', data?.data?.token as string, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
      });

      if (formData.isNewUser === false) {
        (await cookies()).set('user', JSON.stringify(user), {
          httpOnly: false,
          sameSite: 'strict',
          path: '/',
        });
      }

      return data;
    }

    const errorData = await response.json().catch(() => ({}));
    return {
      success: false,
      error: errorData.message || 'Authentication failed',
      status: response.status,
    };
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
  (await cookies()).set('token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  });

  (await cookies()).set('user', '', {
    httpOnly: false,
    sameSite: 'strict',
    path: '/',
  });

  await makeAuthenticatedRequest<SuccessResponse, null>('/auth/logout', {
    method: 'POST',
  });
  return Response.json({ success: true });
};
