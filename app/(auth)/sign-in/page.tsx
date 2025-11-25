'use client';
import React from 'react';
import Link from 'next/link';

import { SignInForm } from './_components/sign-in-form'; // Updated import for _components
import { Button } from '@/components/ui/button';

import { HngLogo } from '@/public/assets/auth/icons/hng-logo';
import GoogleColoredIcon from '@/public/assets/auth/icons/google-colored-icon';
import { siginWithGoogle } from '@/api/actions/auth';

export default function SignInPage() {
  return (
    <div className="w-full max-w-md mx-auto py-12 px-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center">
          <HngLogo />
        </div>
        <h1 className="text-2xl font-bold mt-4">
          Welcome back to <span className="text-primary-blue">HNG Portal</span>
        </h1>
        <p className="text-muted-foreground">
          Access your dashboard to manage job posts and review applicants
        </p>
      </div>

      <SignInForm />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        size={'lg'}
        onClick={siginWithGoogle}
      >
        <GoogleColoredIcon className="mr-2 h-4 w-4" />
        Sign in with Google
      </Button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New User?{' '}
        <Link
          href="/sign-up"
          className="font-semibold text-primary-blue hover:underline"
        >
          Sign up
        </Link>
      </p>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        <Link
          href="/"
          className="font-semibold text-primary-blue hover:underline"
        >
          &larr; Back to Home
        </Link>
      </p>
    </div>
  );
}
