import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const statusBadgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      status: {
        Applied: 'border-transparent bg-blue-100 text-blue-800',
        Shortlisted: 'border-transparent bg-purple-100 text-purple-800',
        Interviewed: 'border-transparent bg-yellow-100 text-yellow-800',
        Hired: 'border-transparent bg-green-100 text-green-800',
        Rejected: 'border-transparent bg-red-100 text-red-800',
      },
    },
    defaultVariants: {
      status: 'Applied',
    },
  },
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  status: 'Applied' | 'Shortlisted' | 'Interviewed' | 'Hired' | 'Rejected';
}

function StatusBadge({ className, status, ...props }: StatusBadgeProps) {
  return (
    <div className={cn(statusBadgeVariants({ status }), className)} {...props}>
      {status}
    </div>
  );
}

export { StatusBadge, statusBadgeVariants };
