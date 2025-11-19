'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

type ServiceCardProps = {
  title: string;
  description: string;
  number: number;
};

const ServiceCard = ({ title, description, number }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const numberWidth = number === 1 ? 'w-[60px]' : 'w-[120px]';

  return (
    <Card
      className={`relative rounded-xl transition-all duration-500 ease-out w-full md:w-[379px] h-[260px]
        ${
          isHovered
            ? 'border-2 border-primary-75 shadow-xl bg-primary-50'
            : 'border-2 border-transparent bg-white-300/70'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative h-full w-full transition-transform duration-300 ${isHovered ? '-translate-y-1' : ''}`}>
        <div
          className={`absolute top-0 right-0 ${numberWidth} h-full flex items-center justify-end pr-4 text-[160px] font-bold text-[#E3E4E5] opacity-50 leading-none select-none pointer-events-none z-0`}
        >
          {number}
        </div>

        <CardContent className="relative z-10 p-6 flex flex-col justify-between h-full">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
              isHovered ? 'bg-primary-50' : 'bg-white-300/70'
            }`}
          >
            {number === 1 && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
                <path
                  d="M14 8.5C14 5.73858 11.7614 3.5 9 3.5C6.23858 3.5 4 5.73858 4 8.5C4 11.2614 6.23858 13.5 9 13.5C11.7614 13.5 14 11.2614 14 8.5Z"
                  stroke="#ACACAC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 20.5C16 16.634 12.866 13.5 9 13.5C5.13401 13.5 2 16.634 2 20.5"
                  stroke="#ACACAC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.6887 7.93395L21.0661 7.31132C20.651 6.89623 19.978 6.89623 19.5629 7.31131L16.4211 10.564C16.151 10.8437 16 11.2173 16 11.6061V13H17.3939C17.7827 13 18.1563 12.849 18.436 12.5789L21.6887 9.43711C22.1038 9.02202 22.1038 8.34903 21.6887 7.93395Z"
                  stroke="#ACACAC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {number === 2 && (
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className={`transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
                <rect width="60" height="60" rx="8" fill="transparent" />
                <path
                  d="M22.5124 37.4866C25.0249 39.8794 28.0159 38.9223 29.2123 37.9532C29.8313 37.4518 30.1096 37.1277 30.3488 36.8884C31.1863 36.1107 31.1325 35.3331 30.5881 34.711C30.3703 34.462 28.973 33.1198 27.633 31.7439C26.9391 31.0499 26.4605 30.5595 26.0514 30.1647C25.5034 29.6185 25.0249 28.9922 24.307 29.0101C23.649 29.0101 23.1705 29.5904 22.5723 30.1886C21.8841 30.8767 21.3759 31.7439 21.1964 32.5216C20.658 34.7947 21.4955 36.4098 22.5124 37.4866ZM22.5124 37.4866L20 39.999"
                  stroke="#ACACAC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M37.487 22.5156C34.9739 20.1216 31.9932 21.0968 30.7965 22.0663C30.1773 22.568 29.899 22.8922 29.6596 23.1316C28.8219 23.9097 28.8758 24.6877 29.4203 25.3101C29.4986 25.3997 29.7295 25.6306 30.0553 25.9537M37.487 22.5156C38.5043 23.5928 39.3531 25.2263 38.8145 27.5006C38.635 28.2786 38.1267 29.1462 37.4383 29.8347C36.84 30.4332 36.3613 31.0137 35.7031 31.0137C34.985 31.0317 34.6124 30.5124 34.0643 29.966M37.487 22.5156L40.0002 20.002M30.0553 25.9537C30.6358 26.5292 31.5178 27.397 32.3762 28.2786C33.0703 28.973 33.655 29.571 34.0643 29.966M30.0553 25.9537L28.5117 27.5069M34.0643 29.966L32.5027 31.4905"
                  stroke="#ACACAC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
            {number === 3 && (
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
              >
                <rect width="60" height="60" rx="8" fill="transparent" />
                <path
                  d="M25 29.2947C30.284 19.4466 36.8635 19.333 39.4928 20.5072C40.667 23.1365 40.5534 29.716 30.7053 35C30.6031 34.4129 30.0352 32.8749 28.5801 31.4199C27.1251 29.9648 25.5871 29.3969 25 29.2947Z"
                  stroke="#ACACAC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M32 34.8C34.0428 35.7334 34.2609 37.4069 34.5439 39C34.5439 39 38.8223 36.0481 36.0856 32"
                  stroke="#ACACAC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M25.2 28C24.2666 25.9572 22.5931 25.7391 21 25.4561C21 25.4561 23.9519 21.1777 28 23.9144"
                  stroke="#ACACAC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24.2086 32C23.5768 32.6319 22.5025 34.4644 23.2608 36.7392C25.5356 37.4975 27.3681 36.4233 28 35.7914"
                  stroke="#ACACAC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M36.0948 25.7535C36.0948 24.7333 35.2678 23.9062 34.2476 23.9062C33.2274 23.9062 32.4004 24.7333 32.4004 25.7535C32.4004 26.7737 33.2274 27.6007 34.2476 27.6007C35.2678 27.6007 36.0948 26.7737 36.0948 25.7535Z"
                  stroke="#ACACAC"
                  strokeWidth="1.5"
                />
              </svg>
            )}
          </div>

          <div className="flex flex-col">
            <h3 className="text-card-title font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-caption text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default function HowItWorks() {
  const [activePage, setActivePage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll carousel every 3 seconds
  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActivePage((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const steps = [
    {
      number: 1,
      title: 'Create Your Profile',
      description:
        'Set up your profile with your projects, skills, tools, and endorsements so recruiters can quickly understand your strengths.',
      imagePlaceholder: '/images/external-page-talent-1.png',
    },
    {
      number: 2,
      title: 'Match With Jobs or Talent',
      description:
        'Talents receive recommended roles based on their experience. Recruiters get a curated list of verified candidates.',
      imagePlaceholder: '/images/external-page-talent-1.png',
    },
    {
      number: 3,
      title: 'Connect & Start Hiring',
      description:
        'Message talents or recruiters directly inside the platform, manage applications, track interest, and move the hiring process forward without switching tools.',
      imagePlaceholder: '/images/external-page-talent-1.png',
    },
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12 max-w-[1440px]">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <Badge className="bg-white text-primary-blue px-4 py-2 rounded-full text-caption font-medium border border-primary-blue">
              How it Works
            </Badge>
          </div>
          <h2 className="text-h3 font-bold text-gray-900 mb-4">
            Simple Steps To Get You Moving Forward
          </h2>
          <p className="text-h5 text-gray-600 max-w-4xl mx-auto">
            A simple, transparent workflow that helps talents get discovered and
            recruiters hire with confidence
          </p>
        </div>

        <div
          className="mb-8 relative h-[200px] sm:h-[300px] md:h-[400px] bg-white rounded-2xl overflow-hidden w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {steps.map((step, index) => (
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

        <div className="flex justify-center mb-10">
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === activePage
                    ? 'w-11 bg-primary-blue'
                    : 'w-1.5 bg-[#C4C6C7]'
                }`}
                onClick={() => setActivePage(index)}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row gap-6 w-full md:w-[1186px] md:justify-center">
            {steps.map((step, index) => (
              <div key={index} className="w-full md:w-auto">
                <ServiceCard
                  number={step.number}
                  title={step.title}
                  description={step.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}