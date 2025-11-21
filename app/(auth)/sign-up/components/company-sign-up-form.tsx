'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companySignUpSchema, type CompanySignUpFormValues } from '../schema';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

import { useMutation } from '@tanstack/react-query';
import { register } from '@/api/actions/auth';
import { useRouter } from 'next/navigation';
import { HttpError } from '@/lib/fetch-utils';
import { CompanySignUpFormStep1 } from './company-sign-up-form-step1';
import { CompanySignUpFormStep2 } from './company-sign-up-form-step2';

interface BackendErrorResponse {
  message?: string;
  errors?: { [key: string]: string[] };
}

export function CompanySignUpForm({ role }: { role: 'talent' | 'company' }) {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const form = useForm<CompanySignUpFormValues>({
    resolver: zodResolver(companySignUpSchema),
    defaultValues: {
      company_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      acceptTerms: false,
      company_website: '',
      industry: '',
    },
  });

  const { mutate: registerCompany, isPending } = useMutation({
    mutationKey: ['sign-up-company'],
    mutationFn: register,
    onSuccess: () => {
      toast.success('Registration successful!');
      router.push('/dashboard');
    },
    onError: (error: HttpError<BackendErrorResponse>) => {
      let errorMessage = 'An unexpected error occurred.';
      if (error instanceof HttpError && error.responseBody) {
        if (error.responseBody.message) {
          errorMessage = error.responseBody.message;
        } else if (error.responseBody.errors) {
          errorMessage = Object.values(error.responseBody.errors).flat().join(', ');
        }
      }
      toast.error(errorMessage);
    }
  });

  const onSubmit = (data: CompanySignUpFormValues) => {
    registerCompany({ ...data, role });
  };
  
  const handleNext = async () => {
    const isValid = await form.trigger([
      'company_name',
      'email',
      'password',
      'password_confirmation',
      'acceptTerms',
    ]);
    if (isValid) {
      setStep(2);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && <CompanySignUpFormStep1 form={form} />}
        {step === 2 && <CompanySignUpFormStep2 form={form} />}

        <div className="flex flex-col space-y-4">
          {step === 2 && (
            <Button
              type="button"
              onClick={() => setStep(1)}
              className="w-full"
              variant="outline"
            >
              Back
            </Button>
          )}

          <Button
            type={step === 1 ? 'button' : 'submit'}
            onClick={step === 1 ? handleNext : undefined}
            className="w-full"
            disabled={isPending}
            variant="default"
            size={'lg'}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : step === 1 ? (
              'Continue'
            ) : (
              'Create Account'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
