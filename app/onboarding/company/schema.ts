import { z } from 'zod';

export const companyDetailsSchema = z.object({
  industry: z.string().min(1, 'Industry is required'),
  industryOther: z.string().optional(),
  size: z.string().min(1, 'Company size is required'),
  sizeOther: z.string().optional(),
  website: z.string().url('Please enter a valid URL').or(z.literal('')),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
});

export type CompanyDetailsSchema = z.infer<typeof companyDetailsSchema>;

export const userIdentitySchema = z.object({
  companyName: z.string().min(2, {
    message: 'Company name must be at least 2 characters.',
  }),
  description: z
    .string()
    .min(1, {
      message: 'Description must be at least 50 characters.',
    })
    .max(500, {
      message: 'Description must not exceed 500 characters.',
    }),
  logo: z.any().optional(),
});

export type UserIdentitySchema = z.infer<typeof userIdentitySchema>;
