'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Paperclip } from 'lucide-react';
import TextEditor from '../shared/ui/text-editor';
import Input from '../ui/input';
import { Button } from '../ui/button';
import JobApplicationDetails from './job-details';

const formSchema = z.object({
  coverLetter: z
    .string()
    .min(10, 'Cover letter must be at least 10 characters'),
  portfolioLink: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  resume: z.any().refine((files) => files?.length > 0, 'Resume is required'),
});

const JobApplicationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {
    console.log('Form submitted:');
    // Handle form submission
  };

  const { control } = useForm({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="max-w-[1120px] mx-auto bg-gray-50 p-4 space-y-6">
      <JobApplicationDetails />

      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6 mb-14">
        {/* Cover Letter Section */}
        <div className="py-3">
          <h2 className="text-xl font-semibold mb-2">Cover Letter</h2>
          <p className="text-sm text-gray-500 mb-4">
            Provide any extra information to support your application
          </p>

          <div className="border border-input rounded-lg overflow-hidden">
            <Controller
              name="coverLetter"
              control={control}
              render={({ field }) => (
                <TextEditor
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  placeholder="Describe the job role here..."
                />
              )}
            />
          </div>
        </div>

        {/* Portfolio Link Section */}
        <div className="py-3">
          <label className="text-sm text-gray-500 mb-4">
            Paste the link to your portfolio{' '}
            <span className="text-gray-100">(Optional)</span>
          </label>
          <Input
            {...register('portfolioLink')}
            type="url"
            placeholder="Link to your portfolio"
          />
          {errors.portfolioLink && (
            <p className="text-red-500 text-sm mt-1">
              {errors.portfolioLink.message}
            </p>
          )}
        </div>

        {/* Resume Upload Section */}
        <div className="py-3">
          <label className="block text-sm font-medium mb-3 text-gray-500">
            Attach Resume
          </label>
          <Input
            {...register('resume')}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            id="resume-upload"
          />
          <label
            htmlFor="resume-upload"
            className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-primary-300 text-primary-300  rounded-lg cursor-pointer hover:bg-blue-50 transition-colors font-medium"
          >
            <Paperclip /> Attach file
          </label>
        </div>
      </div>
      {/* Action Buttons - fixed */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex justify-between gap-4">
          <Button
            onClick={handleSubmit(onSubmit)}
            variant={'default'}
            className="cursor-pointer"
          >
            Submit
          </Button>
          <Button
            variant="outline"
            className="border-primary-300 text-gray-500"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationForm;
