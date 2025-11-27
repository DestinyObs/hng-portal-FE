'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { google_signin } from '@/api/actions/auth';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Role } from '@/types/auth';
import Link from 'next/link';

export default function AuthCallback() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setData } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const onSelectRole = (role: Role) => {
    const hasRoleParam = searchParams.has('role');

    if (hasRoleParam) {
      router.replace(`${pathname}?${createQueryString('role', role)}`);
    } else {
      router.push(`${pathname}?${createQueryString('role', role)}`);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ['google_auth'],
    mutationFn: google_signin,
    onSuccess: (data) => {
      if (data.success) {
        setData(data.data.user);
        router.push(
          data.data.user.current_role === 'employer' ||
            data.data.user.current_role === 'company'
            ? '/company/dashboard'
            : '/talent/dashboard',
        );
      } else {
        setError(data.error);
      }
    },
  });

  useEffect(() => {
    const handleBackendAuth = async () => {
      if (status === 'loading') return;

      if (status === 'unauthenticated') {
        setError('Authentication failed. Please try again.');
        return;
      }

      if (status === 'authenticated' && session?.accessToken) {
        const role = searchParams.get('role');

        mutate({ google_token: session.accessToken, role: role as string });
      }
    };

    handleBackendAuth();
  }, [status, searchParams]);

  if (error) {
    if (error === 'Role is required for new user signup.') {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-blue-600 text-2xl mb-2">
              Hi {session?.user.name?.split(' ')[0]}, this is your first time
              here
            </div>
            <div className="flex flex-col gap-4 w-full">
              <p className="text-xl mt-3">
                {isPending ? 'Signing Up...' : 'Sign Up as:'}
              </p>
              <div className="flex gap-2 justify-center w-full">
                <Button
                  disabled={isPending}
                  className="w-1/2"
                  onClick={() => onSelectRole('talent')}
                >
                  Talent
                </Button>
                <Button
                  className="w-1/2"
                  disabled={isPending}
                  onClick={() => onSelectRole('company')}
                  variant={'outlineGray'}
                >
                  Company
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-2"> {error}</div>
            <div className="text-gray-600">Please try signing in again</div>
            <div className="w-full flex justify-center mt-8">
              <Link href={'/sign-in'} className="w-fit">
                <Button className="w-fit">Back to sign in</Button>
              </Link>
            </div>
          </div>
        </div>
      );
    }
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
