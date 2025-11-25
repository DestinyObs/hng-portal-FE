import { ReactNode } from 'react';
import Header from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" flex flex-col bg-white-100 relative">
      {/* HEADER */}
      <Header />
      {/* SIDEBAR & MAIN CONTENT */}
      <div className={`flex flex-1 min-h-0 gap-6 p-8`}>
        {/* Main content */}
        <main className="flex-1 h-full">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
