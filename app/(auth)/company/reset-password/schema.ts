import * as z from "zod"

// Schema is identical to Talent
export const companyResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" }),
    
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your new password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type CompanyResetPasswordFormValues = z.infer<typeof companyResetPasswordSchema>