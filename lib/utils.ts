import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const stats = [
  {
    title: '10 Views',
    description: 'On your last posted job',
  },
  {
    title: '200 Applications',
    description: 'Received this month',
  },
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPageNumbers(
  current: number,
  total: number,
): (number | string)[] {
  const range: (number | string)[] = [];

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 4) {
    range.push(1, 2, 3, 4, 5, '...', total);
  } else if (current >= total - 3) {
    range.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
  } else {
    range.push(1, '...', current - 1, current, current + 1, '...', total);
  }

  return range;
}
