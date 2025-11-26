'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/input';
import { useTalentOnboardTab } from '@/store/onboarding';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { talent_portfolio_api } from '@/api/actions/talent-onboarding';
import { useSkipToDashboard } from '@/hooks/use-skip-to-dashboard';

const MAX_FILE_SIZE = 100 * 1024; // 100KB
const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
];

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  url: z
    .string()
    .url('Please enter a valid URL')
    .min(1, 'Project URL is required'),
  file: z
    .custom<FileList>()
    .optional()
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return files[0].size <= MAX_FILE_SIZE;
    }, 'File size must be less than 100KB')
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return ACCEPTED_FILE_TYPES.includes(files[0].type);
    }, 'Only .jpg, .jpeg, .png, .webp and .pdf files are accepted'),
});

const portfolioSchema = z.object({
  projects: z.array(projectSchema).min(1, 'At least one project is required'),
});

type PortfolioFormData = z.infer<typeof portfolioSchema>;

export default function AddPortfolioProjects() {
  const [fileNames, setFileNames] = useState<Record<number, string>>({});
  const navigate = useRouter();
  const setTabs = useTalentOnboardTab((state) => state?.setTabs);
  const { skipToDashboard } = useSkipToDashboard();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      projects: [{ name: '', url: '', file: undefined }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });

  const { mutate, isPending } = useMutation({
    mutationFn: talent_portfolio_api,
    onSuccess: () => {
      toast.success('Onboarding completed successfully!');
      navigate.push('/talent/dashboard');
      setTabs('profile');
    },
    onError: () => {
      toast.error('Failed to upload portfolio');
    },
  });

  const onSubmit = (data: PortfolioFormData) => {
    const formData = new FormData();

    data.projects.forEach((project, index) => {
      formData.append(`projects[${index}][name]`, project.name);
      formData.append(`projects[${index}][url]`, project.url);

      if (project.file && project.file.length > 0) {
        formData.append(
          `projects[${index}][file]`,
          project.file[0],
          project.file[0].name,
        );
      }
    });

    mutate(formData);
  };

  const handleFileChange = (index: number, files: FileList | null) => {
    if (files && files.length > 0) {
      setFileNames({ ...fileNames, [index]: files[0].name });
    } else {
      const updated = { ...fileNames };
      delete updated[index];
      setFileNames(updated);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto py-24 bg-white rounded-lg md:w-[90%] lg:w-3/5">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 lg:text-4xl text-center">
          Add Portfolio Projects
        </h1>
        <p className="text-gray-100 md:text-lg text-center font-dm_sans">
          Showcase your best work and achievements.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6 mt-10 border border-gray-100/25 pt-5 px-4 rounded-xl shadow-xs">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="space-y-4 pb-6 border-b last:border-b-0"
            >
              {index > 0 && (
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      remove(index);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              )}

              <div>
                <Label htmlFor={`projects.${index}.name`}>Project Name</Label>
                <Input
                  id={`projects.${index}.name`}
                  {...register(`projects.${index}.name`)}
                  placeholder="e.g., E-commerce project"
                />
                {errors.projects?.[index]?.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.projects[index]?.name?.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor={`projects.${index}.url`}>Project URL</Label>
                <Input
                  id={`projects.${index}.url`}
                  {...register(`projects.${index}.url`)}
                  placeholder="https://"
                />
                {errors.projects?.[index]?.url && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.projects[index]?.url?.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor={`projects.${index}.file`}>
                  Upload file{' '}
                  <span className="text-gray-100/60">(optional)</span>
                </Label>

                <div className="mt-2 flex items-center gap-3 py-2 px-3.5 rounded-md border border-gray-100/25">
                  <label
                    htmlFor={`projects.${index}.file`}
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-primary-blue text-primary-blue rounded-sm shadow-sm"
                  >
                    Choose file
                  </label>

                  <input
                    id={`projects.${index}.file`}
                    type="file"
                    {...register(`projects.${index}.file`)}
                    onChange={(e) => handleFileChange(index, e.target.files)}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.webp,.pdf"
                  />

                  <span className="text-sm text-black-200">
                    {fileNames[index] || 'No file'}
                  </span>
                </div>

                {errors.projects?.[index]?.file && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.projects[index]?.file?.message as string}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => append({ name: '', url: '', file: undefined })}
          className="mt-9 w-full py-6 text-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Project
        </Button>

        <div className="mt-6 flex flex-col items-center gap-3">
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="w-full md:w-82"
            disabled={isPending}
          >
            {isPending ? 'Saving...' : 'Continue'}
          </Button>

          <Button
            variant={'link'}
            onClick={() => skipToDashboard('/talent/dashboard')}
            className="mt-5 text-primary-blue font-medium text-lg hover:text-primary-blue/60 transition-colors"
          >
            Complete Later
          </Button>
        </div>
      </form>
    </div>
  );
}
