'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';

const NEXT_ARTICLES = [
  {
    image: '/images/Frame 2147228491.png',
    title: 'Understanding the Right Talent For The Jobs',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod.',
  },
  {
    image: '/images/Frame 2147228492.png',
    title: 'Tech in 2025: A Saturated Space or No?',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod.',
  },
  {
    image: '/images/Frame 2147228493.png',
    title: 'Understanding the Right Talent For The Jobs',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod.',
  },
  {
    image: '/images/Frame 2147228494.png',
    title: 'Tech in 2025: A Saturated Space or No?',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod.',
  },
  {
    image: '/images/Frame 2147228495.png',
    title: 'Understanding the Right Talent For The Jobs',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod.',
  },
];

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const cardWidth = 384;
  const gap = 24;
  const cardsPerView = 3;

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (currentIndex < NEXT_ARTICLES.length - cardsPerView) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const scrollAmount = index * (cardWidth + gap);
      scrollContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: 'BricolageGrotesque';
          src:
            url('/fonts/BricolageGrotesque-Regular.woff2') format('woff2'),
            url('/fonts/BricolageGrotesque-Regular.woff') format('woff');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'BricolageGrotesque';
          src:
            url('/fonts/BricolageGrotesque-Bold.woff2') format('woff2'),
            url('/fonts/BricolageGrotesque-Bold.woff') format('woff');
          font-weight: 700;
          font-style: bold;
          font-display: swap;
        }

        .bricolage {
          font-family:
            'BricolageGrotesque',
            system-ui,
            -apple-system,
            'Segoe UI',
            Roboto,
            'Helvetica Neue',
            Arial;
        }

        /* Hide scrollbar */
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <main className="bricolage px-10">
        <div className="max-w-[1200px] mx-auto">
          <section className="mt-10 max-w-[1120px] mx-auto">
            <div
              className="p-6 rounded-lg"
              style={{ backgroundColor: 'rgba(230, 247, 255, 0.3)' }}
            >
              <div className="w-full overflow-hidden rounded-md mb-10">
                <Image
                  src="/images/Frame 2147228485.png"
                  alt="Ultimate guide featured"
                  width={1120}
                  height={465}
                  className="w-full h-auto"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div className="mb-10">
                <h2 className="text-[20px] font-semibold leading-[26px] mb-4">
                  Lorem Ipsum
                </h2>
                <p className="text-[15px] leading-[22px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  posuere, sapien quis tincidunt efficitur, orci urna volutpat
                  arcu, id fermentum justo risus a sapien. Sed non velit nec
                  nibh pulvinar porta. Integer interdum nunc eu ultricies
                  faucibus. Pellentesque habitant morbi tristique senectus et
                  netus et malesuada fames ac turpis egestas. Vivamus lacinia
                  odio vitae vestibulum vestibulum. Cras porttitor imperdiet
                  nunc, at ultricies tellus laoreet et.
                </p>

                <p className="mt-4 text-[15px] leading-[22px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  suscipit, augue nec cursus posuere, ipsum nibh aliquet urna,
                  non bibendum neque mi ut lacus. Vestibulum ante ipsum primis
                  in faucibus orci luctus et ultrices posuere cubilia curae. Sed
                  aliquam, nulla quis bibendum auctor, nisi elit consequat
                  ipsum, nec sagittis sem nibh id elit.
                </p>
              </div>

              <div>
                <h2 className="text-[20px] font-semibold leading-[26px] mb-4">
                  Lorem Ipsum
                </h2>
                <p className="text-[15px] leading-[22px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  posuere, sapien quis tincidunt efficitur, orci urna volutpat
                  arcu, id fermentum justo risus a sapien. Sed non velit nec
                  nibh pulvinar porta. Integer interdum nunc eu ultricies
                  faucibus. Pellentesque habitant morbi tristique senectus et
                  netus et malesuada fames ac turpis egestas. Vivamus lacinia
                  odio vitae vestibulum vestibulum. Cras porttitor imperdiet
                  nunc, at ultricies tellus laoreet et.
                </p>

                <p className="mt-4 text-[15px] leading-[22px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  suscipit, augue nec cursus posuere, ipsum nibh aliquet urna,
                  non bibendum neque mi ut lacus. Vestibulum ante ipsum primis
                  in faucibus orci luctus et ultrices posuere cubilia curae. Sed
                  aliquam, nulla quis bibendum auctor, nisi elit consequat
                  ipsum, nec sagittis sem nibh id elit.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-10 max-w-[1200px] mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[16px] font-semibold">
                Read Our Next Article
              </h2>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Previous"
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentIndex >= NEXT_ARTICLES.length - cardsPerView}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Next"
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Cards Container */}
            <div className="overflow-hidden">
              <div
                ref={scrollContainerRef}
                className="hide-scrollbar overflow-x-hidden"
              >
                <div className="flex gap-6" style={{ width: 'max-content' }}>
                  {NEXT_ARTICLES.map((article, idx) => (
                    <article
                      key={idx}
                      className="shrink-0 bg-white rounded-lg shadow-sm overflow-hidden"
                      style={{ width: 384, height: 389 }}
                    >
                      <div className="relative w-full h-[292px]">
                        <Image
                          src={article.image}
                          alt={article.title}
                          width={384}
                          height={292}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-3 flex flex-col gap-2 h-[97px]">
                        <h3 className="text-[14px] font-bold leading-[18px] line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-[13px] leading-[18px] text-gray-600 line-clamp-2 flex-1">
                          {article.description}
                        </p>
                        <a
                          href="#"
                          className="text-[12px] text-[#0ea5a4] hover:underline mt-1"
                        >
                          See more
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
