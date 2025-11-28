'use client';

import MobileLayout from './MobileLayout';
import DesktopLayout from './DesktopLayout';
import { motion } from 'motion/react';

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
        <h2 className="text-primary-black font-medium text-4xl">
          Why Choose Us?
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <MobileLayout />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <DesktopLayout />
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;
