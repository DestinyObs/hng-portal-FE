'use client';

import Link from 'next/link';
import { CompanySignUpForm } from './components/company-sign-up-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GoogleColoredIcon from '@/components/icons/google-colored-icon';
import { useState } from 'react';
import { TalentSignUpForm } from './components/talent-sign-up-form';
import { User, Briefcase, ArrowLeft } from 'lucide-react';

export default function SignUpPage() {
  const [selectedRole, setSelectedRole] = useState<'talent' | 'company' | null>(
    null,
  );

  return (
    <Card className="w-full max-w-md border-0 shadow-none py-0">
      {!selectedRole ? (
        <>
          <CardHeader className="text-center px-0">
            <CardTitle className="text-h4 font-bold">
              Join as a Talent or Company
            </CardTitle>
            <CardDescription className="text-subtitle">
              Select your role to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 space-y-4">
            {/* Talent Selection Card */}
            <Card
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setSelectedRole('talent')}
            >
              <CardContent className="p-6 flex items-center space-x-4">
                <div className="p-3 bg-primary-blue/10 rounded-full">
                  <User className="text-primary-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">I am a Talent</h3>
                  <p className="text-sm text-muted-foreground">
                    Looking to find work and get hired.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Company Selection Card */}
            <Card
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setSelectedRole('company')}
            >
              <CardContent className="p-6 flex items-center space-x-4">
                <div className="p-3 bg-primary-blue/10 rounded-full">
                  <Briefcase className="text-primary-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">I am a Company</h3>
                  <p className="text-sm text-muted-foreground">
                    Looking to post jobs and hire talent.
                  </p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader className="text-center px-0 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2"
              onClick={() => setSelectedRole(null)}
            >
              <ArrowLeft />
            </Button>
            <CardTitle className="text-h4 font-bold">
              Profile Setup - {selectedRole === 'talent' ? 'Talent' : 'Company'}
            </CardTitle>
            <CardDescription className="text-subtitle">
              Join thousands of users already on our platform
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            {selectedRole === 'talent' && <TalentSignUpForm role="talent" />}
            {selectedRole === 'company' && <CompanySignUpForm role="company" />}

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
        </>
      )}
    </Card>
  );
}
