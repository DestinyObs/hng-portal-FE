import * as z from "zod";

export const jobDetailsSchema = z.object({
  category: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  skills: z
    .array(z.string())
    .min(1, "At least one skill is required")
    .max(5, "Maximum 5 skills allowed"),
  acceptanceCriteria: z
    .string()
    .min(50, "Acceptance criteria must be at least 50 characters"),
});

export type JobDetailsFormData = z.infer<typeof jobDetailsSchema>;

export const jobDetailsStep2Schema = z.object({
  hngTrack: z.string().min(1, 'HNG Track is required'),
  jobType: z.string().min(1, 'Job Type is required'),
  candidateLocation: z.string().min(1, 'Candidate Location is required'),
  state: z.string().optional(),
  country: z.string().optional(),
  jobPrice: z.string().min(1, 'Job Price is required'),
});

export type JobDetailsStep2FormData = z.infer<typeof jobDetailsStep2Schema>;