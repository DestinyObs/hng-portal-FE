import Sidebar from '@/components/dashboard/sidebar';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen overflow-hidden flex flex-col bg-white-100">
      {/* HEADER */}
      <header className="bg-white h-16 flex items-center px-6"></header>

      {/* SIDEBAR & MAIN CONTENT */}
      <div className="flex flex-1 min-h-0 p-6 gap-8">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 h-full overflow-y-scroll">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
