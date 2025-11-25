'use client';

import React from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

import Input from '@/components/ui/input';
import { SignInFormValues, signInSchema } from '@/validations/sign-in';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/actions/auth';
import { useRouter } from 'next/navigation';
import { APIResponse } from '@/api/config.server';
import { UserData } from '@/lib/types';
import { useAuthStore } from '@/store/auth';

export function SignInForm() {
  const router = useRouter();
  const { setData } = useAuthStore();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const { mutate: loginAccount, isPending } = useMutation({
    mutationKey: ['sign-in'],
    mutationFn: login,
    onSuccess: (response: APIResponse<UserData | null>) => {
      if (response.success && response.data?.user) {
        setData(response.data?.user);
        const userRole = response.data.user.roles[0].name;

        toast.success('Login successful!');
        router.push(
          userRole === 'employer'
            ? '/company/dashboard'
            : userRole === 'talent'
              ? '/talent/dashboard'
              : '',
        );
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

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    loginAccount({ email: data.email, password: data.password });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="you@email.com"
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
                  placeholder="Enter your password"
                  inputType="password"
                  aria-invalid={!!fieldState.error}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Remember me</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-primary-blue hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

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
            'Sign In'
          )}
        </Button>
      </form>
    </Form>
  );
}
