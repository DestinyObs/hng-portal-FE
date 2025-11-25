import { cn } from '@/lib/utils';
import { Dot } from 'lucide-react';

type DataStatusProps = {
  status: string;
};

export const DataStatus = ({ status }: DataStatusProps) => {
  const statusStyles: Record<string, string> = {
    verified: 'text-success-dark bg-success-light',
    hired: 'text-success-dark bg-success-light',
    unverified: 'text-error-500 bg-[#FD000047]',
    interview: 'text-[#0369A1] bg-[#E0F2FE]',
    'in review': 'text-[#854D0E] bg-[#FEF9C3]',
    shortlisted: 'text-[#3730A3] bg-[#E0E7FF]',
    rejected: 'text-[#991B1B] bg-[#FEE2E2]',
    default: 'text-[var(--color-inactive-dark)] bg-[#a1a1aa77]',
  };

  const appliedStyle =
    statusStyles[status.toLowerCase()] || statusStyles.default;

  return (
    <div
      className={cn(
        'inline-flex items-center justify-start pr-2 font-medium py-0.5 text-[12px] rounded-full capitalize',
        appliedStyle,
      )}
    >
      <Dot className="w-7 h-7" />
      <span>{status}</span>
    </div>
  );
};
