'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import { useAuthStore } from '@/store/auth';
import Loading from '@/app/loading';
import { JobModal } from './talent/job/[id]/job-modal';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isSettingsPage = pathname?.startsWith('/settings');
  const isJobDetailsPage = pathname?.startsWith('/talent/job');
  const { user } = useAuthStore();

  if (!user) return <Loading />;

  return (
    <div className=" flex flex-col bg-white-100">
      {/* HEADER */}
      <Header />
      {/* SIDEBAR & MAIN CONTENT */}
      <div
        className={`flex flex-1 min-h-0 gap-6 ${isSettingsPage || isJobDetailsPage ? 'p-0' : 'p-8'}`}
      >
        {/* Sidebar */}
        {!isSettingsPage && !isJobDetailsPage && <Sidebar />}
        {/* Main content */}
        <main className="flex-1 h-full min-h-screen">{children}</main>
      </div>

      <JobModal />
    </div>
  );
};

export default DashboardLayout;
