import { cn } from '@/lib/utils';
import { Dot } from 'lucide-react';

type DataStatusProps = {
  status: string;
};

export const DataStatus = ({ status }: DataStatusProps) => {
  const statusStyles: Record<string, string> = {
    verified: 'text-success-dark bg-success-light',
    Hired: 'text-success-dark bg-success-light',
    unverified: 'text-error-500 bg-[#FD000047]',
    Interview: 'text-[#0369A1] bg-[#E0F2FE]',
    'In Review': 'text-[#854D0E] bg-[#FEF9C3]',
    Shortlisted: 'text-[#3730A3] bg-[#E0E7FF]',
    default: 'text-[var(--color-inactive-dark)] bg-[#a1a1aa77]',
  };

  const appliedStyle = statusStyles[status] || statusStyles.default;

  return (
    <div
      className={cn(
        'inline-flex items-center justify-start px-1.5 py-0.5 text-[12px] rounded-full capitalize',
        appliedStyle,
      )}
    >
      <Dot className="mr-1 w-4 h-4" />
      <span>{status}</span>
    </div>
  );
};
