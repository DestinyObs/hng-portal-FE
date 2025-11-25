'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  talentSignUpSchema,
  type TalentSignUpFormValues,
} from '@/validations/sign-up';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Input from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

import { useMutation } from '@tanstack/react-query';
import { register } from '@/api/actions/auth';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { APIResponse } from '@/api/config.server';
import { RegisterType, UserData } from '@/lib/types';

export function TalentSignUpForm({ role }: { role: 'talent' | 'company' }) {
  const router = useRouter();
  const setEmail = useAuthStore((state) => state.setEmail);

  const form = useForm<TalentSignUpFormValues>({
    resolver: zodResolver(talentSignUpSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      role: 'talent',
    },
  });

  const { mutate: registerTalent, isPending } = useMutation({
    mutationKey: ['sign-up-talent'],
    mutationFn: register,
    onSuccess: (
      response: APIResponse<UserData | null>,
      variables: RegisterType,
    ) => {
      if (response.success) {
        const userEmail = response.data?.user?.email || variables.email;
        if (userEmail) {
          setEmail(userEmail);
          toast.success(
            'Registration successful! Please check your email to verify your account.',
          );
          router.push(`/verify-email?email=${encodeURIComponent(userEmail)}`);
        } else {
          toast.error(
            'Registration succeeded, but could not retrieve your email. Please try signing in.',
          );
          router.push('/sign-in');
        }
      } else {
        let errorMessage = response.message || 'An unknown error occurred.';
        if (response.errors) {
          errorMessage = Object.values(response.errors).flat().join(' ');
        }
        toast.error(errorMessage);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'A network or unexpected error occurred.');
    },
  });

  const onSubmit = (data: TalentSignUpFormValues) => {
    registerTalent({
      ...data,
      password_confirmation: data.password,
    });
  };

  return (
    <div className="mx-auto max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="firstname"
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
              name="lastname"
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
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            variant="default"
            size={'lg'}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Create Account'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
