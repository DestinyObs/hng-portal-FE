'use client';

import WaitlistForm from './waitlist-form';

const WaitlistSection = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative bg-white overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 max-w-[1440px] mx-auto w-full md:px-8 lg:px-0">
          <WaitlistForm className="lg:ml-24" />

          <div
            className="w-full flex h-72 md:h-[460px] py-12 md:py-[154px] pr-6 justify-start min-[1200px]:justify-end items-center rounded-2xl lg:rounded-l-2xl lg:rounded-r-none px-5 lg:px-0 lg:w-[45%] mx-auto lg:mx-0 overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #00AEFF 0%, #E5F7FF 100%)',
            }}
          >
            <video
              // height={574}
              className="rounded-xl shadow-lg w-full h-[460px]"
              controls
              // width="100%"
            >
              <source src="/video/hng-ad.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* <video
              src="/images/individual-dashboard.png"
              width={518}
              height={574}
              className="rounded-xl md:rounded-l-xl md:rounded-r-none shadow-lg object-cover w-full h-[420px]"
            /> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WaitlistSection;
