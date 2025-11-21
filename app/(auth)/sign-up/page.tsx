'use client';

import Link from 'next/link';
import Image from 'next/image';
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import GoogleColoredIcon from '@/components/icons/google-colored-icon';
import { useState } from 'react';
import { TalentSignUpForm } from './components/talent-sign-up-form';
import { User, Briefcase, ArrowLeft } from 'lucide-react';

export default function SignUpPage() {
  const [step, setStep] = useState<'selection' | 'form'>('selection');
  const [chosenRole, setChosenRole] = useState<'talent' | 'company' | null>(null);

  const handleContinue = () => {
    if (chosenRole) {
      setStep('form');
    }
  };
  
  const handleBackToSelection = () => {
    setStep('selection');
    // We might want to reset the chosen role as well
    // setChosenRole(null); 
  };


  return (
    <Card className="w-full max-w-2xl border-0 shadow-none py-0">
      {step === 'selection' ? (
        <>
          <CardHeader className="text-center px-0">
            <div className="flex items-center justify-center mb-4">
              <Image src="/images/hng-logo.png" alt="HNG Portal" width={180} height={40} />
            </div>
            <CardTitle className="text-h4 font-bold">
              Select Account
            </CardTitle>
            <CardDescription className="text-subtitle">
              Choose your account type to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 space-y-4">
            <RadioGroup value={chosenRole ?? ''} onValueChange={(value) => setChosenRole(value as 'talent' | 'company')}>
              <div className="flex flex-col lg:flex-row lg:gap-4 space-y-4 lg:space-y-0">
                <Label htmlFor="talent-role" className="lg:flex-1">
                  <Card className={`cursor-pointer hover:bg-gray-50 transition-colors h-full ${chosenRole === 'talent' ? 'border-primary-blue' : ''}`}>
                    <CardContent className="p-6 flex items-center gap-3">
                      <div className="p-3 bg-primary-blue/10 rounded-full">
                        <User className="text-primary-blue" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-lg">Talent</h3>
                        <p className="text-sm text-muted-foreground">
                          For interns and Job seekers.
                        </p>
                      </div>
                      <RadioGroupItem value="talent" id="talent-role" />
                    </CardContent>
                  </Card>
                </Label>
                <Label htmlFor="company-role" className="lg:flex-1">
                  <Card className={`cursor-pointer hover:bg-gray-50 transition-colors h-full ${chosenRole === 'company' ? 'border-primary-blue' : ''}`}>
                     <CardContent className="p-6 flex items-center gap-3">
                      <div className="p-3 bg-primary-blue/10 rounded-full">
                        <Briefcase className="text-primary-blue" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-lg">Company or Organisation</h3>
                        <p className="text-sm text-muted-foreground">
                          For employers hiring talent.
                        </p>
                      </div>
                      <RadioGroupItem value="company" id="company-role" />
                    </CardContent>
                  </Card>
                </Label>
              </div>
            </RadioGroup>
            <Button className="w-full mt-6" size="lg" disabled={!chosenRole} onClick={handleContinue}>Continue</Button>
            <p className="mt-4 text-center text-sm">
              <Link href="/" className="font-semibold text-primary-blue hover:underline flex items-center justify-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </p>
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
                <Image src="/images/hng-logo.png" alt="HNG Portal" width={180} height={40} />
              </div>
            </div>
            <CardTitle className="text-h4 font-bold">
              Profile Setup: {chosenRole === 'talent' ? 'Talent' : 'Company'}
            </CardTitle>
            <CardDescription className="text-subtitle">
              Join thousands of users already on our platform
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            {chosenRole === 'talent' && <TalentSignUpForm role="talent" />}
            {chosenRole === 'company' && <CompanySignUpForm role="company" />}

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
