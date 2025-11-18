import * as z from "zod"

// Schema is identical to Talent
export const companyForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
})

export type CompanyForgotPasswordFormValues = z.infer<typeof companyForgotPasswordSchema>