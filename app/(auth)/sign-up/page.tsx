'use client';

import Link from 'next/link';
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
import { useState, useEffect } from 'react'; // Import useEffect
import { ArrowLeft } from 'lucide-react';
import { HngLogo } from '@/public/assets/auth/icons/hng-logo';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth'; // Import useAuthStore

export default function SignUpPage() {
  const [userType, setUserType] = useState<'talent' | 'company' | null>(null);
  const router = useRouter();
  const clearEmail = useAuthStore((state) => state.clearEmail); // Get clearEmail action

  useEffect(() => {
    clearEmail(); // Clear email when component mounts
  }, [clearEmail]);

  const handleContinue = () => {
    if (userType) {
      router.push(`/sign-up/${userType}`);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-0 shadow-none py-0">
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
          onValueChange={(value) => setUserType(value as 'talent' | 'company')}
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
    </Card>
  );
}
