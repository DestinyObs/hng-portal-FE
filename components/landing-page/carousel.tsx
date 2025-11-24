import Image from 'next/image';

export default function LogoCarousel() {
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
      <div className="mx-auto w-full max-w-[1440px] flex overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center justify-center gap-[34px] md:gap-[72px] animate-scroll pr-[72px]">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="shrink-0 w-20 h-10 sm:w-[100px] sm:h-[50px] md:w-[104px] md:h-[52px] relative flex items-center justify-center"
            >
              <Image
                src={`/assets/images/landing-page/hero-carousel/${logo}`}
                fill
                className="object-contain"
                alt={`${logo} logo`}
              />
            </div>
          ))}
        </div>
        <div
          aria-hidden
          className="flex items-center justify-center gap-[34px] md:gap-[72px] animate-scroll pr-[72px]"
        >
          {logos.map((logo, index) => (
            <div
              key={index}
              className="shrink-0 w-20 h-10 sm:w-[100px] sm:h-[50px] md:w-[104px] md:h-[52px] relative flex items-center justify-center"
            >
              <Image
                src={`/assets/images/landing-page/hero-carousel/${logo}`}
                fill
                className="object-contain"
                alt={`${logo} logo`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
