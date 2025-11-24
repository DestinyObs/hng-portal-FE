'use client';
import Sidebar from '@/components/dashboard/sidebar';
import Header from '@/components/dashboard/header';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isSettingsPage = pathname?.startsWith('/dashboard/settings');
  return (
    <div className="h-screen overflow-hidden flex flex-col bg-white-100">
      {/* HEADER */}
      <Header />
      {/* SIDEBAR & MAIN CONTENT */}
      <div
        className={`flex flex-1 min-h-0 gap-6 ${isSettingsPage ? 'p-0' : 'p-6'}`}
      >
        {/* Sidebar */}
        {!isSettingsPage && <Sidebar />}
        {/* Main content */}
        <main className="flex-1 h-full overflow-y-scroll">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
