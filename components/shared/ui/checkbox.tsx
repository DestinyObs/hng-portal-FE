'use client';
import { Checkbox as CheckboxUI } from '@/components/ui/checkbox';

export function Checkbox({ ...props }) {
  return (
    <CheckboxUI
      {...props}
      id="terms"
      className="data-[state=checked]:border-none data-[state=checked]:bg-primary-blue data-[state=checked]:text-white rounded-none"
    />
  );
}
