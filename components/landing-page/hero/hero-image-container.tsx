'use client';
import Image from 'next/image';
import React from 'react';
import { motion } from 'motion/react';

const MotionImage = motion(Image);

export default function HeroImageContainer() {
  return (
    <div className="w-[85%] mx-auto max-w-[320px] md:max-w-[560px] not-md:mt-16 relative z-1">
      {/* Background Brackets */}
      <MotionImage
        src="/assets/images/landing-page/hero-images/desktop/square_brackets.png"
        alt="square bracket image"
        width={560}
        height={560}
        className="hidden md:block md:max-w-[400px] lg:min-w-[560px]"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <MotionImage
        src="/assets/images/landing-page/hero-images/mobile/square_bracket.png"
        alt="square bracket image"
        width={318}
        height={259}
        className="md:hidden"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {/* Two Users */}
      <MotionImage
        src="/assets/images/landing-page/hero-images/desktop/two_users.png"
        alt="two users desktop"
        width={264}
        height={333}
        className="hidden md:block absolute -top-[34px] left-[58px] md:max-w-[200px] lg:min-w-[264px]"
        initial={{ opacity: 0, x: -150 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <MotionImage
        src="/assets/images/landing-page/hero-images/mobile/two_users.png"
        alt="two users mobile"
        width={153}
        height={188}
        className="md:hidden absolute bottom-[108px] left-[35px]"
        initial={{ opacity: 0, x: -150 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      {/* Smiling User */}
      <MotionImage
        src="/assets/images/landing-page/hero-images/mobile/smiling_user.png"
        alt="smiling user mobile"
        width={116}
        height={82}
        className="md:hidden absolute bottom-[70px] right-[39px]"
        initial={{ opacity: 0, x: 150 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      <MotionImage
        src="/assets/images/landing-page/hero-images/desktop/smiling_user.png"
        alt="smiling user desktop"
        width={270}
        height={192}
        className="hidden md:block absolute bottom-[97px] right-[34px] lg:w-[270px] md:max-w-[200px] lg:min-w-[270px]"
        initial={{ opacity: 0, x: 150 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />

      {/* Check Marks */}
      <MotionImage
        src="/assets/images/landing-page/hero-images/desktop/check.svg"
        alt="check desktop top"
        width={230}
        height={106}
        className="hidden md:block absolute -top-8 right-[13px] not-lg:w-[150]"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />
      <MotionImage
        src="/assets/images/landing-page/hero-images/desktop/check.svg"
        alt="check desktop bottom"
        width={230}
        height={106}
        className="hidden md:block absolute bottom-[43px] left-[49px] not-lg:w-[150]"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />
      <MotionImage
        src="/assets/images/landing-page/hero-images/desktop/check.svg"
        alt="check mobile top"
        width={123}
        height={55}
        className="md:hidden absolute -top-6 right-[9px] not-lg:w-[150]"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />
      <MotionImage
        src="/assets/images/landing-page/hero-images/desktop/check.svg"
        alt="check mobile bottom"
        width={123}
        height={55}
        className="md:hidden absolute bottom-[7px] left-[34px] not-lg:w-[150]"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />

      {/* Hired & Post Icons */}
      <MotionImage
        src="/assets/images/landing-page/hero-images/desktop/hired.svg"
        alt="hired desktop"
        width={98}
        height={74}
        className="hidden md:block absolute bottom-[241px] right-4"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      />
      <MotionImage
        src="/assets/images/landing-page/hero-images/desktop/post.svg"
        alt="post desktop"
        width={188}
        height={71}
        className="hidden md:block absolute bottom-[230px] left-2"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      />
      <MotionImage
        src="/assets/images/landing-page/hero-images/desktop/hired.svg"
        alt="hired mobile"
        width={53}
        height={42}
        className="md:hidden absolute bottom-[84px] right-[11px]"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      />
      <MotionImage
        src="/assets/images/landing-page/hero-images/desktop/post.svg"
        alt="post mobile"
        width={92}
        height={26}
        className="md:hidden absolute bottom-[90px] left-1"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      />
    </div>
  );
}
