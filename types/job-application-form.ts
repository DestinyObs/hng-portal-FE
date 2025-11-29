import { z } from 'zod';

export const formSchema = z.object({
  resume: z.instanceof(File, { message: 'Resume is required' }).nullable(),
  cover_letter: z
    .string()
    .min(10, 'Cover letter must be at least 10 characters'),
  portfolioLink: z.string().url().optional().or(z.literal('')),
});

export type JobApplicationFormData = z.infer<typeof formSchema>;

export type PreviewProps = {
  data: JobApplicationFormData;
  onSubmit: () => void;
  onEdit: () => void;
  isSubmitting?: boolean;
};

export type JobApplicationFormProps = {
  onNext: (data: JobApplicationFormData) => void;
};

// types/job-application-form.ts
export interface JobApplicationPayload {
  cover_letter: string; // Not an object, just a string
  resume: File; // File object from file input
  job_id: string;
}
