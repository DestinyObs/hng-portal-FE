import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { User } from './types';

export function formatTime(dateString: string | undefined): string {
  if (!dateString) {
    return 'Invalid date';
  }

  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return 'Just now';
  }
}

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

export const getEssentialUserData = (user: User) => {
  return {
    id: user.id,
    company_id: user.company?.id,
    firstname: user.firstname,
    lastname: user.lastname,
    current_role: user.current_role,
    roles: user.roles,
    email: user.email,
    // Add any other essential fields you need
  };
};
