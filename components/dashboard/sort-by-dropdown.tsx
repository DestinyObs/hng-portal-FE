'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

type SortByDropdownProps = {
  sortOrder: string;
  setSortOrder: (order: 'newest' | 'oldest') => void;
};

export function SortByDropdown({
  sortOrder,
  setSortOrder,
}: SortByDropdownProps) {
  return (
    <div className="flex flex-col items-end">
      <span className="text-xs text-gray-500">Sort by:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-1 -mr-2 -mt-1"
          >
            <span className="capitalize font-medium">
              {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setSortOrder('newest')}>
            Newest
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortOrder('oldest')}>
            Oldest
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
