import z from 'zod';

export const waitlistFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Please enter your full name.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  role: z.enum(['talent', 'company'], {
    message: 'Please select if you&apos;re joining as a talent or company.',
  }),
});
