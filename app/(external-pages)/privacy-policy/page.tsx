'use client';
import { useEffect, useState } from 'react';
import PrivacyContent from './components/privacy-content';
import PrivacySidebar from './components/privacy-sidebar';
import { POLICY_DATA } from './components/constants';

function App() {
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setScrollTarget(id);
  };

  const clearScrollTarget = () => {
    setScrollTarget(null);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );

    POLICY_DATA.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen">
      <div className="flex flex-col gap-[18px] pt-10 items-center">
        <h1 className="text-5xl lg:text-7xl">Privacy Policy</h1>
        <p>Last Updated: 24/11/2025</p>
      </div>
      <div className="w-[90%] max-w-[1200px] flex mx-auto mt-[110px]">
        <PrivacySidebar onSelect={handleSelect} activeId={activeId} />
        <PrivacyContent
          scrollToSection={scrollTarget}
          onScrollComplete={clearScrollTarget}
          activeId={activeId}
        />
      </div>
    </div>
  );
}

export default App;
