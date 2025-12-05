'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

import { DasbhoardNavLinkProps } from '@/types/dashboard';
import { usePathname, useRouter } from 'next/navigation';

export default function DashboardNav({
  tabs,
}: {
  tabs: DasbhoardNavLinkProps[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  const activeView = tabs.find((tab) => pathname.includes(tab.value));
  const [activeTab, setActiveTab] = useState<DasbhoardNavLinkProps>(activeView || tabs[0]);

  //on change tab
  const onTabChange = (tab: DasbhoardNavLinkProps) => {
    setActiveTab(tab);
    router.push(`/company/jobs/${tab.value}`);
  };

  return (
    <div className="flex items-center justify-start gap-8">
      {tabs?.map((tab, index) => {
        const isActive = activeTab.value === tab.value;

        return (
          <button
            key={index}
            onClick={() => onTabChange(tab)}
            className={cn(
              `text-xl`,
              isActive ? 'font-semibold text-primary-300' : 'text-black-200',
            )}
          >
            {tab.title}
          </button>
        );
      })}
    </div>
  );
}
