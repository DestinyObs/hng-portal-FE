'use client';

import { useQuery } from '@tanstack/react-query';
import { getTalentApplications } from '@/api/actions/talent';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { TalentApplication } from '@/types/job-card';
import ApplicationCard from '@/components/applications/application-card';

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

  console.log('Applications Data:', applications); // Added console log

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
        <div className="text-center py-12 px-6 border-2 border-dashed rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">
            No Applications Yet
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            You have not applied for any jobs yet. When you do, they will appear
            here.
          </p>
        </div>
      )}
    </div>
  );
}
