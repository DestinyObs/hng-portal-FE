'use client';

import React, { useState, cloneElement, isValidElement } from 'react';

type ServiceCardProps = {
  title: string;
  description: string;
  number: number;
  icon: React.ReactNode;
  forceHover?: boolean;
};

const ServiceCard = ({
  title,
  description,
  number,
  icon,
  forceHover = false,
}: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = forceHover || isHovered;

  const iconColor = isActive ? '#00AEFF' : '#ACACAC';
  const bigNumberColor = isActive ? '#A6D7EB80' : '#E3E4E5';

  const cleanIcon = isValidElement(icon)
    ? cloneElement(icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, {
        fill: 'none',
        stroke: iconColor,
        strokeWidth: 1.5,
        style: { fill: 'none', stroke: iconColor },
        className: 'w-full h-full stroke-current',
      })
    : icon;

  return (
    <div
      className={`relative rounded-xl transition-all duration-500 ease-out w-full max-w-[379px] mx-auto
        ${isActive ? 'border-2 border-primary-75 shadow-xl bg-primary-50' : 'border-2 border-transparent bg-[#F3F4F4B2]'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative h-full w-full transition-transform duration-300 ${isActive ? 'md:-translate-y-1' : ''}`}>
        
        <div
          className="absolute top-0 right-0 w-[120px] h-full flex items-center justify-end pr-2 sm:pr-4 text-[80px] sm:text-[120px] lg:text-[160px] font-bold opacity-50 leading-none select-none pointer-events-none z-0"
          style={{ color: bigNumberColor }}
        >
          {number}
        </div>

        <div className="relative z-10 p-4 sm:p-5 lg:p-6 flex flex-col justify-between min-h-[220px] sm:min-h-60 lg:min-h-[260px]">
          <div className={`w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${isActive ? 'bg-primary-50' : 'bg-[#EEEEEE]'}`}>
            <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
              <div className="scale-75 sm:scale-90 lg:scale-100">
                {cleanIcon}
              </div>
            </div>
          </div>

          <div className="flex flex-col overflow-hidden mt-4">
            <h3 className="text-lg sm:text-xl lg:text-card-title font-semibold text-gray-900 mb-1.5 sm:mb-2">
              {title}
            </h3>
            <p className="text-xs sm:text-sm lg:text-caption text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;