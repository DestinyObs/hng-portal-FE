import Image from 'next/image';
import React from 'react';
export default function HeroImageContainer() {
  return (
    <div className="w-[85%] mx-auto max-w-[320px] md:max-w-[560px] not-md:mt-[64px]  relative">
      <Image
        src={
          '/assets/images/landing-page/hero-images/desktop/square_bracket.png'
        }
        alt="square bracket image"
        width={560}
        height={560}
        className="hidden md:block md:max-w-[400px] lg:min-w-[560px]"
      />
      <Image
        src={
          '/assets/images/landing-page/hero-images/mobile/square_bracket.png'
        }
        alt="square bracket image"
        width={318}
        height={259}
        className="md:hidden"
      />

      <Image
        src={'/assets/images/landing-page/hero-images/desktop/two_users.png'}
        alt="square bracket image"
        width={264}
        height={333}
        className="hidden md:block absolute -top-[34px] left-[58px] md:max-w-[200px] lg:min-w-[264px]"
      />
      <Image
        src={'/assets/images/landing-page/hero-images/mobile/two_users.png'}
        alt="smiling users looking at tablet"
        width={153}
        height={188}
        className="md:hidden absolute bottom-[108px] left-[35px]"
      />

      <Image
        src={'/assets/images/landing-page/hero-images/mobile/smiling_user.png'}
        alt="smiling user"
        width={116}
        height={82}
        className="md:hidden absolute bottom-[70px] right-[39px]"
      />
      <Image
        src={'/assets/images/landing-page/hero-images/desktop/smiling_user.png'}
        alt="smiling user"
        width={270}
        height={192}
        className="hidden md:block absolute bottom-[97px] right-[34px] lg:w-[270px] md:max-w-[200px] lg:min-w-[270px]"
      />

      <Image
        src={'/assets/images/landing-page/hero-images/desktop/check.svg'}
        alt="smiling user"
        width={230}
        height={106}
        className="hidden md:block absolute -top-8 right-[13px] not-lg:w-[150]"
      />
      <Image
        src={'/assets/images/landing-page/hero-images/desktop/check.svg'}
        alt="smiling user"
        width={230}
        height={106}
        className="hidden md:block absolute bottom-[43px] left-[49px] not-lg:w-[150]"
      />
      <Image
        src={'/assets/images/landing-page/hero-images/desktop/hired.svg'}
        alt="smiling user"
        width={98}
        height={74}
        className="hidden md:block absolute bottom-[241px] right-4"
      />
      <Image
        src={'/assets/images/landing-page/hero-images/desktop/post.svg'}
        alt="smiling user"
        width={188}
        height={71}
        className="hidden md:block absolute bottom-[230px] left-2"
      />
      <Image
        src={'/assets/images/landing-page/hero-images/desktop/check.svg'}
        alt="smiling user"
        width={123}
        height={55}
        className=" md:hidden absolute -top-6 right-[9px] not-lg:w-[150]"
      />
      <Image
        src={'/assets/images/landing-page/hero-images/desktop/check.svg'}
        alt="smiling user"
        width={123}
        height={55}
        className=" md:hidden absolute bottom-[7px] left-[34px] not-lg:w-[150]"
      />
      <Image
        src={'/assets/images/landing-page/hero-images/desktop/hired.svg'}
        alt="smiling user"
        width={53}
        height={42}
        className="md:hidden  absolute bottom-[84px] right-[11px]"
      />
      <Image
        src={'/assets/images/landing-page/hero-images/desktop/post.svg'}
        alt="smiling user"
        width={92}
        height={26}
        className="md:hidden  absolute bottom-[90px] left-1"
      />
    </div>
  );
}
