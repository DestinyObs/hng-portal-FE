'use client';

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
import GoogleColoredIcon from '@/components/icons/google-colored-icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { TalentSignUpForm } from './components/talent-signup-form';

export default function CompanySignUpPage() {
  const [role, setRole] = useState<'talent' | 'company'>('talent');

  return (
    <Card className="w-full max-w-md border-0 shadow-none py-0">
      <CardHeader className="text-center px-0">
        <CardTitle className="text-h4 font-bold">
          Create Company Account
        </CardTitle>
        <CardDescription className="text-subtitle">
          Join thousands of users already on our platform
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Tabs
          value={role}
          onValueChange={(value) => setRole(value as 'talent' | 'company')}
        >
          <section className="w-full flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="talent">Talent</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
            </TabsList>
          </section>
          <TabsContent value="talent">
            <TalentSignUpForm role={role} />
          </TabsContent>

          <TabsContent value="company">
            <CompanySignUpForm role={role} />
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

        <Button
          variant="outline"
          className="w-full border-gray-100/30 text-black"
          size={'lg'}
        >
          <GoogleColoredIcon className="mr-2 h-4 w-4" />
          Sign up with Google
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
      </CardContent>
    </Card>
  );
}
