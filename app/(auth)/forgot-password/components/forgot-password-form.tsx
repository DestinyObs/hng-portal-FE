'use client';

import { useForm, FieldValues } from 'react-hook-form';
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
import { Loader2 } from 'lucide-react';

import Input from '@/components/ui/input';
import {
  CompanyForgotPasswordFormValues,
  companyForgotPasswordSchema,
} from '../schema';
import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '@/api/actions/auth';
import { toast } from 'sonner';
import { SuccessResponse } from '@/app/(auth)/components/types';
import { APIResponse } from '@/api/config.server';

export function ForgotPasswordForm() {
  const form = useForm<CompanyForgotPasswordFormValues & FieldValues>({
    resolver: zodResolver(companyForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const { mutate: a_forgotPassword, isPending } = useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: forgotPassword,
    onSuccess: (response: APIResponse<SuccessResponse | null>) => {
      if (response.success) {
        toast.success(
          response.message || 'Password reset link sent successfully!',
        );
        form.reset();
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

  async function onSubmit(data: CompanyForgotPasswordFormValues) {
    a_forgotPassword({ email: data.email });
  }

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

        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
          variant="default"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Request Reset Link'
          )}
        </Button>
      </form>
    </Form>
  );
}
