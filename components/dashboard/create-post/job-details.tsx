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
import { X } from 'lucide-react';
import type { JobDetailsProps, JobFormData } from '@/types/create-new-job';
import TextEditor from '@/components/shared/text-editor';
import Input from '@/components/ui/input';
import {
  JobDetailsFormData,
  jobDetailsSchema,
} from '@/schemas/create-post.schema';
import { useCategories, useSkills } from '@/app/hooks/lookups';
import { useState } from 'react';

export default function JobDetails({
  initialData,
  onUpdate,
  onNext,
}: JobDetailsProps) {
  const { data: categories } = useCategories();
  const { data: skillsRes } = useSkills();
  const [selectedSkills, setSelectedSkills] = useState<
    { id: string; name: string }[]
  >([]);

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
      price: initialData.price,
      acceptanceCriteria: initialData.acceptanceCriteria || '',
    },
    mode: 'onChange',
  });

  const skills = useWatch({
    control,
    name: 'skills',
  });

  const handleAddSkill = (skill: { id: string; name: string }): void => {
    if (skill && !skills.includes(skill.id) && skills.length < 5) {
      setSelectedSkills([...selectedSkills, skill]);
      // i want set value to store the id
      setValue('skills', [...skills, skill.id], { shouldValidate: true });
    }
  };

  const handleRemoveSkill = (skillToRemove: {
    id: string;
    name: string;
  }): void => {
    setValue(
      'skills',
      skills.filter((s) => s !== skillToRemove.id),
      { shouldValidate: true },
    );
    setSelectedSkills(selectedSkills.filter((s) => s.id !== skillToRemove.id));
  };

  const onSubmit = (data: JobDetailsFormData) => {
    const formDataUpdate: Partial<JobFormData> = {
      category: data.category,
      title: data.title,
      description: data.description,
      skills: data.skills,
      price: data.price,
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
      <Card className="border border-black-50 shadow-none">
        <div className="p-6 border-b border-black-50">
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
                    {categories &&
                      categories.map((cat, index) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
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
          {/* Job description */}
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
          {/* salary */}
          <div className="space-y-3">
            <label
              htmlFor="price"
              className="text-sm font-semibold text-gray-200"
            >
              Salary (₦)
            </label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Input
                  id="price"
                  type="text"
                  placeholder="What is the salary?"
                  {...field}
                />
              )}
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
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
                  handleAddSkill(input);
                  input.value = '';
                }
              }}
            />

            {/* Selected Skills */}
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-2 px-3 py-2 bg-white text-foreground rounded-lg text-sm border border-input"
                  >
                    {skill.name}
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
                {skillsRes &&
                  skillsRes.map((skill) => (
                    <button
                      key={skill.id}
                      onClick={() => handleAddSkill(skill)}
                      disabled={skills.includes(skill.id) || skills.length >= 5}
                      className="px-3 py-2 rounded-full text-xs md:text-sm bg-white border border-input text-gray-700 hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {skill.name}
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
          {/* acceptance criteria */}
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex justify-between">
              <Button
                variant="outline"
                className="border-[#E7E7E7] text-[#344054]"
              >
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
                variant="outlineGray"
                onClick={handleSaveDraft}
                className="border-[#E7E7E7]"
              >
                Save As Draft
              </Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                variant={'ghost'}
                className="text-primary-blue"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
