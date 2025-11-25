'use client';
import Link from 'next/link';
import JobCard from '@/components/dashboard/job-card';
import EmptyState from '@/components/dashboard/empty-state';
import DashboardCard from '@/components/dashboard/dashboard-card';
import { DASHBOARD_CARD, JOB_CARDS } from '@/constants/dashboard';
import { useAuthStore } from '@/store/auth';
import { useGetAllJobs } from '@/hooks/jobs';
import { Loader2 } from 'lucide-react';

export default function CompanyDashboardPage() {
  const { user } = useAuthStore();
  const id = user?.company?.id;
  // console.log(user?.company);
  const { data: allJobs, isLoading } = useGetAllJobs(id);
  // console.log(allJobs);
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-8 sm:gap-6">
        <div className="flex flex-col gap-1 items-center sm:items-start">
          <h1 className="text-[#232323] text-2xl font-bold leading-8">
            Welcome back, {user?.company?.name}
          </h1>
          <p className="text-base font-normal leading-6 text-[#5E5C5C]">
            Your hiring dashboard is ready. Complete your profile to attract
            stronger applicants.
          </p>
        </div>
        {/* Dashboard cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6 [&>*:last-child]:col-span-2 [&>*:last-child]:sm:col-span-1">
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
      {isLoading ? (
        <Loader2 className="h-12 w-12 animate-spin text-primary-blue" />
      ) : allJobs && allJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/*  Job Listing cards */}
          {allJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
