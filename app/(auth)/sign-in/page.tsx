'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { SignInForm } from './components/sign-in-form';
import { Button } from '@/components/ui/button';
import GoogleColoredIcon from '@/components/icons/google-colored-icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Role = 'talent' | 'company';

export default function SignInPage() {
  const [role, setRole] = useState<Role>('talent');

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center">
          <Image src="/images/hng-logo.png" alt="HNG Portal" width={180} height={40} />
        </div>
        {role === 'talent' ? (
          <>
            <h1 className="text-2xl font-bold mt-4">Sign in as a Talent</h1>
            <p className="text-muted-foreground">Access your dashboard to find job opportunities.</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mt-4">Sign in as a Company</h1>
            <p className="text-muted-foreground">
              Access your dashboard to manage job posts and review applicants
            </p>
          </>
        )}
      </div>

      <Tabs value={role} onValueChange={(value) => setRole(value as 'talent' | 'company')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="talent">Talent</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
        </TabsList>
        <TabsContent value="talent">
          <SignInForm role="talent" />
        </TabsContent>
        <TabsContent value="company">
          <SignInForm role="company" />
        </TabsContent>
      </Tabs>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <Button variant="outline" className="w-full" size={'lg'}>
        <GoogleColoredIcon className="mr-2 h-4 w-4" />
        Sign in with Google
      </Button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New User?{' '}
        <Link href="/sign-up" className="font-semibold text-primary-blue hover:underline">
          Sign up
        </Link>
      </p>
      <p className="mt-4 text-center text-sm">
        <Link href="/" className="font-semibold text-primary-blue hover:underline">
          &larr; Back to Home
        </Link>
      </p>
    </div>
  );
}