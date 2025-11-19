
import LogoCarousel from '@/components/landing-page/carousel'
import HeroSection from '@/components/landing-page/hero/hero-section'
import Features from '@/components/landing-page/features/features';
import React from 'react'
import WhyChooseUs from '@/components/landing-page/why-choose-us/WhyChooseUs';
import HowItWorks from '@/components/landing-page/how-it-works/HowItWorks';
export default function page() {
  return (
    <section className="min-h-screen bg-white">
      <header className="border border-blue-600 h-[10vh]"></header>
      <HeroSection />
      <LogoCarousel />
      <Features />
      <WhyChooseUs/>
      <HowItWorks/>
    </section>
  );
}
