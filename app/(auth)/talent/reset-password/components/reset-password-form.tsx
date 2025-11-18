"use client"

import React, { useState } from "react"
import { useForm, FieldValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// FIX: Using absolute path to guarantee resolution
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/app/(auth)/talent/reset-password/schema"

// Import Shadcn Components
import { Button } from "@/components/ui/button"
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import { Loader2 } from "lucide-react"

// Import the team's Input component directly
import Input from "@/components/ui/input"

// REMOVED: import { FormInput } from "@/app/(auth)/components/form-input"

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<ResetPasswordFormValues & FieldValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: ResetPasswordFormValues) {
    setIsLoading(true)
    setError(null)
    
    // REMEMBER TO REMOVE CONSOLE.LOGS BEFORE PUSHING
    console.log("Reset Password values:", values)
    
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)

    // TODO: On success, redirect to sign-in or dashboard
    // router.push('/sign-in');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                {/* FIX: Direct use of Input */}
                <Input
                  placeholder="Enter password"
                  inputType="password"
                  aria-invalid={!!fieldState.error}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Confirm Password Field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                {/* FIX: Direct use of Input */}
                <Input
                  placeholder="Re-enter password"
                  inputType="password"
                  aria-invalid={!!fieldState.error}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isLoading} variant="default">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Reset Password"
          )}
        </Button>

        {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
        )}
      </form>
    </Form>
  )
}