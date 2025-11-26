'use client';
import ArrowRight from '@/public/assets/auth/icons/arrow-right';
import { Button } from '@/components/ui/button';
import React from 'react';

interface NavigationProps {
  rightButtonText?: string;
  rightButtonAction?: () => void;
}
export default function Navigation({
  rightButtonText,
  rightButtonAction,
}: NavigationProps) {
  return (
    <div className="w-full max-w-[1200px] mx-auto flex justify-between gap-4 items-center flex-col md:flex-row mt-5 md:mt-10 md:justify-end">
      <Button
        variant={'ghost'}
        onClick={rightButtonAction}
        className="font-medium text-base text-primary-300 transition-all duration-300 ease-in flex gap-1 justify-center"
      >
        <span>{rightButtonText}</span>
        <ArrowRight />
      </Button>
    </div>
  );
}
