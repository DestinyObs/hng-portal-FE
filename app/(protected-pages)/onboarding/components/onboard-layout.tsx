'use client';
import BackButton from './back-button';
import SideTab from './side-tab';

const OnboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-[90%] mx-auto overflow-hidden min-h-screen">
      <section className="w-full flex justify-center">
        <BackButton />
        <SideTab />
      </section>
      <section className="flex flex-col w-full max-w-[1440px] min-h-screen items-center justify-center">
        {children}
      </section>
    </div>
  );
};
export default OnboardLayout;
