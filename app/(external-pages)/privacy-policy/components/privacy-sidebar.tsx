// app/privacy/components/PrivacySidebar.tsx

'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { POLICY_DATA } from './constants';

export default function PrivacySidebar({
  onSelect,
  activeId,
}: {
  onSelect: (id: string) => void;
  activeId: string | null;
}) {
  return (
    <aside className="hidden md:block  lg:w-[400px] h-screen sticky top-0 bg-[#0d0d0d]">
      <ScrollArea className="h-full p-4 border-l-2 border-primary-300">
        <nav className="space-y-2">
          {POLICY_DATA.map((section, index) => (
            <button
              key={section.id}
              onClick={() => onSelect(section.id)}
              className={`block w-full text-left px-3 py-2 text-base rounded transition
    ${
      activeId === section.id
        ? 'bg-white/10 text-white font-medium '
        : 'text-white/70 hover:bg-white/10'
    }
  `}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
