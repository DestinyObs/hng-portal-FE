import * as z from "zod";

export const companySignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),

  password: z.string().min(1, { message: "Password is required" }),

  // preprocess to coerce whatever arrives into a boolean
  rememberMe: z.preprocess((val) => {
    if (typeof val === "string") return val === "true" || val === "on";
    return Boolean(val);
  }, z.boolean().default(false)),
});

export type CompanySignInFormValues = z.infer<typeof companySignInSchema>;
