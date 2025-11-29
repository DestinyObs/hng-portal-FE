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
import { useEffect } from 'react';
import Input from '@/components/ui/input';
import {
  CompanyResetPasswordFormValues,
  companyResetPasswordSchema,
} from '@/validations/reset-password';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/api/actions/auth';
import { toast } from 'sonner';
import { APIResponse, SuccessResponse } from '@/types/api-response';
import { useSearchParams, useRouter } from 'next/navigation';

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const token = searchParams.get('hash') || '';

  const form = useForm<CompanyResetPasswordFormValues & FieldValues>({
    resolver: zodResolver(companyResetPasswordSchema),
    defaultValues: {
      email: email,
      token: token,
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (!email || !token) {
      toast.error('Invalid password reset link.');
      router.push('/forgot-password');
    }
  }, [email, token, router]);

  const { mutate: a_resetPassword, isPending } = useMutation({
    mutationKey: ['reset-password'],
    mutationFn: resetPassword,
    onSuccess: (response: APIResponse<SuccessResponse | null>) => {
      if (response.success) {
        toast.success(
          response.message || 'Password has been reset successfully!',
        );
        router.push('/sign-in');
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

  async function onSubmit(data: CompanyResetPasswordFormValues) {
    a_resetPassword({
      email: data.email,
      token: data.token,
      password: data.password,
      password_confirmation: data.confirmPassword,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <input type="hidden" {...form.register('email')} />
        <input type="hidden" {...form.register('token')} />
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
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Re-enter password"
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
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Reset Password'
          )}
        </Button>
      </form>
    </Form>
  );
}
