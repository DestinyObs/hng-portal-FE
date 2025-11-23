'use client';

import { STEPS } from '@/constants/constants';
import ServiceCard from './ServiceCard';
import { motion } from 'motion/react';
import { useCarousel } from './useCarousel';

export default function ServiceCards() {
  const { activePage } = useCarousel();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15, delayChildren: 0.5 },
        },
      }}
      className="flex flex-col md:flex-row gap-4 sm:gap-5 lg:gap-6 justify-center items-center md:items-stretch"
    >
      {STEPS.map((step, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full sm:w-[90%] md:w-auto md:flex-1 md:max-w-[379px]"
        >
          <ServiceCard
            number={step.number}
            title={step.title}
            description={step.description}
            icon={step.icon}
            forceHover={activePage === index}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
