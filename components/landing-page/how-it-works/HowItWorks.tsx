'use client';

import { motion } from 'motion/react';
import Header from './Header';
import Carousel from './Carousel';
import ServiceCards from './ServiceCards';

export default function HowItWorks() {
  return (
    <section className="w-full py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1440px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Header />
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="my-8"
        >
          <Carousel />
        </motion.div>

        {/* Service Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ServiceCards />
        </motion.div>
      </div>
    </section>
  );
}
