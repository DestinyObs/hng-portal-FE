'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import { useGetAllJobs } from '@/hooks/jobs';
import Loading from '@/app/loading';
import JobCard from '@/components/dashboard/job-card';
import DashboardCard from '@/components/dashboard/dashboard-card';
import DashboardEmptyState from '@/components/dashboard/dashboard-empty-state';
import { COMPANY_DASHBOARD_CARDS } from '@/constants/dashboard'; // Import COMPANY_DASHBOARD_CARDS
import { JobCardProps } from '@/types/job-card';
import DashboardSidebar from '@/components/dashboard/sidebar';
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import { getCompanyDashboardStats } from '@/api/actions/employer'; // Import getCompanyDashboardStats
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react'; // Import Loader2

import { CompanyDashboardStats } from '@/types/dashboard';
import { APIResponse } from '@/types/api-response';

export default function CompanyDashboardPage() {
  const { user } = useAuthStore();
  //extract current user id
  const id = user?.company?.id;

  // Check if user is returning or first-time
  const [isReturningUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const hasVisitedDashboard = localStorage.getItem(
        'hasVisitedCompanyDashboard',
      );
      if (!hasVisitedDashboard) {
        localStorage.setItem('hasVisitedCompanyDashboard', 'true');
        return false;
      }
      return true;
    }
    return false;
  });

  //Get all jobs
  const { data: allJobs, isLoading } = useGetAllJobs<{ data: JobCardProps[] }>(
    id,
  );
  const jobs = allJobs?.data;

  // Fetch company dashboard stats
  const {
    data: statsData,
    isLoading: isLoadingStats,
    isError: isErrorStats,
    error: statsError,
  } = useQuery<APIResponse<CompanyDashboardStats>, Error>({
    queryKey: ['companyDashboardStats', id],
    queryFn: () => getCompanyDashboardStats(id!),
    enabled: !!id, // Only run the query if id exists
  });

  if (isErrorStats) {
    toast.error(statsError?.message || 'Failed to load dashboard stats.');
  }

  // Prepare dashboard cards with fetched counts
  const dashboardCards = COMPANY_DASHBOARD_CARDS.map((card) => {
    let count = 0;
    if (statsData?.success) {
      if (card.title === 'Active Job Posting') {
        count = statsData.data?.active_jobs_count || 0;
      } else if (card.title === 'Total Applicants') {
        count = statsData.data?.total_applicants_count || 0;
      } else if (card.title === 'Hires Completed') {
        count = statsData.data?.hires_completed_count || 0;
      }
    }
    return { ...card, count };
  });

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-8 sm:gap-6">
        <div className="flex flex-col gap-1 items-center sm:items-start">
          <h1 className="text-[#232323] text-2xl font-bold leading-8">
            {isReturningUser ? 'Welcome back' : 'Welcome'},{' '}
            {user?.company?.name}
          </h1>
          <p className="text-base font-normal leading-6 text-[#5E5C5C]">
            Your hiring dashboard is ready. Complete your profile to attract
            stronger applicants.
          </p>
        </div>
        {/* Dashboard cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6 [&>*:last-child]:col-span-2 [&>*:last-child]:sm:col-span-1">
          {isLoadingStats ? (
            <div className="col-span-full flex justify-center items-center h-48">
              <Loader2 className="h-10 w-10 animate-spin text-primary-blue" />
            </div>
          ) : (
            dashboardCards.map((card, index) => (
              <DashboardCard key={index} card={card} />
            ))
          )}
        </div>
        <DashboardSidebar className="flex mb-5 lg:hidden" />
        <div className="flex items-center justify-between font-dm_sans">
          <span className="font-ag text-xl sm:text-2xl text-tertiary-200 font-bold leading-6 sm:leading-7">
            Active Jobs
          </span>
          <Link
            href="/company/jobs"
            className="text-base text-[#1A1A1A] font-normal leading-6 cursor-pointer"
          >
            View All Jobs
          </Link>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : jobs && jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/*  Job Listing cards */}
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <DashboardEmptyState />
      )}
    </div>
  );
}
