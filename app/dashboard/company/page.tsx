import Link from 'next/link';

import JobCard from '../_components/job-card';
import EmptyState from '../_components/empty-state';
import DashboardCard from '../_components/dashboard-card';
import { DASHBOARD_CARD, JOB_CARDS } from '@/constants/dashboard';

export default function CompanyDashboardPage() {
  const job = true;

  return (
    <>
      <div className="flex flex-col gap-8 sm:gap-6">
        <div className="flex flex-col gap-1 items-center sm:items-start">
          <h1 className="text-[#232323] text-2xl font-bold leading-8">
            Welcome back, Nexo Labs!
          </h1>
          <p className="text-base font-normal leading-6 text-[#5E5C5C]">
            Your hiring dashboard is ready. Complete your profile to attract
            stronger applicants.
          </p>
        </div>
        {/* Dashboard cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 [&>*:last-child]:col-span-2 [&>*:last-child]:md:col-span-1">
          {DASHBOARD_CARD.map((card, index) => (
            <DashboardCard key={index} card={card} />
          ))}
        </div>
        <div className="flex items-center justify-between font-dm_sans">
          <span className="font-ag text-xl sm:text-2xl text-tertiary-200 font-bold leading-6 sm:leading-7">
            Active Jobs
          </span>
          <Link
            href="#"
            className="text-base text-[#1A1A1A] font-normal leading-6"
          >
            View All Jobs
          </Link>
        </div>
      </div>
      {job ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 md:space-y-6 gap-4 sm:gap-6">
          {/*  Job Listing cards */}
          {JOB_CARDS.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      )}
    </>
  );
}
