'use server';

import { cookies } from 'next/headers';
import { User } from './types';

export async function getServerCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const user = cookieStore.get('user')?.value;

  let parsedUser = null;
  if (user) {
    try {
      parsedUser = JSON.parse(user);
    } catch (error) {
      // If JSON parsing fails (corrupted cookie), log and return null
      // This prevents unhandled errors in server components
      console.error('Failed to parse user cookie:', error);
      parsedUser = null;
    }
  }

  return { token, user: parsedUser };
}

export const setToken = async (token: string) =>
  (await cookies()).set('token', token as string, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  });

export const setUser = async (user: User) =>
  (await cookies()).set('user', JSON.stringify(user), {
    httpOnly: false,
    sameSite: 'strict',
    path: '/',
  });
