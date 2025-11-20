'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { SignInFormValues, signInSchema } from '../schema';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/actions/auth';
import { useRouter } from 'next/navigation';

export function CompanySignInForm() {
  const [error] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const { mutate: loginAccount, isPending: isLoading } = useMutation({
    mutationKey: ['sign-in'],
    mutationFn: login,
    onSuccess: (data) => {
      console.log('Registration successful:', data);
      router.push('/dashboard');
    },
  });

  const onSubmit: SubmitHandler<SignInFormValues> = async () => {
    loginAccount({
      email: form.getValues('email'),
      password: form.getValues('password'),
    });
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

        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
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
            href="/company/forgot-password"
            className="text-sm font-semibold text-primary-blue hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          variant="default"
          size={'lg'}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Sign In'
          )}
        </Button>

        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
      </form>
    </Form>
  );
}
