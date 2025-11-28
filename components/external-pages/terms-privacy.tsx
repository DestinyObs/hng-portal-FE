'use client';

import { TermsAndPrivacyProps } from '@/types/terms-privacy';
import { useState } from 'react';

export default function TermsOfServiceAndPrivacy({
  defaultActiveSection,
  lastUpdate,
  sectionContent,
  sectionsTab,
  title,
}: TermsAndPrivacyProps) {
  const [activeSection, setActiveSection] = useState(defaultActiveSection);

  return (
    <div className="bg-black text-white lg:px-17 scroll-smooth">
      <header className="lg:mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            {title}
          </h1>
          <p className="text-center text-base mt-2 text-[#d7d6d6]">
            {lastUpdate}
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:pb-44">
        <div className="flex flex-col md:flex-row gap-8">
          <nav className="lg:w-88  ">
            <div className="lg:sticky border-l-2 border-l-primary-blue lg:top-8">
              <ul className="space-y-1">
                {sectionsTab.map((section) => (
                  <li key={section.id} className="group">
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 group-first:pt-0 group-last:pb-0 py-2 text-base transition-colors lg:px-8  cursor-pointer  ${
                        activeSection === section.id
                          ? 'text-white '
                          : 'hover:text-white text-[#9C9C9C]'
                      }`}
                    >
                      <a href={section.id}>{section.label}</a>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <main className="flex-1 max-w-3xl lg:pr-24">
            <div className="space-y-12">
              {sectionContent.map((section) => {
                const { id, title, subtitle, sectionId } = section;
                return (
                  <section key={id} id={sectionId} className="scroll-mt-8">
                    <h2 className="pl-2 text-2xl font-semibold mb-1">
                      {id}. {title}
                    </h2>
                    <p className="text-[#9C9C9C] leading-relaxed">{subtitle}</p>
                  </section>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
