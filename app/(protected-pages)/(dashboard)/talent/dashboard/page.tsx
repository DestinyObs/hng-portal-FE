'use client';
import { useAuthStore } from '@/store/auth';
import TalentJobCard from '@/components/dashboard/talent-job-card';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import { getTalentJobs, getSavedJobs } from '@/api/actions/talent'; // Import getTalentJobs and getSavedJobs
import { RawJob2 } from '@/types/job-card'; // Import RawJob
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react'; // Import Loader2
import { TALENT_DASHBOARD_CARDS } from '@/constants/dashboard'; // Import TALENT_DASHBOARD_CARDS
import DashboardCard from '@/components/dashboard/dashboard-card';

const TalentDashboardPage = () => {
  const { user } = useAuthStore();

  const {
    data: jobs,
    isLoading: isLoadingJobs,
    isError: isErrorJobs,
    error: errorJobs,
  } = useQuery<RawJob2[], Error>({
    // Explicitly type TData and TError
    queryKey: ['talentJobs'],
    queryFn: async () => {
      const response = await getTalentJobs();
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch jobs.');
      }
      return response.data || [];
    },
  });

  const {
    data: savedJobs,
    isError: isErrorSavedJobs,
    error: errorSavedJobs,
  } = useQuery<RawJob2[], Error>({
    // Explicitly type TData and TError
    queryKey: ['savedJobs'],
    queryFn: async () => {
      const response = await getSavedJobs();
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch saved jobs.');
      }
      return response.data || [];
    },
  });

  const savedJobsCount = savedJobs?.length || 0;

  if (isErrorJobs) {
    toast.error(errorJobs?.message || 'Failed to fetch jobs.');
  }
  if (isErrorSavedJobs) {
    toast.error(errorSavedJobs?.message || 'Failed to fetch saved jobs.');
  }

  // Use TALENT_DASHBOARD_CARDS and update the count for 'Save Jobs'
  const dashboardCards = TALENT_DASHBOARD_CARDS.map((card) => {
    if (card.title === 'Save Jobs') {
      return { ...card, count: savedJobsCount };
    }
    return card;
  });

  return (
    <>
      <div className="flex flex-col gap-8">
        {/* Welcome Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.firstname || 'Esther'}!
          </h1>
          <p className="text-gray-600">
            You&apos;re almost there. Complete your profile to unlock better job
            matches
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => {
            return (
              <DashboardCard
                key={index}
                card={{
                  title: card.title,
                  description: card.description,
                  icon: card.icon,
                  iconBg: card.iconBg,
                  count: card.count,
                  color: card.color,
                }}
              />
            );
          })}
        </div>

        {/* Recommended Jobs */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Recommended Jobs for You
          </h2>
          <Link href="/talent/job" className="text-sm text-black font-medium">
            View All Jobs
          </Link>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoadingJobs ? (
            <div className="col-span-full flex justify-center items-center h-48">
              <Loader2 className="h-10 w-10 animate-spin text-primary-blue" />
            </div>
          ) : (
            jobs?.map((job) => <TalentJobCard key={job.id} job={job} />)
          )}
        </div>
      </div>
    </>
  );
};
export default TalentDashboardPage;
