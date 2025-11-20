import { ResetPasswordForm } from './components/reset-password';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CompanyResetPasswordPage() {
  return (
    <Card className="w-full max-w-md border-0 shadow-none py-0">
      <CardHeader className="text-center px-0">
        <CardTitle className="text-h2 font-bold">Reset password</CardTitle>
        <p className="text-subtitle text-muted-foreground">
          Enter your new password below.
        </p>
      </CardHeader>
      <CardContent className="px-0">
        <ResetPasswordForm />
      </CardContent>
    </Card>
  );
}
