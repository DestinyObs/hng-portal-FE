
import { PasswordPagesForm } from '../components/password-pages-form';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md mx-auto space-y-10">
      
      <div className="text-center">
        <Image
          src="/images/hng-logo.png"
          alt="HNG Portal"
          width={180}
          height={60}
          className="mx-auto"
          priority
        />
      </div>

      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-foreground">Forgot Password</h1>
        <p className="text-muted-foreground text-base">
          No worries, we’ll send you reset instructions
        </p>
      </div>


      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-1">
            Email Address <span className="text-red-500">*</span>
          </label>

          <div className="[&_label]:hidden! [&_label]:h-0 [&_label]:m-0 [&_label]:p-0">
            <PasswordPagesForm type="forgot" />
          </div>
        </div>
      </div>

      <div className="text-center pt-6">
  <Link
    href="/login"
    className="inline-flex items-center text-[#60A5FA] hover:text-[#3B82F6] font-medium text-base transition-colors"
  >
    <ArrowLeft className="w-4 h-4 mr-2" />
    Back to Log in
  </Link>
</div>
    </div>
  );
}
