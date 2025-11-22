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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import GoogleColoredIcon from '@/components/icons/google-colored-icon';
import { useState } from 'react';
import { TalentSignUpForm } from './components/talent-sign-up-form';
import { ArrowLeft } from 'lucide-react';
import { HngLogo } from '../components/hng-logo';

export default function SignUpPage() {
  const [step, setStep] = useState<'selection' | 'form'>('selection');
  const [userType, setUserType] = useState<'talent' | 'company' | null>(null);

  const handleContinue = () => {
    if (userType) {
      setStep('form');
    }
  };

  const handleBackToSelection = () => {
    setStep('selection');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-0 shadow-none py-0">
      {step === 'selection' ? (
        <>
          <CardHeader className="text-center px-0">
            <div className="flex items-center justify-center mb-4">
              <HngLogo />
            </div>
            <CardTitle className="text-h4 font-bold">Select Account</CardTitle>
            <CardDescription className="text-subtitle">
              Choose your account type to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 space-y-4">
            <RadioGroup
              value={userType ?? ''}
              onValueChange={(value) =>
                setUserType(value as 'talent' | 'company')
              }
            >
              <div className="flex flex-col lg:flex-row lg:gap-4 space-y-4 lg:space-y-0">
                <Label htmlFor="talent-role" className="lg:flex-1">
                  <Card
                    className={`w-full cursor-pointer hover:bg-primary-50 transition-colors h-full ${userType === 'talent' ? 'border-primary-blue bg-primary-blue/5' : ''}`}
                  >
                    <CardContent className=" flex items-center justify-between">
                      <div className="flex-grow">
                        <h3
                          className={`font-bold text-lg ${userType === 'talent' ? 'text-primary-blue' : ''}`}
                        >
                          Talent
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          For interns and Job seekers.
                        </p>
                      </div>
                      <RadioGroupItem
                        value="talent"
                        id="talent-role"
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 ${userType === 'talent' ? 'border-primary-blue' : 'border-gray-300'} flex items-center justify-center`}
                      >
                        {userType === 'talent' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary-blue"></div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Label>
                <Label htmlFor="company-role" className="lg:flex-1">
                  <Card
                    className={`w-full cursor-pointer hover:bg-primary-50 transition-colors h-full ${userType === 'company' ? 'border-primary-blue bg-primary-blue/5' : ''}`}
                  >
                    <CardContent className=" flex items-center justify-between">
                      <div className="flex-grow">
                        <h3
                          className={`font-bold text-lg ${userType === 'company' ? 'text-primary-blue' : ''}`}
                        >
                          Company or Organisation
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          For employers hiring talent.
                        </p>
                      </div>
                      <RadioGroupItem
                        value="company"
                        id="company-role"
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 ${userType === 'company' ? 'border-primary-blue' : 'border-gray-300'} flex items-center justify-center`}
                      >
                        {userType === 'company' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary-blue"></div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Label>
              </div>
            </RadioGroup>
            <Button
              className="w-full mt-6 disabled:bg-primary-100"
              size="lg"
              disabled={!userType}
              onClick={handleContinue}
            >
              Continue
            </Button>
            <Link
              href="/"
              className="mt-4 text-center text-sm font-semibold text-primary-blue hover:underline flex items-center justify-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader className="text-center px-0 relative">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2"
                onClick={handleBackToSelection}
              >
                <ArrowLeft />
              </Button>
              <div className="flex flex-grow justify-center">
                <HngLogo />
              </div>
            </div>
            <CardTitle className="text-h4 font-bold">
              Profile Setup: {userType === 'talent' ? 'Talent' : 'Company'}
            </CardTitle>
            <CardDescription className="text-subtitle">
              Join thousands of users already on our platform
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            {userType === 'talent' && <TalentSignUpForm role="talent" />}
            {userType === 'company' && <CompanySignUpForm role="company" />}

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
