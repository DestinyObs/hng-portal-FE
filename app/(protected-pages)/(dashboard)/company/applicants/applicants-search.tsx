'use client';

import { Search } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ApplicantsSearch({ value, onChange }: Props) {
  return (
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-tertiary-100" />
      <input
        type="text"
        placeholder="Search applicants..."
        className="w-full pl-10 pr-4 py-2 border border-tertiary-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-300 lg:w-96"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}