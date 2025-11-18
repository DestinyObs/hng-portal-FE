import React from 'react';
import Link from 'next/link';
import { TalentSignInForm } from './components/sign-in-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Chrome } from 'lucide-react';

export default function TalentSignInPage() {
  return (
    <Card className="w-full max-w-md border-0 shadow-none py-0">
      <CardHeader className="text-center px-0">
        <CardTitle className="text-h2 font-bold">Welcome back!</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <TalentSignInForm />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <Button variant="outline" className="w-full">
          <Chrome className="mr-2 h-4 w-4" />
          Sign in with Google
        </Button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link
            href="/talent/sign-up"
            className="font-semibold text-primary-blue hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
