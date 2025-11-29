'use client';

import { Building2, User, X } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import Input from '../ui/input';
import { Toggle } from '../ui/toggle';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { waitlist } from '@/api/actions/waitlist';
import { toast } from 'sonner';
import { waitlistFormSchema } from '@/validations/squeeze-page';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import Image from 'next/image';
import { ModalProps } from '@/types/squeeze-page';
import clsx from 'clsx';

const WaitlistForm = ({ className }: { className?: string }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const form = useForm<z.infer<typeof waitlistFormSchema>>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'talent',
    },
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ['waitlist'],
    mutationFn: waitlist,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      if (data?.status === 422 || data?.response?.status === 422) {
        toast.error(
          data?.errors?.email?.[0] || 'You are already on the waitlist!',
        );
      } else if (
        data?.success === true ||
        data?.status === 200 ||
        data?.status === 201
      ) {
        form.reset();
        setShowSuccessModal(true);
      }
    },
    onError: () => {
      toast.error('Uh oh! Something went wrong. Please try again.');
    },
  });

  async function onSubmit(values: z.infer<typeof waitlistFormSchema>) {
    mutate({
      full_name: values.name,
      email: values.email,
      role: values.role,
    });
  }

  return (
    <div
      className={clsx(
        'bg-white shadow-lg rounded-lg p-6 md:p-8 w-full shrink-0 flex-1 mx-5 border border-gray-500/20',
        className,
      )}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 text-left w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
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
                      type="button" // Added to prevent submitting form
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
                      type="button" // Added to prevent submitting form
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
        We respect your privacy. No spam. Unsubscribe anytime.
      </p>
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
};

function Modal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        className="relative bg-white rounded-2xl shadow-2xl 
            w-full 
            max-w-[402px]      
            md:max-w-[634px]
            lg:max-w-[510px]
            p-6 md:p-12 text-center animate-in fade-in zoom-in duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-6 w-6 rounded-full bg-[#292D32] text-white flex items-center justify-center hover:bg-black/80 transition-colors p-0"
        >
          <X className="h-8 w-8" />
        </button>
        <div className="flex justify-center mb-6">
          {/* Fixed CSS Variable Syntax */}
          <div className="relative w-[106px] h-[106px] bg-(--color-primary-blue)/10 rounded-full flex items-center justify-center">
            <Image
              src="/images/Icon.png"
              alt="Success"
              width={106}
              height={106}
              className="object-contain"
            />
          </div>
        </div>
        <h2 className="text-h5 font-bold text-gray-20 mb-3 leading-tight">
          Congratulations you have successful joined our waitlist
        </h2>

        <p className="text-body-1 text-muted-foreground mb-8 leading-relaxed">
          We&apos;ll share your access link when we launch. Your data is safe
          with us.
        </p>
        <Button
          onClick={onClose}
          // Fixed CSS Variable Syntax
          className="w-full py-6 text-body-1 font-semibold bg-(--color-primary-blue) hover:bg-(--color-primary-blue)/90 text-white rounded-lg"
        >
          Thanks!
        </Button>
      </div>
    </div>
  );
}

export default WaitlistForm;
