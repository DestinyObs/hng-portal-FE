// app/auth/callback/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { google_signin } from '@/api/actions/auth';

export default function AuthCallback() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setData } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleBackendAuth = async () => {
      if (status === 'loading') return;

      if (status === 'unauthenticated') {
        setError('Authentication failed. Please try again.');
        setTimeout(() => router.push('/sign-in'), 2000);
        return;
      }

      if (status === 'authenticated' && session?.accessToken) {
        const role = searchParams.get('role');

        if (!role) {
          setError('Role not specified');
          setTimeout(() => router.push('/sign-in'), 2000);
          return;
        }

        try {
          const result = await google_signin(session.accessToken, role);

          if (result.success) {
            setData(result.data.user);
            router.push(
              result.data.user.roles[0].name === 'employer'
                ? '/company/dashboard'
                : '/talent/dashboard',
            );
          } else {
            setError(result.error || 'Backend authentication failed');
            setTimeout(() => router.push('/sign-in'), 2000);
          }
        } catch (err) {
          console.error('Auth callback error:', err);
          setError('An error occurred during authentication');
          setTimeout(() => router.push('/sign-in'), 2000);
        }
      }
    };

    handleBackendAuth();
  }, [session, status, searchParams, router, setData]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-2"> {error}</div>
          <div className="text-gray-600">Redirecting to sign-in...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-xl mb-4">Completing authentication...</div>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  );
}
