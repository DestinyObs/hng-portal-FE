import React from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
export default function SkillsBadge({
  skill,
  onRemove,
}: {
  skill: string;
  onRemove: () => void;
}) {
  return (
    <Badge
      variant="secondary"
      className="text-[#111827] text-xs py-1.5 px-2 rounded-full border border-[#EAF0ED] flex items-center bg-white gap-1 font-normal"
    >
      {skill}
      <button
        onClick={onRemove}
        className="text-[#92959C] hover:text-red-500 focus:outline-none ml-1 transition-colors duration-300 ease-in"
      >
        <X className="w-3 h-3" />
      </button>
    </Badge>
  );
}
