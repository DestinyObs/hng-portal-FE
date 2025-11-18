import * as z from 'zod';

export const companySignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),

  password: z.string().min(1, { message: 'Password is required' }),

  rememberMe: z.boolean(),
});

export type CompanySignInFormValues = z.infer<typeof companySignInSchema>;
