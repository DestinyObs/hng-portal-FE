'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { STEPS } from '@/lib/constants/constants';
import { useCarousel } from './useCarousel';
import { useEffect } from 'react';

export default function Carousel() {
  const { activePage, isPaused, setIsPaused, nextPage, setActivePage } = useCarousel();

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextPage, 3000);
    return () => clearInterval(interval);
  }, [isPaused, nextPage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-8"
    >
      <div
        className="relative h-[200px] sm:h-[300px] md:h-[400px] bg-white rounded-2xl overflow-hidden w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {STEPS.map((step, index) => (
          <Image
            key={index}
            src={step.imagePlaceholder}
            alt={step.title}
            fill
            className={`object-contain transition-opacity duration-500 ${
              index === activePage ? 'opacity-100' : 'opacity-0'
            }`}
            priority={index === 0}
          />
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {STEPS.map((_, index) => (
          <button
  key={index}
  onClick={() => setActivePage(index)}
  className={`h-1.5 rounded-full transition-all duration-300 ${
    index === activePage
      ? 'w-11 bg-primary-blue'
      : 'w-1.5 bg-[#C4C6C7]'
  }`}
  aria-label={`Go to step ${index + 1}`}
/>
        ))}
      </div>
    </motion.div>
  );
}