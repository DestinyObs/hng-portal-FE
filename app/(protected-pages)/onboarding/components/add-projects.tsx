'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/input';
import { useTalentOnboardTab } from '@/store/onboarding';

// Zod validation schema
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
    }, 'File size must be less than 100MB')
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

  const {
    register,
    control,
    // handleSubmit,
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

  // const onSubmit = (data: PortfolioFormData) => {
  //   console.log('Form submitted:', data);
  // };

  const handleFileChange = (index: number, files: FileList | null) => {
    if (files && files.length > 0) {
      setFileNames({ ...fileNames, [index]: files[0].name });
    } else {
      const newFileNames = { ...fileNames };
      delete newFileNames[index];
      setFileNames(newFileNames);
    }
  };

  const handleContinue = () => {
    // const selected = tracks.find((t) => t.id === selectedTrack);
    navigate.push('/dashboard');
    setTabs('profile');
    // alert(`You selected: ${selected?.title}`);
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
                    const newFileNames = { ...fileNames };
                    delete newFileNames[index];
                    setFileNames(newFileNames);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </div>
            )}

            <div>
              <Label
                htmlFor={`projects.${index}.name`}
                className="onboarding-label"
              >
                Project Name
              </Label>
              <Input
                id={`projects.${index}.name`}
                {...register(`projects.${index}.name`)}
                placeholder="e.g., E-commerce project"
                className="mt-1 text-base"
              />
              {errors.projects?.[index]?.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.projects[index]?.name?.message}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor={`projects.${index}.url`}
                className="onboarding-label"
              >
                Project URL
              </Label>
              <Input
                id={`projects.${index}.url`}
                {...register(`projects.${index}.url`)}
                placeholder="https://"
                className="mt-1 text-base"
              />
              {errors.projects?.[index]?.url && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.projects[index]?.url?.message}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor={`projects.${index}.file`}
                className="onboarding-label"
              >
                Upload file{' '}
                <span className="text-gray-100/60 font-normal">(optional)</span>
              </Label>
              <div className="mt-2 flex items-center gap-3 py-2 px-3.5 rounded-md border border-gray-100/25">
                <label
                  htmlFor={`projects.${index}.file`}
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-primary-blue rounded-sm shadow-sm text-sm font-medium text-primary-blue bg-white hover:bg-gray-50 focus:outline-none"
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
              <p className="text-sm text-black-200 mt-3 font-light md:text-base">
                Please upload files, size less than 100KB
              </p>
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
        className="mt-9 w-full border shadow-xs border-gray-100/25 hover:border-gray-100/25 py-6 text-black text-lg font-normal"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Project
      </Button>

      <div className="mt-6 flex flex-col items-center gap-3">
        <Button
          variant={'default'}
          onClick={handleContinue}
          size={'sm'}
          className="w-full md:w-82"
        >
          Continue
        </Button>

        <Link
          href={'/dashboard'}
          className="mt-5 text-primary-blue font-medium text-lg hover:text-primary-blue/60 transition-colors"
        >
          Complete Later
        </Link>
      </div>
    </div>
  );
}
