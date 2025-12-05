import { z } from 'zod';

export const changeApplicantStatusSchema = z.object({
  status: z.string().min(1, 'Status is required'),
});

export type ChangeApplicantStatusSchema = z.infer<
  typeof changeApplicantStatusSchema
>;
