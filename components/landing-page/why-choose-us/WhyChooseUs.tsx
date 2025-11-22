import { Card, CardContent } from '@/components/ui/card';
import MobileLayout from './MobileLayout';
import DesktopLayout from './DesktopLayout';

const WhyChooseUs = () => {
  return (
    <section
<<<<<<< HEAD
      className="lg:flex item-center justify-center w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 relative"
=======
      className="w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 relative overflow-hidden"
>>>>>>> origin/dev
      style={{
        backgroundImage: "url('/images/why-choose-us-bgd_.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
<<<<<<< HEAD
      {/* Mobile Title - Centered */}
      <div className="text-center md:hidden mb-6">
        <h2 className="text-h1 text-primary-black">Why Choose Us?</h2>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-col gap-6">
        {/* First Row */}
        <div className="flex items-start gap-10">
          {/* Title */}
          <div className="w-[285px] shrink-0 flex items-start h-28">
            <h2 className="text-h2 text-primary-black font-normal leading-[150%]">
              Why
              <br /> Choose Us?
            </h2>
          </div>

          {/* 50K+ Card */}
          <Card className="shrink-0 w-[266px] rounded-[30px] border-none shadow-none bg-linear-to-b from-[rgba(143,218,253,0.15)] to-[rgba(0,174,255,0.15)]">
            <CardContent className="p-5 flex flex-col justify-center items-start gap-16">
              <div className="text-h2 text-primary-black font-normal">50K+</div>
              <p className="text-caption text-primary-black leading-[150%]">
                Talents trained through the HNG ecosystem
              </p>
            </CardContent>
          </Card>

          {/* 85% Card */}
          <Card className="shrink-0 w-[266px] rounded-[30px] shadow-none bg-transparent border-2 border-[#ECF0F3]">
            <CardContent className="p-5 flex flex-col justify-center items-start gap-16">
              <div className="text-h2 text-primary-black font-normal leading-[150%]">
                85<span className="text-gray-75">%</span>
              </div>
              <p className="text-caption text-primary-black leading-[150%]">
                Profiles contain verified internship work
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Second Row */}
        <div className="flex items-end gap-6">
          {/* Supporting Text */}
          <div className="shrink-0 w-[590px]">
            <p className="text-card-title text-primary-black font-normal leading-[150%] p-5">
              Empowering talents and recruiters with verified profiles,
              structured data, and a hiring experience built for real-world
              work.
            </p>
          </div>

          {/* 30% Card */}
          <Card className="shrink-0 w-[266px] rounded-[30px] border-none shadow-none bg-linear-to-b from-[rgba(143,218,253,0.15)] to-[rgba(0,174,255,0.15)]">
            <CardContent className="p-5 flex flex-col justify-center items-start gap-16">
              <div className="text-h2 text-primary-black font-normal leading-[150%]">
                30<span className="text-gray-75">%</span>
              </div>
              <p className="text-caption text-primary-black leading-[150%]">
                Faster hiring decisions by recruiters
              </p>
            </CardContent>
          </Card>

          {/* 15+ Card */}
          <Card className="shrink-0 w-[266px] rounded-[30px] shadow-none bg-transparent border-2 border-[#ECF0F3]">
            <CardContent className="p-5 flex flex-col justify-center items-start gap-16">
              <div className="text-h2 text-primary-black font-normal leading-[150%]">
                15<span className="text-gray-75">+</span>
              </div>
              <p className="text-caption text-primary-black leading-[150%]">
                Projects completed and showcased
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col gap-6">
        {/* Cards Grid with Stagger */}
        <div className="flex flex-col gap-4">
          {/* First Row - Left shifted */}
          <div className="flex gap-3 pr-8">
            {/* 50K+ Card */}
            <Card className="flex-1 rounded-[20px] border-none shadow-none bg-linear-to-b from-[rgba(143,218,253,0.15)] to-[rgba(0,174,255,0.15)]">
              <CardContent className="p-4 flex flex-col justify-center items-start gap-6 min-h-40">
                <div className="text-[40px] text-primary-black font-normal leading-[150%]">
                  50K+
                </div>
                <p className="text-overline text-primary-black leading-[150%]">
                  Talents trained through the HNG ecosystem
                </p>
              </CardContent>
            </Card>

            {/* 85% Card */}
            <Card className="flex-1 rounded-[20px] shadow-none bg-transparent border-2 border-[#ECF0F3]">
              <CardContent className="p-4 flex flex-col justify-center items-start gap-6 min-h-40">
                <div className="text-[40px] text-primary-black font-normal leading-[150%]">
                  85<span className="text-gray-75">%</span>
                </div>
                <p className="text-overline text-primary-black leading-[150%]">
                  Profiles contain verified internship work
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Second Row - Right shifted */}
          <div className="flex gap-3 pl-8">
            {/* 30% Card */}
            <Card className="flex-1 rounded-[20px] border-none shadow-none bg-linear-to-b from-[rgba(143,218,253,0.15)] to-[rgba(0,174,255,0.15)]">
              <CardContent className="p-4 flex flex-col justify-center items-start gap-6 min-h-40">
                <div className="text-[40px] text-primary-black font-normal leading-[150%]">
                  30<span className="text-gray-75">%</span>
                </div>
                <p className="text-overline text-primary-black leading-[150%]">
                  Faster hiring decisions by recruiters
                </p>
              </CardContent>
            </Card>

            {/* 15+ Card */}
            <Card className="flex-1 rounded-[20px] shadow-none bg-transparent border-2 border-[#ECF0F3]">
              <CardContent className="p-4 flex flex-col justify-center items-start gap-6 min-h-40">
                <div className="text-[40px] text-primary-black font-normal leading-[150%]">
                  15<span className="text-gray-75">+</span>
                </div>
                <p className="text-overline text-primary-black leading-[150%]">
                  Projects completed and showcased
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Supporting Text - Bottom on mobile */}
        <div className="mt-4">
          <p className="text-subtitle text-primary-black font-normal leading-[150%] text-center">
            Empowering talents and recruiters with verified profiles, structured
            data, and a hiring experience built for real-world work.
          </p>
        </div>
      </div>
=======
      <div className="text-center lg:hidden mb-8">
        <h2 className="text-primary-black font-medium text-4xl">
          Why Choose Us?
        </h2>
      </div>

      <MobileLayout />
      <DesktopLayout />
>>>>>>> origin/dev
    </section>
  );
};

export default WhyChooseUs;
