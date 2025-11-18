import React from "react"
// NOTE: Reusing the same form component logic as Talent, just need to adjust imports if used
import { ResetPasswordForm } from "../../talent/reset-password/components/reset-password-form"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CompanyResetPasswordPage() {
  return (
    <Card className="w-full max-w-md border-0 shadow-none py-0">
      <CardHeader className="text-center px-0">
        <CardTitle className="text-h2 font-bold">
          Reset password
        </CardTitle>
        <p className="text-subtitle text-muted-foreground">
          Enter your new password below.
        </p>
      </CardHeader>
      <CardContent className="px-0">
        {/* Using the Talent form component as the logic is identical */}
        <ResetPasswordForm />
      </CardContent>
    </Card>
  )
}