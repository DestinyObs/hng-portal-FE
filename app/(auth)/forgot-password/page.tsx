import React from 'react';
import Link from 'next/link';
import { ForgotPasswordForm } from '../../talent/forgot-password/components/forgot-password-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CompanyForgotPasswordPage() {
  return (
    <Card className="w-full max-w-md border-0 shadow-none py-0">
      <CardHeader className="text-center px-0">
        <CardTitle className="text-h2 font-bold">Forgot password</CardTitle>
        <CardDescription className="text-subtitle">
          Input the email associated with your account
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ForgotPasswordForm />
      </CardContent>

      <p className="text-sm text-center mt-4">
        <Link
          href="/company/sign-in"
          className="text-primary-blue hover:underline"
        >
          &larr; Back to Sign In
        </Link>
      </p>
    </Card>
  );
}
