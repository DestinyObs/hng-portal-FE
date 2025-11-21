'use client';

import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronRight, X } from 'lucide-react';
import type { JobDetailsProps, JobFormData } from '@/types/create-new-job';
import { JOB_CATEGORIES } from '@/data/job-categories';
import { SUGGESTED_SKILLS } from '@/data/suggested-skills';
import TextEditor from '@/components/shared/text-editor';
import Input from '@/components/ui/input';
import {
  JobDetailsFormData,
  jobDetailsSchema,
} from '@/schemas/create-post.schema';

export default function JobDetails({
  initialData,
  onUpdate,
  onNext,
}: JobDetailsProps) {
  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<JobDetailsFormData>({
    resolver: zodResolver(jobDetailsSchema),
    defaultValues: {
      category: initialData.category,
      title: initialData.title,
      description: initialData.description || '',
      skills: initialData.skills,
      acceptanceCriteria: initialData.acceptanceCriteria || '',
    },
    mode: 'onChange',
  });

  const skills = useWatch({
    control,
    name: 'skills',
  });

  const handleAddSkill = (skill: string): void => {
    if (skill && !skills.includes(skill) && skills.length < 5) {
      setValue('skills', [...skills, skill], { shouldValidate: true });
    }
  };

  const handleRemoveSkill = (skillToRemove: string): void => {
    setValue(
      'skills',
      skills.filter((s) => s !== skillToRemove),
      { shouldValidate: true },
    );
  };

  const onSubmit = (data: JobDetailsFormData) => {
    const formDataUpdate: Partial<JobFormData> = {
      category: data.category,
      title: data.title,
      description: data.description,
      skills: data.skills,
      acceptanceCriteria: data.acceptanceCriteria,
    };
    onUpdate(formDataUpdate);
    onNext?.();
  };

  const handleSaveDraft = (): void => {
    const formData = getValues();
    const formDataUpdate: Partial<JobFormData> = {
      category: formData.category,
      title: formData.title,
      description: formData.description,
      skills: formData.skills,
      acceptanceCriteria: formData.acceptanceCriteria,
    };
    onUpdate(formDataUpdate);
  };

  return (
    <div className="space-y-6 ">
      <Card className="border">
        <div className="p-6 border-b">
          <h2 className="text-2xl text-tertiary-500 font-semibold">
            Create a New Job Post
          </h2>
          <p className="text-tertiary-200 mt-1 text-sm">
            Connect with verified HNG talents across design, developments, and
            more.
          </p>
        </div>

        <CardHeader>
          <CardTitle>Step 1 - Job Details</CardTitle>
          <CardDescription>
            Share an opportunity with the HNG community or the world.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Category Select */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-200">
              Select Job Category
            </label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full border-input bg-white">
                    <SelectValue placeholder="Choose a category for this job" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-xs text-red-500">{errors.category.message}</p>
            )}
          </div>

          {/* Job Title Input */}
          <div className="space-y-3">
            <label
              htmlFor="title"
              className="text-sm font-semibold text-gray-200"
            >
              Job Title
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  id="title"
                  type="text"
                  placeholder="What is the job title?"
                  {...field}
                />
              )}
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <label htmlFor="description" className="text-sm font-semibold">
              Job Description
            </label>
            <div className="border border-input rounded-lg overflow-hidden">
              <Controller
                name="description"
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
            <p className="text-xs text-muted-foreground">Min. 50 characters</p>
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Skills Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold">
                Add Skills ({skills.length}/5)
              </label>
            </div>
            <Input
              type="text"
              placeholder="What skills are you looking for?...."
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const input = e.currentTarget;
                  handleAddSkill(input.value.trim());
                  input.value = '';
                }
              }}
            />

            {/* Selected Skills */}
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 px-3 py-2 bg-white text-foreground rounded-lg text-sm border border-input"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Suggested Skills */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2 pt-2">
                {SUGGESTED_SKILLS.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleAddSkill(skill)}
                    disabled={skills.includes(skill) || skills.length >= 5}
                    className="px-3 py-2 rounded-full text-xs md:text-sm bg-white border border-input text-gray-700 hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {skill}
                  </button>
                ))}
              </div>
              {errors.skills && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.skills.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="criteria" className="text-sm font-semibold">
              Acceptance Criteria
            </label>
            <div className="border border-input rounded-lg overflow-hidden">
              <div className="border border-input rounded-lg overflow-hidden">
                <Controller
                  name="acceptanceCriteria"
                  control={control}
                  render={({ field }) => (
                    <TextEditor
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      placeholder="What do you expect from the person you will hire?"
                    />
                  )}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Min. 50 characters</p>
            {errors.acceptanceCriteria && (
              <p className="text-xs text-red-500">
                {errors.acceptanceCriteria.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex justify-between">
          <Button variant="outline" className="border-[#E7E7E7] text-[#344054]">
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="text-tertiary-500 font-semibold border-0 md:hidden inline-flex"
          >
            Save As Draft
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="text-tertiary-500 font-semibold border-0 hidden md:inline-flex"
          >
            Save As Draft
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            className="bg-[#00AEFF] hover:bg-[#0088cc] text-white flex items-center justify-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
