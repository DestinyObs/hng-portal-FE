'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { DasbhoardNavLinkProps } from '@/types/dashboard';

export default function DashboardNav({ navLinks }: DasbhoardNavLinkProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-start gap-8">
      {navLinks.map((link, index) => {
        const activePath = pathname?.includes(link.href.toLowerCase());

        return (
          <nav
            key={index}
            className={cn(
              `text-xl`,
              activePath ? 'font-semibold text-primary-300' : 'text-black-200',
            )}
          >
            <Link href={`/company/jobs/${link.href}`}>{link.title}</Link>
          </nav>
        );
      })}
    </div>
  );
}
