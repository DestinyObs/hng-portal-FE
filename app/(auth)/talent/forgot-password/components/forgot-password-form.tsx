"use client"

import React, { useState } from "react"
import { useForm, FieldValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "../schema"

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

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<ForgotPasswordFormValues & FieldValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: ForgotPasswordFormValues) {
    setIsLoading(true)
    setError(null)
    
    // REMEMBER TO REMOVE CONSOLE.LOGS BEFORE PUSHING
    console.log("Forgot Password values:", values)
    
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)

    // TODO: On success, redirect to the instructional page
    // router.push('/check-email');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                {/* FIX: Direct use of Input */}
                <Input
                  placeholder="Enter your email address"
                  type="email"
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
            "Request Reset Link"
          )}
        </Button>

        {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
        )}
      </form>
    </Form>
  )
}