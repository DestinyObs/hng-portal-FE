
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

const forgotSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const resetSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type FormType = 'forgot' | 'reset';

export function PasswordPagesForm({ type }: { type: FormType }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isForgot = type === 'forgot';

  const form = useForm({
    resolver: zodResolver(isForgot ? forgotSchema : resetSchema),
    defaultValues: isForgot ? { email: '' } : { password: '', confirmPassword: '' },
  });

  async function onSubmit() {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
    router.push('/password-pages/success');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {isForgot ? (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    disabled={isLoading}
                    className="h-12 text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      disabled={isLoading}
                      className="h-12 text-base"
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
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Repeat Password"
                      type="password"
                      disabled={isLoading}
                      className="h-12 text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

 
        <Button
          type="submit"
          disabled={isLoading}
          className="data-[state=unchecked]:bg-[#60A5FA] 
                      data-[state=unchecked]:hover:bg-[#3B82F6] 
                      data-[state=unchecked]:text-white 
                      w-full h-14 font-medium text-base rounded-lg shadow-sm 
                      transform transition-all duration-200 ease-in-out 
                      hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {isForgot ? 'Sending...' : 'Resetting...'}
            </>
          ) : isForgot ? (
            'Reset Password'
          ) : (
            'Continue'
          )}
        </Button>
      </form>
    </Form>
  );
}