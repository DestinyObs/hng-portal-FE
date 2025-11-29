'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Input from '@/components/ui/input';
import { useGetProfileData } from '@/hooks/profile-settings';
import { updateUserProfile } from '@/api/actions/user-profile-settings';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.email('Invalid email address'),
});

export default function TalentAccountForm() {
  const { data } = useGetProfileData();
  const queryClient = useQueryClient();
  const { user, setData } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  useEffect(() => {
    if (data?.bio?.user) {
      form.reset({
        firstName: data.bio.user.firstname,
        lastName: data.bio.user.lastname,
        email: data.bio.user.email,
      });
    }
  }, [form, data]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const payload = {
        firstname: values.firstName,
        lastname: values.lastName,
      };

      const result = await updateUserProfile(payload);

      if (result.success) {
        await queryClient.invalidateQueries({
          queryKey: ['profile'],
        });

        if (user) {
          setData({
            ...user,
            firstname: values.firstName,
            lastname: values.lastName,
          });
        }
      } else {
        console.error('Error:', result.error);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function onCancel() {
    if (data?.bio?.user) {
      form.reset({
        firstName: data.bio.user.firstname,
        lastName: data.bio.user.lastname,
        email: data.bio.user.email,
      });
    }
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
              <div className="flex flex-col md:flex-row gap-6 w-full">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm text-[#1A1A1A]">
                        First Name <span className="text-[#FF3B30]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm text-[#1A1A1A]">
                        Last Name <span className="text-[#FF3B30]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          {...field}
                          className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-black-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                        placeholder="john.doe@example.com"
                        disabled
                        {...field}
                        className="mt-2 w-full p-3 rounded-lg border border-[#E7E8E9] focus:outline-none text-black-200  transition placeholder:text-black-200"
                      />
                    </FormControl>
                    <FormDescription className="text-xs font-normal text-black-200">
                      Your email address can&apos;t be changed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-row justify-end gap-4 pt-6 w-full mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none px-6 py-6 max-w-20 text-sm text-[#181818] border-[#E8E8E8] hover:bg-gray-50 rounded-2xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none px-6 py-6 max-w-30 text-base font-medium text-[#00AEFF] bg-white hover:bg-blue-100 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
