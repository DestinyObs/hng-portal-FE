'use client';
import JobCard from '@/components/jobs/job-card';
import { Loader2 } from 'lucide-react'; // Import Loader2
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import { getSavedJobs } from '@/api/actions/talent'; // Import getSavedJobs
import { TalentJob } from '@/types/job-card'; // Import RawJob
import { toast } from 'sonner';

export default function SavedJobsPage() {
  const {
    data: jobsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['savedJobs'],
    queryFn: getSavedJobs,
  });

  const jobs: TalentJob[] = jobsData?.data || [];

  if (isError) {
    toast.error(error?.message || 'Failed to fetch saved jobs.');
  }

  return (
    <div className="min-h-screen bg-(--color-white-100)">
      <main className="mx-auto max-w-[1440px] px-6 py-8 md:px-12 lg:px-20 xl:px-32">
        <h1 className="text-3xl font-bold mb-8">Saved Jobs</h1>
        <div className="space-y-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center items-center h-48">
              <Loader2 className="h-10 w-10 animate-spin text-primary-blue" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              You have no saved jobs.
            </div>
          ) : (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          )}
        </div>
      </main>
    </div>
  );
}
