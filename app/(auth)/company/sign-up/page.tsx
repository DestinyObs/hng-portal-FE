import React from 'react';
import Link from 'next/link';
import { CompanySignUpForm } from './components/sign-up-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Chrome } from 'lucide-react';

export function generateMetadata() {
  return {
    title: "Sign up | HNG Portal",
  };
}


export default function CompanySignUpPage() {
  return (
    <Card className="w-full max-w-md border-0 shadow-none py-0">
      <CardHeader className="text-center px-0">
        <CardTitle className="text-h2 font-bold">
          Create Company Account
        </CardTitle>
        <CardDescription className="text-subtitle">
          Join thousands of users already on our platform
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <CompanySignUpForm />

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
          Sign up with Google
        </Button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/company/sign-in"
            className="font-semibold text-primary-blue hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
