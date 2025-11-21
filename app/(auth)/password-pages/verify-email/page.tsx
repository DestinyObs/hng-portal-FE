// app/(auth)/verify-email/page.tsx
import { AuthImage } from '@/components/auth-image';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex">
      
      <AuthImage />

    
      <div className="flex-1 flex items-center justify-center px-6 lg:px-12 bg-background">
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

          {/* Title & Subtitle */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-foreground">Verify your email</h1>
            <p className="text-muted-foreground text-base">
              We sent a code to{' '}
              <span className="text-foreground font-medium">johnDoe@gmail.com</span>
            </p>
          </div>

          {/* 6-Digit OTP */}
          <div className="flex justify-center gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                className="w-12 h-14 text-center text-2xl font-semibold border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#60A5FA] focus:border-transparent transition-all"
                placeholder="0"
              />
            ))}
          </div>

          {/* Resend */}
          <div className="text-center text-sm text-muted-foreground">
            Didn’t get a code?{' '}
            <button className="text-[#60A5FA] hover:text-[#3B82F6] font-medium underline-offset-4 hover:underline">
              Click to resend
            </button>
          </div>

          {/* Continue Button */}
          <button className="w-full h-14 bg-[#60A5FA] hover:bg-[#3B82F6] text-white font-medium text-base rounded-lg shadow-sm transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
            Continue
          </button>

          {/* Back to Log in */}
          <div className="text-center pt-4">
            <Link
              href="/login"
              className="inline-flex items-center text-[#60A5FA] hover:text-[#3B82F6] font-medium text-base transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}