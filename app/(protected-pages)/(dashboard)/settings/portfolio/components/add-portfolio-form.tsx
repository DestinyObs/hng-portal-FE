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
import {
  addPortfolio,
  updatePortfolio,
} from '@/api/actions/user-profile-settings';
import { useQueryClient } from '@tanstack/react-query';
import { Portfolio } from '@/types/profile-settings';

// Zod schema for validation
const portfolioSchema = z.object({
  title: z.string().min(1, 'Project title is required'),
  description: z.string().optional(),
  url: z.url('Please enter a valid URL').min(1, 'Project URL is required'),
  image_url: z.string().optional(),
});

type PortfolioFormValues = z.infer<typeof portfolioSchema>;

interface PortfolioFormProps {
  onSuccess?: () => void;
  portfolio?: Portfolio | null;
}

export default function AddPortfolioForm({
  onSuccess,
  portfolio,
}: PortfolioFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    portfolio?.image_url || null,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const isEditing = !!portfolio;

  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      title: portfolio?.title || '',
      description: portfolio?.description || '',
      url: portfolio?.url || '',
      image_url: portfolio?.image_url || '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(data: PortfolioFormValues) {
    setIsSubmitting(true);

    try {
      const payload = {
        title: data.title,
        description: data.description || null,
        url: data.url,
        image_url: imagePreview || data.image_url || null,
      };

      let result;
      if (isEditing && portfolio) {
        result = await updatePortfolio(portfolio.id, payload);
      } else {
        result = await addPortfolio(payload);
      }

      if (result.success) {
        // Invalidate profile queries to refresh portfolios
        await queryClient.invalidateQueries({
          queryKey: ['profile'],
        });

        // Reset form
        form.reset();
        setImagePreview(null);
        setImageFile(null);
      } else {
        console.error('Error saving portfolio:', result.error);
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
          {isEditing ? 'Edit Portfolio Project' : 'Add Portfolio Project'}
        </h3>
        <p className="font-normal text-base text-black-200">
          Showcase your best work and achievements
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-4 flex-col w-full"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm text-[#1A1A1A]">
                  Project Title <span className="text-[#FF3B30]">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="E-Commerce Platform"
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
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm text-[#1A1A1A]">
                  Project URL <span className="text-[#FF3B30]">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://example.com/project"
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
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm text-[#1A1A1A]">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Full-stack e-commerce solution with React, Node.js..."
                    {...field}
                    className="mt-2 w-full p-3 resize-none rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition placeholder:text-black-200 min-h-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full">
            <FormLabel className="text-sm text-[#1A1A1A]">
              Project Image
            </FormLabel>
            <div className="mt-2 space-y-4">
              <Input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageChange}
                className="mt-2 w-full p-3 h-10 rounded-lg border border-[#E7E8E9] focus:outline-none focus:border-black text-black transition"
              />
            </div>
          </div>

          <div className="flex flex-row justify-end gap-4 pt-6 w-full mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                setImagePreview(null);
                setImageFile(null);
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
              {isSubmitting
                ? isEditing
                  ? 'Updating...'
                  : 'Adding...'
                : isEditing
                  ? 'Update Project'
                  : 'Add Project'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
