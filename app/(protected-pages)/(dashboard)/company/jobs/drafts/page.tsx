'use client';

import { useAuthStore } from '@/store/auth';
import { useGetAllJobs } from '@/hooks/jobs';

import Loading from '@/app/loading';
import JobCard from '@/components/dashboard/job-card';
import DashboardEmptyState from '@/components/dashboard/dashboard-empty-state';

import { JobCardProps } from '@/types/job-card';

export default function DraftsJobsPage() {
  const { user } = useAuthStore();
  const id = user?.company?.id;
  const { data: allJobs, isLoading } = useGetAllJobs<{ data: JobCardProps[] }>(
    id,
  );
  const jobs = allJobs?.data.filter(
    (job) => job.status?.toLowerCase() === 'draft',
  );
  console.log(allJobs?.data);

  return (
    <div>
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
