'use client';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

export default function LogoCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  );

  const logos = [
    'ebanqo.svg',
    'figma.svg',
    'i4g.svg',
    'neukleos.svg',
    'oracle.svg',
    'paystack.svg',
    'rapidriver.svg',
    'upperlink.svg',
  ];

  return (
    <div className="w-full py-12">
      <h2 className="text-center text-[10px] md:text-[24px] font-semibold mb-2 text-[#757575]">
        Trusted by Leading Brands and Startups
      </h2>

      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {logos.map((logo, index) => (
            <CarouselItem
              key={index}
              className="basis-1/3 sm:basis-1/4 md:basis-1/6 pl-2 justify-center items-center flex"
            >
              <Image
                src={`/assets/images/landing-page/hero-carousel/${logo}`}
                width={104}
                height={32}
                alt={`${logo} logo`}
              /> 
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
