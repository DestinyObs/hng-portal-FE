'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';

const subscribeSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export default function SubscribeSection() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof subscribeSchema>>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof subscribeSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      console.log(values);
      toast.success("You've subscribed to updates!");
      form.reset();
      setIsLoading(false);
    }, 1000);
  }

  return (
    <section className="relative bg-[#00AEFF] pt-20 pb-0 overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-[150px] md:w-[400px] pointer-events-none z-0">
        <Image
          src="/images/left-wavy.png"
          alt="pattern-left"
          fill
          className="object-contain object-top-left"
        />
      </div>
      <div className="absolute right-0 top-0 h-full w-[150px] md:w-[600px] pointer-events-none z-0">
        <Image
          src="/images/right-wavy.png"
          alt="pattern-right"
          fill
          className="object-contain object-top-right"
        />
      </div>

      <div className="container px-4 relative z-10 mx-auto">
        <div className="text-center max-w-{1200} mx-auto">
          <h2 className="text-h2 font-bold text-white">
            Subscribe to get updates
          </h2>
          <p className="text-white/90 text-sm md:text-lg leading-relaxed text-center text-balance">
            Join our list to get news on new opportunities, platform updates,
            and resources that support smarter hiring and meaningful career
            progress.
          </p>
        </div>

        <div className="container px-4 relative z-10 mx-auto m-2">
          <div className="max-w-lg mx-auto">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col sm:flex-row items-start gap-3 w-full"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormControl>
                        <Input
                          placeholder="Enter your Email"
                          className="bg-white border-none h-12 text-black placeholder:text-gray-400 rounded-lg w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-100 text-xs mt-1 text-left pl-1" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="shrink-0 bg-[#E5F6FF] hover:bg-white text-black h-12 px-4 sm:px-8 font-semibold rounded-lg transition-colors w-full sm:w-auto"
                >
                  {isLoading ? '...' : 'Subscribe'}
                </Button>
              </form>
            </Form>
            <p className="text-sm text-white/80 m-2 mt-4 text-center sm:text-left">
              By subscribing you agree to our{' '}
              <a
                href="privacy-policy"
                className="underline hover:text-white transition-colors"
              >
                privacy policy
              </a>
            </p>
          </div>
        </div>

        <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
          <Image
            src="/images/subscribe.png"
            alt="Dashboard Preview"
            width={1438.31}
            height={389.93}
            className="w-screen h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
