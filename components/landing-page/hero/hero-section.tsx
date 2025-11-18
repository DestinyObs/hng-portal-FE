import React from 'react';
import HeroText from './hero-text';
import HeroImageContainer from './hero-image-container';

export default function HeroSection() {
  return (
    <section className="flex justify-center items-center">
      <div className="w-full max-w-[1200] flex flex-col md:flex-row md:gap-[83px] md:justify-center md:mt-[100px] gap-14">
        <HeroText />
        <HeroImageContainer />
      </div>
    </section>
  );
}
