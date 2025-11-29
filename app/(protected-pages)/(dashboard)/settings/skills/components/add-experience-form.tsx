'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { addWorkExperience } from '@/api/actions/user-profile-settings';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth';

// Zod schema for validation
const workExperienceSchema = z
  .object({
    company_name: z.string().min(1, 'Company name is required'),
    start_date: z.string().min(1, 'Start date is required'),
    isCurrentlyWorking: z.boolean(),
    end_date: z.string().optional(),
    job_title: z.string().min(1, 'Job title is required'),
    description: z.string().min(1, 'Description is required'),
  })
  .refine(
    (data) => {
      if (!data.isCurrentlyWorking && !data.end_date) {
        return false;
      }
      return true;
    },
    {
      message: 'End date is required when not currently working',
      path: ['end_date'],
    },
  );

type WorkExperienceFormValues = z.infer<typeof workExperienceSchema>;

interface WorkExperienceFormProps {
  onSuccess?: () => void;
}

function formatDateToMMDDYYYY(dateString: string): string {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

export default function WorkExperienceForm({ onSuccess }: WorkExperienceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const form = useForm<WorkExperienceFormValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      company_name: '',
      start_date: '',
      isCurrentlyWorking: false,
      end_date: '',
      job_title: '',
      description: '',
    },
  });

  const isCurrentlyWorking = form.watch('isCurrentlyWorking');

  async function onSubmit(data: WorkExperienceFormValues) {
    setIsSubmitting(true);

    try {
      // Format dates from YYYY-MM-DD to MM/DD/YYYY
      const payload = {
        company_name: data.company_name,
        start_date: formatDateToMMDDYYYY(data.start_date),
        end_date: data.isCurrentlyWorking ? null : (data.end_date ? formatDateToMMDDYYYY(data.end_date) : null),
        job_title: data.job_title,
        description: data.description,
      };

      const result = await addWorkExperience(payload);

      if (result.success) {
        // Invalidate profile queries to refresh experiences
        await queryClient.invalidateQueries({
          queryKey: ['profile'],
        });

        // Reset form
        form.reset();
        if (onSuccess) {
          onSuccess();
        }
      } else {
        console.error('Error adding work experience:', result.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <div className="w-full mb-4 space-y-1">
        <h3 className="text-2xl font-bold text-[#232323]">
          Add Work Experience
        </h3>
        <p className="font-normal text-base text-black-200">
          Add your work history to showcase your experience
        </p>
      </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-4 flex-col w-full"
          >
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm text-[#1A1A1A]">
                    Company Name <span className="text-[#FF3B30]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Add your name in the body"
                      {...field}
                      className="mt-2 w-full p-3 h-10 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-black-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="job_title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm text-[#1A1A1A]">
                    Job Title <span className="text-[#FF3B30]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Add your name in the body"
                      {...field}
                      className="mt-2 w-full p-3 h-10 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-black-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col md:flex-row gap-6 w-full">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm text-[#1A1A1A]">
                      Start Date <span className="text-[#FF3B30]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="mt-2 w-full p-3 h-10 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm text-[#1A1A1A]">
                      End Date {!isCurrentlyWorking && <span className="text-[#FF3B30]">*</span>}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        disabled={isCurrentlyWorking}
                        className="mt-2 w-full p-3 h-10 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-black-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isCurrentlyWorking"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        if (checked) {
                          form.setValue('end_date', '');
                        }
                      }}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-[#1A1A1A] font-normal cursor-pointer">
                      I currently work here
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm text-[#1A1A1A]">
                    Description <span className="text-[#FF3B30]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add your name in the body"
                      {...field}
                      className="mt-2 w-full p-3 resize-none rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-black-200 min-h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row justify-end gap-4 pt-6 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  if (onSuccess) {
                    onSuccess();
                  }
                }}
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
                {isSubmitting ? 'Adding...' : 'Add Experience'}
              </Button>
            </div>
          </form>
        </Form>
    </div>
  );
}
