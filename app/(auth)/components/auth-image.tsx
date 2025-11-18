'use client';

import React, { useEffect, useRef } from 'react';
import { animate } from 'motion';

export function AuthImage() {
  const logoLeftRef = useRef<HTMLImageElement>(null);
  const logoRightRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (logoLeftRef.current) {
      animate(
        logoLeftRef.current,
        { x: [0, -20, 0] },
        {
          duration: 5,
          repeat: Infinity,
          // FIX: Changed "ease-in-out" to the correct "easeInOut" string
          ease: 'easeInOut',
        },
      );
    }

    if (logoRightRef.current) {
      animate(
        logoRightRef.current,
        { x: [0, 20, 0] },
        {
          duration: 5,
          repeat: Infinity,
          // FIX: Changed "ease-in-out" to the correct "easeInOut" string
          ease: 'easeInOut',
        },
      );
    }
  }, []);

  return (
    <div className="relative flex-1 hidden lg:flex flex-col justify-center items-center bg-primary-blue text-white p-8 overflow-hidden">
      {/* Image container (relative container for layering) */}
      <div className="relative w-96 h-96 flex items-center justify-center">
        {/* Animated logo (z-0) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 z-0">
          <div className="absolute left-0 top-0 w-32 h-96">
            <img
              ref={logoLeftRef}
              src="/images/hng-logo-left.png"
              alt="HNG Logo Left"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute right-0 top-0 w-32 h-96">
            <img
              ref={logoRightRef}
              src="/images/hng-logo-right.png"
              alt="HNG Logo Right"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* People image (z-10) */}
        <div className="relative z-10">
          <img
            src="/images/logo-people.png"
            alt="HNG Portal Professionals"
            width={336}
            height={336}
            className="rounded-lg"
            loading="eager"
          />
        </div>
      </div>

      {/* Text container (sits below the image block) */}
      <div className="text-center z-10 mt-8">
        <h1 className="text-h1 font-bold mb-4">WELCOME TO HNG PORTAL!</h1>
        <p className="text-subtitle">
          Connect with professionals and discover opportunities
        </p>
      </div>
    </div>
  );
}
