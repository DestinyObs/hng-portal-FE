'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation'; // Import useSearchParams
import { useMutation } from '@tanstack/react-query';
import { verifyOtp, resendOtp } from '@/api/actions/auth';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { APIResponse } from '@/api/config.server';
import {
  verifyEmailSchema,
  VerifyEmailFormValues,
} from '@/validations/verify-email'; // New import for schema
import { SuccessResponse } from '@/types/api-response';
import { UserData } from '@/lib/types';

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Initialize useSearchParams
  const [timeLeft, setTimeLeft] = useState(180);
  const [canResendOTP, setCanResendOTP] = useState(false);
  const { email: storedEmail, hydrated, setEmail, setData } = useAuthStore();

  // Get email from query parameter, fallback to store
  const emailToDisplay = searchParams.get('email') || storedEmail;

  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { pin: '' },
  });

  // Update store email if it came from query params and store is stale
  useEffect(() => {
    if (
      searchParams.get('email') &&
      searchParams.get('email') !== storedEmail
    ) {
      setEmail(searchParams.get('email') as string);
    }
  }, [searchParams, storedEmail, setEmail]);

  const { mutate: a_verifyOtp, isPending: isVerifying } = useMutation({
    mutationKey: ['verify-otp'],
    mutationFn: verifyOtp,
    onSuccess: (response: APIResponse<UserData | null>) => {
      if (response.success && response.data?.user) {
        toast.success('Email Verification successful! Redirecting...');
        // Set the user data in the store with the fresh data from the response
        setData(response.data.user);

        // Infer role and redirect using the fresh user data
        let redirectTo = '/sign-in'; // Default to sign-in as a fallback
        if (response.data.user.current_role === 'talent') {
          redirectTo = '/onboarding/talent';
        } else {
          redirectTo = '/onboarding/company';
        }

        router.push(redirectTo);
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

  const { mutate: a_resendOtp, isPending: isResending } = useMutation({
    mutationKey: ['resend-otp'],
    mutationFn: resendOtp,
    onSuccess: (response: APIResponse<SuccessResponse | null>) => {
      if (response.success) {
        toast.success('Code resent to your email');
        setCanResendOTP(false);
        setTimeLeft(180);
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

  useEffect(() => {
    if (canResendOTP || timeLeft <= 0) {
      setCanResendOTP(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, canResendOTP]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const onSubmit = (data: VerifyEmailFormValues) => {
    a_verifyOtp({ otp: parseInt(data.pin, 10) });
  };

  const handleResend = () => {
    a_resendOtp();
  };

  const otpSlotClasses = `
    w-[40px] h-[40px] md:w-[80px] md:h-[80px]
    rounded-xl border-2 text-center text-5xl text-[#969696] font-medium data-[active=true]:border-[#1A1A1A] ring-0 ring-offset-0 first:rounded-xl last:rounded-xl first:border-2 last:border-2
  `;

  return (
    <div className="flex flex-col items-center gap-7">
      <Image
        src="/images/hng-logo.png"
        alt="HNG Connect"
        width={180}
        height={40}
      />

      <div className="text-center">
        <h1 className="md:hidden text-[#1A1A1A] text-[32px] font-bold mb-2">
          Verify your Email
        </h1>
        <h1 className="hidden md:block text-[#1A1A1A] text-[40px] font-bold mb-2">
          Verify Email
        </h1>

        <p className="text-[#969696] font-medium text-sm md:text-lg">
          We sent a code to{' '}
          <span className="md:font-bold md:text-[#1A1A1A]">
            {emailToDisplay || (hydrated ? 'your email' : 'your email')}
          </span>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-16">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={(value) => {
                      if (/^[0-9]*$/.test(value)) {
                        field.onChange(value);
                      }
                    }}
                    className="gap-2"
                  >
                    <InputOTPGroup className="gap-2">
                      {[...Array(6).keys()].map((i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className={`${otpSlotClasses} border-[#E8E8E8]`}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
                <FormDescription className="text-[#969696] text-sm mt-2">
                  {!canResendOTP ? (
                    <>Resend code in {formatTime(timeLeft)}</>
                  ) : (
                    <>
                      Didn’t get a code?{' '}
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={isResending}
                        className="text-primary-blue hover:text-blue-300 font-semibold underline cursor-pointer disabled:opacity-50"
                      >
                        {isResending ? 'Sending...' : 'Click to resend'}
                      </button>
                    </>
                  )}
                </FormDescription>
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button
              type="submit"
              // eslint-disable-next-line react-hooks/incompatible-library
              disabled={form.watch('pin').length < 6 || isVerifying}
              className="w-full md:max-w-[342px] py-6 rounded-sm bg-primary-blue text-white font-medium text-lg disabled:bg-primary-blue-light"
            >
              {isVerifying ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VerifyEmailPage;
