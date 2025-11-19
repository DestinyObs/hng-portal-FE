import LogoCarousel from '@/components/landing-page/carousel'
import HeroSection from '@/components/landing-page/hero/hero-section'
import Features from '@/components/landing-page/features/features';
import WhyChooseUs from '@/components/landing-page/why-choose-us/WhyChooseUs';
import HowItWorks from '@/components/landing-page/how-it-works/HowItWorks';
import CustomerReview from '@/components/landing-page/customer-review/customer-review';
import { FAQ } from '@/components/FAQ/faq';
export default function page() {
  return (
    <section className="min-h-screen bg-white">
      <HeroSection />
      <LogoCarousel />
      <Features />
      <WhyChooseUs/>
      <HowItWorks/>
      {/* LANDING PAGE CONT */}
      <CustomerReview />
      <FAQ />
    </section>
  );
}
