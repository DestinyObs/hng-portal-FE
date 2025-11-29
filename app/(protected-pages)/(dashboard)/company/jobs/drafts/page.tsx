'use client';

import { useAuthStore } from '@/store/auth';
import { useGetAllJobs } from '@/hooks/jobs';

import Loading from '@/app/loading';
import JobCard from '@/components/dashboard/job-card';
import DashboardNav from '@/components/dashboard/dashoard-nav';
import DashboardEmptyState from '@/components/dashboard/dashboard-empty-state';

import { companyDashboardNavLinks } from '@/constants/dashboard';
import { JobCardProps } from '@/types/job-card';

export default function DraftsJobsPage() {
  const { user } = useAuthStore();
  const id = user?.company?.id;
  // console.log(user?.company);
  const { data: allJobs, isLoading } = useGetAllJobs<{ data: JobCardProps[] }>(
    id,
  );
  // console.log(allJobs);
  const jobs = allJobs?.data;

  return (
    <div>
      <DashboardNav tabs={companyDashboardNavLinks} />
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
