import * as z from 'zod';

export const companySignUpSchema = z.object({
  companyName: z.string().min(1, { message: 'Company name is required' }),

  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),

  password: z
    .string()
    .min(8, { message: 'Password must contain at least 8 characters' }),

  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export type CompanySignUpFormValues = z.infer<typeof companySignUpSchema>;
