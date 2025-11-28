import Image from 'next/image';
import React from 'react';

export const Hero = () => {
  return (
    <section className="relative h-[340px] flex justify-center items-center bg-primary-300 pb-10 overflow-hidden">
      {/* Text content */}
      <div className="relative z-10 text-white space-y-4 max-w-[700px] text-center px-4">
        <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl text-center">
          Frequently Asked Questions
        </h2>
        <p className="font-normal md:text-[18px] text-center">
          Here’s a quick guide to help talents and recruiters understand how HNG
          Portal works within the HNG ecosystem.
        </p>
      </div>

      {/* Image at lower-left */}
      <div className="absolute -bottom-40 right-0 z-0">
        <Image
          src="/assets/images/landing-page/hero-images/desktop/hero_bg_items.png"
          alt="background illustration"
          width={800} // adjust width as needed
          height={800} // adjust height as needed
          className="object-contain opacity-70"
          priority
        />
      </div>
    </section>
  );
};
