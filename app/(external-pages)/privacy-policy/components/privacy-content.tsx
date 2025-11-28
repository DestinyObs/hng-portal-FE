'use client';
import { useRef, useEffect } from 'react';
import { POLICY_DATA } from './constants';

interface PrivacyContentProps {
  scrollToSection: string | null;
  onScrollComplete: () => void;
  activeId: string | null;
}

export default function PrivacyContent({
  scrollToSection,
  onScrollComplete,
}: PrivacyContentProps) {
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (scrollToSection && refs.current[scrollToSection]) {
      const target = refs.current[scrollToSection];
      const rect = target?.getBoundingClientRect();

      if (rect) {
        const yPosition = rect.top + window.scrollY - 100; // keep section close to top
        window.scrollTo({
          top: yPosition < 0 ? 0 : yPosition,
          behavior: 'smooth',
        });
      } else {
        refs.current[scrollToSection]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }

      const timer = setTimeout(() => {
        onScrollComplete();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [scrollToSection, onScrollComplete]);

  return (
    <div className="flex-1 px-6 text-white pb-24">
      <div className="lg:w-[740px]">
        <div className="space-y-12">
          {POLICY_DATA.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              ref={(el) => {
                refs.current[section.id] = el;
              }}
              className="scroll-mt-24"
            >
              <h2 className="text-xl font-semibold mb-4">
                {index + 1}. {section.title}
              </h2>
              <p className="text-white/70 leading-relaxed font-normal text-[15px]">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
