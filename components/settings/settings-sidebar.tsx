'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Card, CardContent } from '@/components/ui/card';

import { SETTINGS_SIDEBAR_LINKS } from '@/constants/settings';

export default function SettingsSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const activeLink =
    SETTINGS_SIDEBAR_LINKS.find((link) => link.href === pathname) ||
    SETTINGS_SIDEBAR_LINKS[0];

  const getLinkStyles = (path: string) => {
    const isActive = pathname === path;
    return isActive
      ? 'bg-[#E0F2FE] text-[#232323] border-l-4 border-[#00AEFF] font-bold'
      : 'text-[#5E5E5E] border-l-4 border-transparent hover:bg-gray-50 font-medium';
  };

  return (
    <div className="w-full lg:w-[288px] pt-6 px-4 lg:px-0">
      <div className="lg:hidden w-full relative z-50">
        <div className="flex justify-center w-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-[#1A1A1A] text-lg font-bold transition-opacity hover:opacity-80"
          >
            <span>{activeLink?.name}</span>
            <ChevronDown
              className={`w-5 h-5 text-[#1A1A1A] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white border border-[#E8E8E8] rounded-xl shadow-lg overflow-hidden py-2">
            {SETTINGS_SIDEBAR_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`w-full text-left block px-4 py-3 text-sm transition-colors ${
                  pathname === link.href
                    ? 'bg-[#E0F2FE] text-[#00AEFF] font-bold'
                    : 'text-[#5E5E5E] font-medium hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <Card className="hidden lg:block w-full bg-white shadow-sm border-none h-fit">
        <CardContent className="p-2">
          <div className="flex flex-col gap-2">
            {SETTINGS_SIDEBAR_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-r-lg transition-all ${getLinkStyles(link.href)}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
