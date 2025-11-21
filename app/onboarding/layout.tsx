import Image from 'next/image';
import React from 'react';
import bracketLogo1 from '@/public/images/biglogo.png';
import bracketLogo2 from '@/public/images/biglogo2.png';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="flex min-h-screen w-full
    max-w-[1440px] mx-auto"
    >
      <div className="w-full h-full min-h-full">
        <aside className="fixed -left-44 md:left-0 top-0">
          <Image
            src={bracketLogo1}
            height={300}
            width={300}
            className="md:h-[200px]"
            alt="Square bracket logo"
          />
        </aside>
        <aside className="fixed -right-3.5 md:right-0 bottom-0">
          <Image
            src={bracketLogo2}
            height={350}
            width={380}
            className="w-64 h-56 md:h-[250px] md:w-96"
            alt="Square bracket logo"
          />
        </aside>

        <div className="w-full relative">{children}</div>
      </div>
    </main>
  );
}
