'use client';

import { faq } from '@/constants/landing-page';
import { Accordion } from '../../shared/ui/accordion';

export const FAQ = () => {
  return (
    <div className="py-12 pt-20 sm:pt-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
      {/* heading */}
      <div className="top text-center">
        <div className="first-text p-2 px-5 border border-primary-blue text-primary-blue inline-block rounded-full text-subtitle tracking-wide font-medium mb-4">
          FAQs
        </div>
        <h2 className="text-h3 font-bold text-gray-900 mb-4">
          Frequently <br /> Asked Questions
        </h2>

        <p className="short-note leading-normal mx-auto text-[#4E4A4A] text-[18px] mb-4">
          Here’s a quick guide to help talents and recruiters understand how HNG{' '}
          <br /> Connect works within the HNG ecosystem.
        </p>
      </div>

      {/* accordion */}
      <div className="accordion w-full sm:max-w-[75%] mx-auto py-8 px-3 sm:px-0">
        <Accordion content={faq} />
      </div>
    </div>
  );
};
