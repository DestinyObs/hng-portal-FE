'use client';

import SideTab from './side-tab';

const OnboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-[90%] mx-auto overflow-hidden min-h-screen">
      <section className="w-full flex justify-center">
        <SideTab />
      </section>
      <section className="flex flex-col w-full min-h-screen items-center justify-center">
        {children}
      </section>
    </div>
  );
};
export default OnboardLayout;
