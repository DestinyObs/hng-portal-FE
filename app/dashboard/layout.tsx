import Sidebar from '@/components/dashboard/sidebar';
import Header from '@/components/dashboard/header';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen overflow-hidden flex flex-col bg-white-100">
      {/* HEADER */}
      <Header />

      {/* SIDEBAR & MAIN CONTENT */}
      <div className="flex flex-1 min-h-0 p-8 gap-8">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 h-full overflow-y-scroll">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
