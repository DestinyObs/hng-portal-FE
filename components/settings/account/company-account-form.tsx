'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import Input from '@/components/ui/input';
import { useAuthStore } from '@/store/auth';
import { useGetCompanyProfile, useUpdateCompanyProfile } from '@/hooks/profile';
import { CompanyProfileData } from '@/types/profile';
import Loading from '@/app/loading';

const companyFormSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  email: z.email('Invalid email address'),
  website: z.url('Please enter a valid URL'),
});

type CompanyFormValues = z.infer<typeof companyFormSchema>;

export default function CompanyAccountForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOnboardingFlow = searchParams.get('flow') === 'onboarding';
  const { user } = useAuthStore();
  const { data: companyProfile, isLoading } =
    useGetCompanyProfile<CompanyProfileData>(true);
  const handleRedirectToAccount = () => {
    if (isOnboardingFlow) {
      router.push('/settings/profile?flow=onboarding');
    } else {
      router.push('/profile-view');
    }
  };
  const { updateCompanyProfile, isPending } = useUpdateCompanyProfile(
    handleRedirectToAccount,
  );
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companyName: '',
      email: '',
      website: '',
    },
  });

  useEffect(() => {
    if (companyProfile && user) {
      form.reset({
        companyName: companyProfile.name || '',
        email: user.email || '',
        website: companyProfile.website_url || '',
      });
    }
  }, [companyProfile, user, form]);

  function onSubmit(values: CompanyFormValues) {
    const formData = new FormData();
    formData.append('name', values.companyName);
    formData.append('website_url', values.website);

    updateCompanyProfile(formData);
  }

  function onCancel() {
    form.reset();
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full py-6 justify-center px-4 lg:px-0">
      <div className="w-full mb-4 space-y-1 text-center md:text-left">
        <h3 className="text-2xl font-bold text-[#232323]">
          Account Information
        </h3>
        <p className="font-normal text-base text-black-200">
          Manage your personal account details
        </p>
      </div>

      <Card className="flex-1 w-full bg-white border-[#E8E8E8] shadow-sm">
        <CardContent className="p-6 max-w-[1056px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-8 flex-col w-full"
            >
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm text-[#1A1A1A]">
                      Company Name <span className="text-[#FF3B30]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nexo Labs"
                        {...field}
                        className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-black-200"
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
                  <FormItem className="w-full">
                    <FormLabel className="text-sm text-[#1A1A1A]">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="job.doe@example.com"
                        disabled
                        {...field}
                        className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] text-black-200 transition placeholder:text-black-200"
                      />
                    </FormControl>
                    <FormDescription className="text-xs font-normal text-black-200">
                      Your email address can&apos;t be changed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm text-[#1A1A1A]">
                      Website <span className="text-[#FF3B30]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://"
                        {...field}
                        className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-black-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-row justify-end gap-4 pt-6 w-full mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isPending}
                  className="flex-1 sm:flex-none px-4 py-6 max-w-20 text-sm text-[#181818] border-[#E8E8E8] hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 sm:flex-none px-4 py-6 max-w-30 text-base font-medium text-[#00AEFF] bg-white hover:bg-blue-100 rounded-lg transition-all duration-300 ease-in disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
