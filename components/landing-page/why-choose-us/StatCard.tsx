import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

type StatCardProps = {
  value: string;
  suffix?: string;
  description: string;
  variant: 'gradient' | 'bordered';
  className?: string;
};

const StatCard = ({
  value,
  suffix,
  description,
  variant,
  className,
}: StatCardProps) => {
  const isGradient = variant === 'gradient';

  return (
    <Card
      className={`
        ${
          isGradient
            ? 'bg-linear-to-b from-[rgba(143,218,253,0.15)] to-[rgba(0,174,255,0.15)] border-none shadow-none'
            : 'bg-transparent border-2 border-[#ECF0F3] shadow-none'
        }
        rounded-[20px] lg:rounded-[30px] ${className || ''}
      `}
    >
      <CardContent className="p-4 lg:p-5 flex flex-col justify-center items-start gap-6 lg:gap-16 min-h-40">
        <div className="text-5xl lg:text-6xl text-primary-black font-normal">
          {value}
          {suffix && <span className="text-gray-75">{suffix}</span>}
        </div>
        <p className="text-sm md:text-lg text-primary-black">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
