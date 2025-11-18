
import LogoCarousel from '@/components/landing-page/carousel'
import HeroSection from '@/components/landing-page/hero/hero-section'
import Features from '@/components/landing-page/features/features';
import React from 'react'
export default function page() {
  return (
    <section className="min-h-screen bg-white">
      <header className="border border-blue-600 h-[10vh]"></header>
      <HeroSection />
      <LogoCarousel />
      <Features />
    </section>
  );
}
