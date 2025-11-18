import React from 'react';
import { AuthImage } from './components/auth-image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="flex min-h-screen w-full
    max-w-[2000px] mx-auto"
    >
      <AuthImage />

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </main>
  );
}
