'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
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

const FormSchema = z.object({
  pin: z
    .string()
    .min(6, 'Code must be 6 digits')
    .regex(/^[0-9]*$/, 'Only numbers allowed'),
});

const VerifyEmailPage = () => {
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(180);
  const [canResendOTP, setCanResendOTP] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { pin: '' },
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

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (data.pin !== '123456') {
      setError('Incorrect code');
      setCanResendOTP(true);
      setTimeLeft(0);
      return;
    }

    toast.success('Email verified successfully! Redirecting...');
    setError('');
    form.reset();
  };

  const handleResend = () => {
    toast.success('Code resent to your email');
    setError('');
    form.reset();
    setCanResendOTP(false);
    setTimeLeft(180);
  };

  const otp = [...Array(6).keys()];

  const otpSlotClasses = `
    w-[60px] h-[60px] md:w-[100px] md:h-[100px]
    rounded-xl border-2 text-center text-5xl text-[#969696] font-medium data-[active=true]:border-[#1A1A1A] ring-0 ring-offset-0 first:rounded-xl last:rounded-xl first:border-2 last:border-2
  `;

  return (
    <div className="flex flex-col items-center gap-7">
      <Image
        src="/images/hng-logo.png"
        alt="HNG Portal"
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
            johndoe@gmail.com
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
                        setError('');
                      }
                    }}
                    className="gap-2"
                  >
                    <InputOTPGroup className="gap-2">
                      {otp.map((i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className={`${otpSlotClasses} ${
                            error
                              ? 'border-[#E8362C] border-2'
                              : 'border-[#E8E8E8]'
                          }`}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>

                {error && (
                  <p className="text-[#E8362C] font-medium text-sm">{error}</p>
                )}

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
                        className="text-primary-blue hover:text-blue-300 font-semibold underline cursor-pointer"
                      >
                        Click to resend
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
              disabled={form.watch('pin').length < 6}
              className="w-full md:max-w-[342px] py-6 rounded-sm bg-primary-blue text-white font-medium text-lg disabled:bg-primary-blue-light"
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VerifyEmailPage;
