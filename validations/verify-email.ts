import * as z from 'zod';

export const verifyEmailSchema = z.object({
  pin: z
    .string()
    .min(6, 'Code must be 6 digits')
    .regex(/^[0-9]*$/, 'Only numbers allowed'),
});

export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;
