'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { talentSignUpSchema, type TalentSignUpFormValues } from '../schema';

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

export function TalentSignUpForm({ role }: { role: 'talent' | 'company' }) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<TalentSignUpFormValues>({
    resolver: zodResolver(talentSignUpSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      acceptTerms: false,
      phone_number: '',
      country: '',
    },
  });

  const { mutate: registerTalent, isPending: isLoading } = useMutation({
    mutationKey: ['sign-up-talent'],
    mutationFn: register,
    onSuccess: (data) => {
      console.log('Registration successful:', data);
      // We are not redirecting to profile setup as per user's new instructions
      // integrating the form here itself.
      router.push('/dashboard');
    },
    onError: (error: Error) => {
      setError(error.message || 'An error occurred during registration.');
    }
  });

  const onSubmit = (data: TalentSignUpFormValues) => {
    registerTalent({ ...data, role });
  };

  const handleNext = async () => {
    const isValid = await form.trigger([
      'first_name',
      'last_name',
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
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field, fieldState }) => (
                  <FormItem className="flex-1">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your first name"
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
                name="last_name"
                render={({ field, fieldState }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your last name"
                        aria-invalid={!!fieldState.error}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
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
              name="phone_number"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your phone number"
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
              name="country"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your country"
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
