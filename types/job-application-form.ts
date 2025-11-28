import { z } from 'zod';

export const formSchema = z.object({
  coverLetter: z.string().min(10),
  portfolioLink: z.string().url().optional().or(z.literal('')),
  resume: z.any().refine((files) => files && files.length > 0, {
    message: 'Resume is required',
  }),
});

export type JobApplicationFormData = z.infer<typeof formSchema>;

export type PreviewProps = {
  data: JobApplicationFormData;
  onSubmit: () => void;
  onEdit: () => void;
};

export type JobApplicationFormProps = {
  onNext: (data: JobApplicationFormData) => void;
};
