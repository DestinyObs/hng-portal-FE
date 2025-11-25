'use client';

import Link from 'next/link';
import { CompanySignUpForm } from '../_components/(company)/company-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GoogleColoredIcon from '@/public/assets/auth/icons/google-colored-icon';
import { TalentSignUpForm } from '../_components/(talent)/talent-form';
import { ArrowLeft } from 'lucide-react';
import { HngLogo } from '@/public/assets/auth/icons/hng-logo';
import { notFound, useParams } from 'next/navigation';
import { useState } from 'react';
import { signIn } from '@/auth';

export default function SignUpRolePage() {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const role = params.role as string;

  if (role !== 'talent' && role !== 'company') {
    notFound();
  }

  const handleGoogleSignIn = async () => {
    if (!role) {
      alert('Please select a role');
      return;
    }

    setIsLoading(true);

    try {
      await signIn('google', {
        callbackUrl: `/auth/callback?role=${role}`,
      });
    } catch (error) {
      console.error('Sign-in error:', error);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-0 shadow-none py-0">
      <CardHeader className="text-center px-0 relative">
        <div className="flex items-center justify-start pb-4">
          <Link href="/sign-up" passHref>
            <Button variant="ghost" size="sm" className="space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Role Select</span>
            </Button>
          </Link>
        </div>
        <div className="flex items-center mb-4">
          <div className="flex flex-grow justify-center">
            <HngLogo />
          </div>
        </div>
        <CardTitle className="text-h4 font-bold">
          Profile Setup: {role === 'talent' ? 'Talent' : 'Company'}
        </CardTitle>
        <CardDescription className="text-subtitle">
          Join thousands of users already on our platform
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 mx-auto max-w-md">
        {role === 'talent' && <TalentSignUpForm role="talent" />}
        {role === 'company' && <CompanySignUpForm role="company" />}

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
          className="w-full border-gray-100/30 text-black"
          size={'lg'}
          onClick={handleGoogleSignIn}
        >
          <GoogleColoredIcon className="mr-2 h-4 w-4" />
          {isLoading ? 'Signing in...' : 'Sign up with Google'}
        </Button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/sign-in"
            className="font-semibold text-primary-blue hover:underline"
          >
            Sign in
          </Link>
        </p>
        <Link
          href="/"
          className="mt-4 text-center text-sm font-semibold text-primary-blue hover:underline flex items-center justify-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </CardContent>
    </Card>
  );
}
