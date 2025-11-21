import React from 'react';
import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';

const WhyChooseUs = () => {
  return (
    <section
      className="w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/why-choose-us-bgd_.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-center lg:hidden mb-8">
        <h2 className="text-primary-black font-medium text-4xl">Why Choose Us?</h2>
      </div>

      <MobileLayout />
      <DesktopLayout />
    </section>
  );
};

export default WhyChooseUs;