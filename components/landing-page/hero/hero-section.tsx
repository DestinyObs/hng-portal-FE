import React from 'react';
import HeroText from './hero-text';
import HeroImageContainer from './hero-image-container';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="flex justify-center items-center bg-primary-300 pb-10 relative">
      <div className="w-full max-w-[1200] flex flex-col md:flex-row lg:gap-[83px] md:justify-center md:mt-[100px] gap-14 md:px-4 ">
        <HeroText />
        <HeroImageContainer />

        <Image
          src={
            '/assets/images/landing-page/hero-images/desktop/hero_bg_items.png'
          }
          alt="smiling user"
          width={800}
          height={700}
          className="absolute bottom-0 right-0 z-0 opacity-70"
        />
      </div>
    </section>
  );
}
