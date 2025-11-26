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
import type { JobDetailsProps, JobFormData2 } from '@/types/create-new-job';
import TextEditor from '@/components/shared/ui/text-editor';
import Input from '@/components/ui/input';
import {
  JobDetailsFormData,
  jobDetailsSchema,
  JobPostPayload2,
} from '@/validations/create-post.schema';
import { useCategories, useJobLevel, useSkills } from '@/hooks/lookups';
import { useState } from 'react';
import { toast } from 'sonner';
import { draftPost } from '@/api/actions/create-post';

export default function JobDetails({
  initialData,
  onUpdate,
  onNext,
  id,
}: JobDetailsProps) {
  const [isDrafting, setIsDrafting] = useState(false);

  const { data: categories } = useCategories();
  const { data: job_level } = useJobLevel();
  const { data: skillsRes } = useSkills();
  const [selectedSkills, setSelectedSkills] = useState<
    { id: string; name: string }[]
  >((initialData.skills as { id: string; name: string }[]) ?? []);
  const initialSkills =
    initialData?.skills?.map((skill) =>
      typeof skill === 'string' ? skill : skill.id,
    ) ?? [];
  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<JobDetailsFormData>({
    resolver: zodResolver(jobDetailsSchema),
    defaultValues: {
      category_id: initialData.category_id,
      job_level_id: initialData.job_level_id,
      title: initialData.title,
      description: initialData.description || '',
      skills: initialSkills,
      price: initialData.price,
      acceptance_criteria: initialData.acceptance_criteria || '',
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
    } else {
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
    const formDataUpdate: Partial<JobFormData2> = {
      category_id: data.category_id,
      title: data.title,
      description: data.description,
      skills: data.skills,
      price: data.price,
      acceptance_criteria: data.acceptance_criteria,
      job_level_id: data.job_level_id,
    };

    onUpdate(formDataUpdate);
    onNext?.();
  };

  const handleSaveDraft = async () => {
    setIsDrafting(true);
    const formData = getValues();
    const formDataUpdate: Partial<JobPostPayload2> = {
      category_id: formData.category_id,
      title: formData.title,
      description: formData.description,
      skills: formData.skills as string[],
      acceptance_criteria: formData.acceptance_criteria,
    };
    // onUpdate(formDataUpdate);
    try {
      const response = await draftPost(formDataUpdate);
      // console.log(response);

      if (response && !response?.success) {
        toast.error(response.message);
        return;
      }

      toast.success('Your job has been saved to draft successfully');
      // reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsDrafting(false);
    }
  };

  return (
    <div className="space-y-6 ">
      <Card className="border border-black-50 shadow-none">
        <div className="p-6 border-b border-black-50">
          <h2 className="text-2xl text-tertiary-500 font-semibold">
            {id ? 'Edit a job post' : 'Create a New Job Post'}
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
              name="category_id"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full border-input bg-white">
                    <SelectValue placeholder="Choose a category for this job" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories &&
                      categories.map((cat: { id: string; name: string }) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category_id && (
              <p className="text-xs text-red-500">
                {errors.category_id.message}
              </p>
            )}
          </div>

          {/* Job level Select */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-200">
              Select Job Level
            </label>
            <Controller
              name="job_level_id"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full border-input bg-white">
                    <SelectValue placeholder="Choose a job level for this job" />
                  </SelectTrigger>
                  <SelectContent>
                    {job_level &&
                      job_level.map((cat: { id: string; name: string }) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category_id && (
              <p className="text-xs text-red-500">
                {errors.category_id.message}
              </p>
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
                  skillsRes.map((skill: { id: string; name: string }) => (
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
                  name="acceptance_criteria"
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
            {errors.acceptance_criteria && (
              <p className="text-xs text-red-500">
                {errors.acceptance_criteria.message}
              </p>
            )}
          </div>

          {/* Action Buttons - fixed */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex justify-between">
              <Button
                variant="outline"
                disabled={isDrafting}
                className="border-[#E7E7E7] text-[#344054]"
              >
                Cancel
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="">
                <Button
                  variant="outlineGray"
                  onClick={handleSaveDraft}
                  disabled={isDrafting}
                  className="border-[#E7E7E7]"
                >
                  {isDrafting ? 'Saving as Draft' : ' Save As Draft'}
                </Button>
              </div>

              <div className="">
                <Button
                  onClick={handleSubmit(onSubmit)}
                  variant={'ghost'}
                  disabled={isDrafting}
                  className="text-primary-blue cursor-pointer"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
