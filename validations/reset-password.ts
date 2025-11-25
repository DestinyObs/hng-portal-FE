import * as z from 'zod';

export const companyResetPasswordSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    token: z.string().min(1, { message: 'Token is required' }),
    password: z
      .string()
      .min(8, { message: 'Password must contain at least 8 characters' }),

    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your new password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type CompanyResetPasswordFormValues = z.infer<
  typeof companyResetPasswordSchema
>;
