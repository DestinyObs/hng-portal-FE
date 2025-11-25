import * as z from 'zod';

export const companySignUpSchema = z.object({
  company_name: z.string().min(1, { message: 'Company name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),

  password: z
    .string()
    .min(8, { message: 'Password must contain at least 8 characters' }),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  role: z.literal('company'),
});

export const talentSignUpSchema = z.object({
  firstname: z.string().min(1, { message: 'First name is required' }),
  lastname: z.string().min(1, { message: 'Last name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),

  password: z
    .string()
    .min(8, { message: 'Password must contain at least 8 characters' }),
  role: z.literal('talent'),
});

export type TalentSignUpFormValues = z.infer<typeof talentSignUpSchema>;
export type CompanySignUpFormValues = z.infer<typeof companySignUpSchema>;
