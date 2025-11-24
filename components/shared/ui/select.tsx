'use client';

import React, { ReactNode } from 'react';
import {
  Select as SelectUI,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../../ui/select';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const selectVariants = cva('w-full', {
  variants: {
    size: {
      sm: 'h-8 text-sm',
      md: 'h-10 text-base',
      lg: 'h-14 text-lg',
    },
    intent: {
      default: '',
      outline_grayHover: '',
    },
  },
  defaultVariants: {
    size: 'md',
    intent: 'default',
  },
});

export interface ReusableSelectProps
  extends React.ComponentProps<typeof SelectUI>,
    VariantProps<typeof selectVariants> {
  placeholder?: string;
  options: { label: string | ReactNode; value: string }[];
  className?: string;
  disabledOption?: string;
}

export const Select: React.FC<ReusableSelectProps> = ({
  placeholder = 'Select an option',
  options,
  size,
  intent,
  className,
  disabledOption,
  ...props
}) => {
  const isGrayHover = intent === 'outline_grayHover';

  return (
    <SelectUI {...props}>
      <SelectTrigger
        className={cn(selectVariants({ size, intent }), className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="text-black-500 border-0 w-full">
        {disabledOption && (
          <SelectItem
            key={disabledOption}
            value={disabledOption}
            disabled
            className="w-full p-2 opacity-50 select-none disabled:text-black-500"
          >
            <span>{disabledOption}</span>
          </SelectItem>
        )}

        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className={cn(
              'w-full p-2 rounded-md transition-colors duration-150',
              isGrayHover &&
                'hover:bg-gray-50 focus:bg-gray-50 hover:text-black-500 focus:text-text-black-500',
            )}
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectUI>
  );
};
