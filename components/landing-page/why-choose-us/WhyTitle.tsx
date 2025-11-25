import React from 'react';

const WhyTitle = () => (
  <>
    {/* Mobile + Tablet */}
    <div className="text-center lg:hidden mb-8">
      <h2 className="text-primary-black font-medium text-4xl">
        Why Choose Us?
      </h2>
    </div>

    {/* Desktop */}
    <div className="hidden lg:block w-[285px] shrink-0 h-28">
      <h2 className="font-medium text-4xl text-primary-black">
        Why
        <br /> Choose Us?
      </h2>
    </div>
  </>
);

export default WhyTitle;
