import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, CheckSquare, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

function StepCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start space-x-4 border-b pb-4 last:border-b-0">
      <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary-blue text-white">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <h3 className="font-semibold text-base">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}

export default function CompanyCheckEmailPage() {
  const mockEmail = 'johndoe@gmail.com';

  return (
    <Card className="w-full max-w-lg border-0 shadow-none py-0">
      <CardHeader className="text-center px-0">
        <CardTitle className="text-h2 font-bold mb-4">Reset password</CardTitle>
        <p className={cn('text-subtitle', 'text-muted-foreground')}>
          We sent a reset link to{' '}
          <span className="font-semibold text-foreground">{mockEmail}</span>
        </p>
      </CardHeader>
      <CardContent className="px-0 pt-8 space-y-6">
        <StepCard
          icon={Mail}
          title="Open the email from us"
          description="Check your inbox for an email from our team."
        />

        <StepCard
          icon={CheckSquare}
          title="Click the reset link"
          description="Click the big blue button in the email."
        />

        <StepCard
          icon={Settings}
          title="You'll be redirected to your dashboard"
          description="Start using your account immediately."
        />

        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm mb-4">
            Didn&apos;t receive the email?
          </p>
          <Button variant="outline">Resend Reset Email</Button>
        </div>
      </CardContent>
    </Card>
  );
}
