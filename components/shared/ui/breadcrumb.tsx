'use client';
import Link from 'next/link';
import {
  Breadcrumb as BreadcrumbUI,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Breadcrumb({
  items,
}: {
  items: {
    name: string;
    link: string;
  }[];
}) {
  const pathname = usePathname();

  return (
    <BreadcrumbUI>
      <BreadcrumbList>
        {items &&
          items.map(({ link, name }, index) => (
            <div key={index}>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink className="font-roboto" asChild>
                  <Link
                    className={cn(
                      'text-primary-blue',
                      `${pathname === link && 'text-gray-500'}`,
                    )}
                    href={link}
                  >
                    {name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {items.length !== index + 1 && (
                <span className="text-gray-200">/</span>
              )}
            </div>
          ))}
      </BreadcrumbList>
    </BreadcrumbUI>
  );
}
