import { ReactNode } from 'react';
import Header from '@/components/dashboard/header';
import { JobModal } from './job-modal';

const DashboardLayout = ({
  children,
  searchParams,
}: {
  children: ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div className=" flex flex-col bg-white-100 relative">
      {/* HEADER */}
      <Header />
      {/* SIDEBAR & MAIN CONTENT */}
      {/* <div className={`flex flex-1 min-h-0 gap-6 p-8`}> */}
      {/* Main content */}
      <main className="flex-1 h-full py-8">{children}</main>
      <JobModal />
    </div>
  );
};

export default DashboardLayout;
