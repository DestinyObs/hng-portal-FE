import { cn } from '@/lib/utils';
import { Mail, CheckSquare, Settings } from 'lucide-react';

import { EmailCheckStepCard } from './_components/email-check-step';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EmailConfirmationPage() {
  const mockEmail = 'johndoe@gmail.com';

  return (
    <Card className="w-full max-w-lg mx-auto border-0 shadow-none py-0">
      <CardHeader className="text-center px-0">
        <CardTitle className="text-h2 font-bold mb-4">Reset password</CardTitle>
        <p className={cn('text-subtitle', 'text-muted-foreground')}>
          We sent a reset link to{' '}
          <span className="font-semibold text-foreground">{mockEmail}</span>
        </p>
      </CardHeader>
      <CardContent className="px-0 pt-8 space-y-6">
        <EmailCheckStepCard
          icon={Mail}
          title="Open the email from us"
          description="Check your inbox for an email from our team."
        />

        <EmailCheckStepCard
          icon={CheckSquare}
          title="Click the reset link"
          description="Click the big blue button in the email."
        />

        <EmailCheckStepCard
          icon={Settings}
          title="You'll be redirected to your dashboard"
          description="Start using your account immediately."
        />

        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm mb-4">
            Didn&apos;t receive the email?
          </p>
          <Button className="w-full" variant="outline">
            Resend Reset Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
