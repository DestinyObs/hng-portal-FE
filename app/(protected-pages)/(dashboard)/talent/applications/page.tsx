'use client';

import { useQuery } from '@tanstack/react-query';
import { getTalentApplications } from '@/api/actions/talent';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { TalentApplication } from '@/types/job-card';
import ApplicationCard from '@/components/applications/application-card';
import TalentDashboardEmptyState from '@/components/dashboard/talent-dashboard-empty-state';

export default function MyApplicationsPage() {
  const {
    data: applications,
    isLoading,
    isError,
    error,
  } = useQuery<TalentApplication[], Error>({
    queryKey: ['talentApplications'],
    queryFn: async () => {
      const response = await getTalentApplications();
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch applications');
      }
      return response.data || [];
    },
  });

  if (isError) {
    toast.error(error.message || 'Failed to fetch your applications.');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="h-10 w-10 animate-spin text-primary-blue" />
        </div>
      ) : applications && applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      ) : (
        <TalentDashboardEmptyState />
      )}
    </div>
  );
}
