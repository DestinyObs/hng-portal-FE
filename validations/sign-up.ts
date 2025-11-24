import * as z from 'zod';

export const companySignUpSchema = z.object({
  company_name: z.string().min(1, { message: 'Company name is required' }),
  company_website: z.string().url({ message: 'Please enter a valid URL' }),
  industry: z.string().min(1, { message: 'Industry is required' }),

  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),

  password: z
    .string()
    .min(8, { message: 'Password must contain at least 8 characters' }),

  password_confirmation: z
    .string()
    .min(8, { message: 'Password must contain at least 8 characters' }),

  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export const talentSignUpSchema = z.object({
  firstname: z.string().min(1, { message: 'First name is required' }),
  lastname: z.string().min(1, { message: 'Last name is required' }),
  phone_number: z.string().min(1, { message: 'Phone number is required' }),
  country: z.string().min(1, { message: 'Country is required' }),

  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),

  password: z
    .string()
    .min(8, { message: 'Password must contain at least 8 characters' }),

  password_confirmation: z
    .string()
    .min(8, { message: 'Password must contain at least 8 characters' }),

  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export type TalentSignUpFormValues = z.infer<typeof talentSignUpSchema>;
export type CompanySignUpFormValues = z.infer<typeof companySignUpSchema>;
