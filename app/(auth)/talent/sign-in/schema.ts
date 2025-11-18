import * as z from 'zod';

export const talentSignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),

  password: z.string().min(1, { message: 'Password is required' }),

  rememberMe: z.boolean(),
});

export type TalentSignInFormValues = z.infer<typeof talentSignInSchema>;
