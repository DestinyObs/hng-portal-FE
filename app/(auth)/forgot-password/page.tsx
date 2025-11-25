import React from 'react';
import Link from 'next/link';
import { ForgotPasswordForm } from './_components/forgot-password-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HNG-Portal | Sign In',
  description:
    'Sign in to your account to access your dashboard and manage your business.',
};

export default function CompanyForgotPasswordPage() {
  return (
    <Card className="w-full max-w-md mx-auto border-0 shadow-none py-0">
      <CardHeader className="text-center px-0">
        <CardTitle className="text-h2 font-bold">Forgot password</CardTitle>
        <CardDescription className="text-subtitle">
          No worries, we’ll send you reset instructions.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ForgotPasswordForm />
      </CardContent>

      <p className="text-sm text-center mt-4">
        <Link href="/sign-in" className="text-primary-blue hover:underline">
          &larr; Back to Sign In
        </Link>
      </p>
    </Card>
  );
}
