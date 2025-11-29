'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

import { DasbhoardNavLinkProps } from '@/types/dashboard';

export default function DashboardNav({
  tabs,
}: {
  tabs: DasbhoardNavLinkProps[];
}) {
  const [activeTab, setActiveTab] = useState<DasbhoardNavLinkProps>(tabs[0]);

  //on change tab
  const onTabChange = (tab: DasbhoardNavLinkProps) => {
    setActiveTab(tab);
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
