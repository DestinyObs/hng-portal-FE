import React from 'react';
import { AuthImage } from './components/auth-image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full mx-auto">
      <div className="hidden lg:w-1/2 p-4 lg:flex">
        <AuthImage />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}
