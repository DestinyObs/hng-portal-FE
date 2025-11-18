'use client';

import Image from 'next/image';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { User, Building2, ChevronLast } from 'lucide-react';
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
import { Toggle } from '@/components/ui/toggle';
import { toast } from 'sonner';

const waitlistFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Please enter your full name.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  role: z.enum(['talent', 'company'], {
    message: 'Please select if you&apos;re joining as a talent or company.',
  }),
});

type FeatureProps = {
  iconSrc: string;
  title: string;
  desc: string;
};

export default function WaitlistPage() {
  const [isLoading, setIsLoading] = useState(false);
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  const form = useForm<z.infer<typeof waitlistFormSchema>>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof waitlistFormSchema>) {
    setIsLoading(true);
    console.log(values);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/waitlist`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },

          body: JSON.stringify({
            full_name: values.name,
            email: values.email,
            role: values.role,
          }),
        },
      );

      if (!response.ok) throw new Error('Something went wrong');

      toast.success("You're on the list!");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error('Uh oh! Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-background min-h-screen">
      <header className="w-full mx-auto border-b bg-white max-w-[1440px]">
        <div className="flex justify-between items-center px-6 md:px-10 lg:px-[60px] py-6">
          <Image
            src="/images/hng-logo.png"
            alt="HNG Portal Logo"
            width={120}
            height={40}
          />
          {/* <Button className="hidden md:flex px-6 py-7 text-sm">
            Join the Waitlist
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button> */}
        </div>

        {/* Mobile Menu Dropdown */}
        {/* {isMenuOpen && (
          <div className="md:hidden border-t bg-white px-6 py-4">
            <Button className="w-full px-6 py-7 text-sm">
              Join the Waitlist
            </Button>
          </div>
        )} */}
      </header>

      <section className="relative pt-16 md:pt-24 lg:pt-[120px] pb-12 bg-[#F5F8FA] overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 max-w-[1440px] mx-auto">
          <div className="text-center lg:text-left px-6 lg:px-[60px]">
            <h1 className="text-3xl lg:text-4xl lg:text-h2 font-bold leading-tight mb-4">
              Join The HNG Portal
              <br />
              Waitlist Party Today.
            </h1>

            <p className="text-foreground max-w-lg mb-8 mx-auto lg:mx-0 text-body-1">
              HNG Portal connects HNG interns both past and present, and
              companies in one dynamic ecosystem turning job seeking into real
              opportunities.
            </p>

            <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-[500px] lg:max-w-[608px] mx-auto lg:mx-0 shrink-0 flex-1">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 text-left"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="your@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>I&apos;m joining as:</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-2 gap-4 w-full">
                            <Toggle
                              pressed={field.value === 'talent'}
                              onPressedChange={() => field.onChange('talent')}
                              className={`flex flex-row justify-center items-center h-auto py-3 px-6 ${
                                field.value === 'talent'
                                  ? 'border-[#00AEFF] bg-[#E5F7FF] text-[#00AEFF] data-[state=on]:bg-[#E5F7FF] data-[state=on]:text-[#00AEFF]'
                                  : 'border-[#E2E8F0] bg-white text-[#1A202C] hover:text-[#0088CC] hover:bg-[#E5F7FF] hover:border-[#00AEFF]'
                              }`}
                              variant="outline"
                            >
                              <User className="h-5 w-5 mr-2" />
                              Talent
                            </Toggle>

                            <Toggle
                              pressed={field.value === 'company'}
                              onPressedChange={() => field.onChange('company')}
                              className={`flex flex-row justify-center items-center h-auto py-3 px-6 ${
                                field.value === 'company'
                                  ? 'border-[#00AEFF] bg-[#E5F7FF] text-[#00AEFF] data-[state=on]:bg-[#E5F7FF] data-[state=on]:text-[#00AEFF]'
                                  : 'border-[#E2E8F0] bg-white text-[#1A202C] hover:text-[#0088CC] hover:bg-[#E5F7FF] hover:border-[#00AEFF]'
                              }`}
                              variant="outline"
                            >
                              <Building2 className="h-5 w-5 mr-2" />
                              Company
                            </Toggle>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-7 text-base"
                  >
                    {isLoading ? 'Submitting...' : 'Join the Waitlist'}
                  </Button>
                </form>
              </Form>

              <p className="text-center text-sm text-gray-500 mt-6">
                We&apos;ll notify you when we launch. Your data is safe with us.
              </p>
            </div>
          </div>

          <div
            className="flex h-auto md:h-[719px] py-12 md:py-[154px] px-6 md:pr-0 md:pl-[39px] justify-start min-[1200px]:justify-end items-center rounded-2xl md:rounded-l-2xl md:rounded-r-none md:w-[45%] mx-auto lg:mx-0 overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #00AEFF 0%, #E5F7FF 100%)',
            }}
          >
            <Image
              src="/images/individual-dashboard.png"
              alt="App Screenshot"
              width={518}
              height={574}
              className="rounded-xl md:rounded-l-xl md:rounded-r-none shadow-lg object-cover w-full md:w-auto max-w-[458px] xl:max-w-[518px]"
            />
          </div>
        </div>

        <div className="flex justify-center mt-4 md:mt-6">
          <div className="w-8 h-8 rounded-full flex items-center justify-center">
            <ChevronLast className="h-8 w-8 rotate-90 text-[#96DEFF]" />
          </div>
        </div>
      </section>

      <section className="h-auto py-8 md:h-[124px] flex items-center justify-center bg-white-50">
        <p className="text-sm md:text-base font-normal text-foreground px-6 text-center">
          Join <span className="text-(--color-primary-blue)">1,000+</span>{' '}
          professionals on the waitlist
        </p>
      </section>

      <section className="bg-[#F5F8FA] py-12 md:py-16 lg:py-20">
        <div className="text-center max-w-3xl mx-auto px-6 mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-h2 font-bold text-foreground mb-4">
            Why Join Early?
          </h2>
          <p className="text-gray-20 text-sm md:text-base lg:text-body-1">
            Get exclusive benefits and be part of building the future of
            professional networking.
          </p>
        </div>

        <div className="container mx-auto px-6 md:px-10 lg:px-[60px]">
          <div className="max-w-[969px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              <Feature
                iconSrc="/images/icon-early-access.png"
                title="Early Access"
                desc="Be the first to explore exclusive features before public launch."
              />
              <Feature
                iconSrc="/images/icon-onboarding.png"
                title="Priority Onboarding"
                desc="Skip the queue with personalized onboarding and support."
              />
              <Feature
                iconSrc="/images/icon-founding-member.png"
                title="Founding Member"
                desc="Exclusive perks and lifetime benefits as an early supporter."
              />
              <Feature
                iconSrc="/images/icon-shape-platform.png"
                title="Shape the Platform"
                desc="Your feedback will directly influence product development."
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-10 md:py-5 lg:py-[50px]">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground px-6 md:px-10 lg:px-[60px]">
          <Image
            src="/images/hng-logo.png"
            alt="HNG Portal Logo"
            width={120}
            height={40}
          />

          <div className="flex flex-row flex-wrap items-center gap-4 text-foreground justify-center md:justify-start">
            {' '}
            {/* <div className="flex gap-4">
              <a href="#">Privacy Policy</a>
              <a href="#">Contact</a>
            </div> */}
            <span>© 2025 HNG Portal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Feature({ iconSrc, title, desc }: FeatureProps) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#E5F7FF] flex items-center justify-center mx-auto mb-6 p-4">
        <Image src={iconSrc} alt={title} width={40} height={40} />
      </div>
      <h3 className="font-semibold text-xl text-foreground">{title}</h3>
      <p className="text-gray-20 mt-2 text-base">{desc}</p>
    </div>
  );
}
