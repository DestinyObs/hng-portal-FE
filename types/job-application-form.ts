import { z } from 'zod';

export const formSchema = z.object({
  cover_letter: z
    .string()
    .min(50, 'Cover letter must be at least 50 characters'),
  portfolioLink: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  resume: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, { message: 'Resume is required' })
    .refine((files) => files?.[0]?.type === 'application/pdf', {
      message: 'Only PDF files allowed',
    }),
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
export interface JobApplicationPayload {
  cover_letter: string;
  resume: File;
  job_id: string;
}
