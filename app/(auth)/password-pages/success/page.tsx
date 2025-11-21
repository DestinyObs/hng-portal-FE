import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function PasswordSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
     
      <CheckCircle2 className="w-20 h-20 text-green-500 mb-8" />

      
      <h1 className="text-3xl font-bold text-foreground mb-4">
        Password Reset
      </h1>

    
      <p className="text-lg text-muted-foreground max-w-sm mb-12">
        Your password has been successfully reset.
      </p>

    
      <Button asChild size="lg" className="w-full max-w-sm h-12 text-base font-medium">
        <Link href="/login">
          Continue to Login
        </Link>
      </Button>
    </div>
  );
}