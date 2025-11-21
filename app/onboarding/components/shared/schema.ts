import { z } from 'zod';

export const companyDetailsSchema = z.object({
  industry: z.string().min(1, 'Select an industry'),
  size: z.string().min(1, 'Select company size'),
  website: z.string().url('Enter a valid URL'),
  city: z.string().min(1, 'Enter your city'),
  country: z.string().min(1, 'Enter your country'),
});

export type CompanyDetailsSchema = z.infer<typeof companyDetailsSchema>;

export const userIdentitySchema = z.object({
  companyName: z.string().min(2, {
    message: 'Company name must be at least 2 characters.',
  }),
  description: z
    .string()
    .min(10, {
      message: 'Description must be at least 10 characters.',
    })
    .max(500, {
      message: 'Description must not exceed 500 characters.',
    }),
  logo: z.any().optional(),
});

export type UserIdentitySchema = z.infer<typeof userIdentitySchema>;