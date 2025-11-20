'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companySignUpSchema, type CompanySignUpFormValues } from '../schema';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

import Input from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/api/actions/auth';
import { useRouter } from 'next/navigation';

export function CompanySignUpForm({ role }: { role: 'talent' | 'company' }) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
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

  const { mutate: registerCompany, isPending: isLoading } = useMutation({
    mutationKey: ['sign-up-company'],
    mutationFn: register,
    onSuccess: (data) => {
      console.log('Registration successful:', data);
      router.push('/dashboard');
    },
    onError: (error: Error) => {
      setError(error.message || 'An error occurred during registration.');
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
        {step === 1 && (
          <>
            <FormField
              control={form.control}
              name="company_name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your company name"
                      aria-invalid={!!fieldState.error}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Company Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your company email"
                      type="email"
                      aria-invalid={!!fieldState.error}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter password"
                      inputType="password"
                      aria-invalid={!!fieldState.error}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm password"
                      inputType="password"
                      aria-invalid={!!fieldState.error}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Accept Terms and{' '}
                      <Link
                        href="/terms"
                        className="text-primary-blue cursor-pointer hover:underline"
                      >
                        Conditions
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </>
        )}
        
        {step === 2 && (
          <>
            <FormField
              control={form.control}
              name="company_website"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Company Website</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your company's website"
                      aria-invalid={!!fieldState.error}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="industry"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your company's industry"
                      aria-invalid={!!fieldState.error}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div className="flex items-center gap-4">
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
            disabled={isLoading}
            variant="default"
            size={'lg'}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : step === 1 ? (
              'Continue'
            ) : (
              'Create Account'
            )}
          </Button>
        </div>

        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
      </form>
    </Form>
  );
}
