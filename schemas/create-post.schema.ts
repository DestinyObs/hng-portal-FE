import * as z from 'zod';

export const jobDetailsSchema = z.object({
  category_id: z.string().optional(),
  title: z.string().min(1, 'Job title is required'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  price: z.string(),
  skills: z
    .array(z.string())
    .min(1, 'At least one skill is required')
    .max(5, 'Maximum 5 skills allowed')
    .min(1, 'At least one skill is required')
    .max(5, 'Maximum 5 skills allowed'),
  acceptance_criteria: z
    .string()
    .min(50, 'Acceptance criteria must be at least 50 characters')
    .min(50, 'Acceptance criteria must be at least 50 characters'),
});

export type JobDetailsFormData = z.infer<typeof jobDetailsSchema>;

export const jobDetailsStep2Schema = z.object({
  track_id: z.string().min(1, 'HNG Track is required'),
  job_type_id: z.string().min(1, 'Job Type is required'),
  work_mode_id: z.string().min(1, 'Candidate Location is required'),
  state_id: z.string().optional(),
  country_id: z.string().optional(),
});

export type JobDetailsStep2FormData = z.infer<typeof jobDetailsStep2Schema>;

export type JobPostPayload = {
  company_id: string;
  title: string;
  description: string;
  acceptance_criteria: string;
  state_id: string;
  country_id: string;
  price: string;
  track_id: string;
  category_id: string;
  job_type_id: string;
  work_mode_id: string;
  skills: string[];
};
