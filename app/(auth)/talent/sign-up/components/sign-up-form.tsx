'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// FIX: Using absolute path to guarantee resolution
import {
  talentSignUpSchema,
  type TalentSignUpFormValues,
} from '@/app/(auth)/talent/sign-up/schema';

// Import Shadcn Components
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

// Import the team's Input component directly (default export)
import Input from '@/components/ui/input';

export function TalentSignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<TalentSignUpFormValues>({
    resolver: zodResolver(talentSignUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      acceptTerms: false,
    },
  });

  async function onSubmit(values: TalentSignUpFormValues) {
    setIsLoading(true);
    setError(null);

    // REMEMBER TO REMOVE CONSOLE.LOGS BEFORE PUSHING
    console.log('Talent Sign Up Form values:', values);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name Field */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                {/* FIX: Direct implementation of Input, passing all required props */}
                <Input
                  placeholder="Enter your full name"
                  aria-invalid={!!fieldState.error}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
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

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter password"
                  inputType="password" // Custom prop is needed here
                  aria-invalid={!!fieldState.error}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Accept Terms Checkbox */}
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

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          variant="default"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Create Account'
          )}
        </Button>

        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
      </form>
    </Form>
  );
}
