'use client';

import React, { useEffect, useRef } from 'react';
import { animate } from 'motion';
import Image from 'next/image';

export function AuthImage() {
  const logoLeftRef = useRef<HTMLImageElement>(null);
  const logoRightRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (logoLeftRef.current) {
      animate(
        logoLeftRef.current,
        { x: [0, -35, 0] },
        {
          duration: 7,
          repeat: 0,
          ease: 'easeInOut',
        },
      );
    }

    if (logoRightRef.current) {
      animate(
        logoRightRef.current,
        { x: [0, 35, 0] },
        {
          duration: 7,
          repeat: 0,
          ease: 'easeInOut',
        },
      );
    }
  }, []);

  return (
    <div className="fixed left-0 top-0 h-full w-1/2 flex-1 hidden lg:flex flex-col justify-center items-center bg-primary-blue text-white p-8 overflow-hidden">
      <div className="relative w-96 h-96 flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-115 h-150 z-10">
          <div className="absolute left-0 top-0 w-44 h-130">
            <Image
              ref={logoLeftRef}
              src="/images/hng-logo-left.png"
              alt="HNG Logo Left"
              className="w-full h-full object-contain"
              width={128}
              height={384}
            />
          </div>
          <div className="absolute right-0 top-0 w-44 h-130">
            <Image
              ref={logoRightRef}
              src="/images/hng-logo-right.png"
              alt="HNG Logo Right"
              className="w-full h-full object-contain"
              width={128}
              height={384}
            />
          </div>
        </div>

        <div className="relative z-10 bottom-8">
          <Image
            src="/images/auth-img.png"
            alt="HNG Portal Professionals"
            width={336}
            height={336}
            className="rounded-lg"
            priority
          />
        </div>
      </div>

      <div className="text-center z-10 mt-8">
        <h1 className="text-h3 font-bold">WELCOME TO HNG PORTAL!</h1>
        <p className="text-subtitle">
          Connect with professionals and discover opportunities
        </p>
      </div>
    </div>
  );
}
