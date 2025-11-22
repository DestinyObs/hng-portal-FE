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
        { x: [0, -10, 0] },
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
        { x: [0, 10, 0] },
        {
          duration: 7,
          repeat: 0,
          ease: 'easeInOut',
        },
      );
    }
  }, []);

  return (
    <div className="relative hidden w-full h-full flex-col justify-center items-center bg-primary-blue text-white p-8 overflow-hidden rounded-2xl lg:flex">
      <Image
        src="/images/line-pattern-top-right.png"
        alt="Line Pattern Top Right"
        width={298}
        height={408}
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
        }}
      />
      <Image
        src="/images/line-pattern-bottom-left.png"
        alt="Line Pattern Bottom Left"
        width={298}
        height={408}
        style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
        }}
      />

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
        <h3 className="text-h3 font-bold">WELCOME TO HNG PORTAL!</h3>
        <p className="text-subtitle">
          Connect with top talent and discover your next hire
        </p>
      </div>
    </div>
  );
}
