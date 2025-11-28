'use client';

import { motion } from 'motion/react';
import StatCard from './StatCard';
import WhyDescription from './WhyDescription';

const DesktopLayout = () => (
  <div className="hidden lg:block max-w-7xl mx-auto">
    <div className="flex flex-col gap-6">
      {/* Top row */}
      <div className="flex items-start gap-10">
        <motion.h2
          className="font-medium text-4xl text-primary-black w-[285px] shrink-0 leading-tight"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why
          <br />
          Choose Us?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <StatCard
            value="50K+"
            description="Talents trained through the HNG ecosystem"
            variant="gradient"
            className="w-[266px] shrink-0"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <StatCard
            value="85"
            suffix="%"
            description="Profiles contain verified internship work"
            variant="bordered"
            className="w-[266px] shrink-0"
          />
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="flex items-end justify-between">
        <motion.div
          className="max-w-lg p-5"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <WhyDescription />
        </motion.div>

        <div className="flex gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <StatCard
              value="30"
              suffix="%"
              description="Faster hiring decisions by recruiters"
              variant="gradient"
              className="w-[266px] shrink-0"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <StatCard
              value="15"
              suffix="+"
              description="Projects completed and showcased"
              variant="bordered"
              className="w-[266px] shrink-0"
            />
          </motion.div>
        </div>
      </div>
    </div>
  </div>
);

export default DesktopLayout;
