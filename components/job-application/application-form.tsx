'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Paperclip, X } from 'lucide-react';
import TextEditor from '../shared/ui/text-editor';
import Input from '../ui/input';
import { Button } from '../ui/button';
import JobApplicationDetails from './job-details';
import {
  formSchema,
  JobApplicationFormData,
  JobApplicationFormProps,
} from '@/types/job-application-form';
import { useState, ChangeEvent } from 'react';
import { toast } from 'sonner';

const JobApplicationForm = ({
  onNext,
  defaultValues,
}: JobApplicationFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(
    defaultValues?.resume instanceof FileList ? defaultValues.resume[0] : null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<JobApplicationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return; // ✅ stops null

    const files: FileList = e.target.files; // ✅ now it's guaranteed a FileList
    const file = files[0];

    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed');
      return;
    }

    setSelectedFile(file);
    setValue('resume', files, { shouldValidate: true }); // ✅ no null, works fine
  };

  const removeFile = (): void => {
    setSelectedFile(null);

    // Create an empty FileList-like state by resetting input
    const input = document.getElementById('resume-upload') as HTMLInputElement;
    if (input) input.value = '';

    setValue('resume', input.files ?? ({} as FileList), {
      shouldValidate: true,
    }); // ✅ reset as FileList
  };

  const onSubmit = (data: JobApplicationFormData) => {
    onNext(data);
  };

  return (
    <div className="w-full mx-auto bg-gray-50 p-4 space-y-6">
      <JobApplicationDetails />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6 mb-14">
          {/* Cover Letter Section */}
          <div className="py-3">
            <h2 className="text-xl font-semibold mb-2">Cover Letter</h2>
            <p className="text-sm text-gray-500 mb-4">
              Provide any extra information to support your application
            </p>

            <div className="border border-input rounded-lg overflow-hidden">
              <Controller
                name="cover_letter"
                control={control}
                render={({ field }) => (
                  <TextEditor
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    placeholder="Describe why you're a great fit for this role..."
                  />
                )}
              />
            </div>
            {errors.cover_letter && (
              <p className="text-red-500 text-sm mt-1">
                {String(errors.cover_letter.message)}
              </p>
            )}
          </div>

          {/* Portfolio Link Section */}
          <div className="py-3">
            <label className="text-sm text-gray-500 mb-4">
              Paste the link to your portfolio
            </label>
            <Input
              {...register('portfolioLink')}
              type="url"
              placeholder="https://yourportfolio.com"
            />
            {errors.portfolioLink && (
              <p className="text-red-500 text-sm mt-1">
                {String(errors.portfolioLink.message)}
              </p>
            )}
          </div>

          {/* Resume Upload Section */}
          <div className="py-3">
            <label className="block text-sm font-medium mb-3 text-gray-500">
              Attach Resume <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              accept=".pdf"
              className="hidden"
              id="resume-upload"
              onChange={handleFileChange}
            />

            {!selectedFile ? (
              <label
                htmlFor="resume-upload"
                className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-primary-300 text-primary-300 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors font-medium"
              >
                <Paperclip className="w-4 h-4" /> Attach file
              </label>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-blue-50 border border-primary-300 rounded-lg">
                <Paperclip className="w-4 h-4 text-primary-300" />
                <span className="text-sm flex-1 text-gray-700">
                  {selectedFile.name}
                </span>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {errors.resume && (
              <p className="text-red-500 text-sm mt-1">
                {String(errors.resume.message)}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex justify-between gap-4">
            <Button type="submit" variant="default" className="cursor-pointer">
              Preview & Submit
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-primary-300 text-gray-500"
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;
