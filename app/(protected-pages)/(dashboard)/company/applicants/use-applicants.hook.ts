'use client';

import { useEffect, useState, useMemo } from 'react';
import { view_applicants_per_company } from '@/api/actions/view-applicants';
import { useAuthStore } from '@/store/auth';
import { JobApplicationItem } from '@/types/view-job-applicants';
import { Applicant } from '@/components/shared/applicants-column';

export function useApplicants() {
  const { user } = useAuthStore();
  const company_id = user?.company?.id;

  const [applicationsData, setApplicationsData] = useState<JobApplicationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      if (!company_id) return;

      try {
        setIsLoading(true);
        setError(null);

        const response = await view_applicants_per_company(company_id);

        if (response.success && response.data) {
          setApplicationsData(response.data.applications);
        } else {
          setError('Failed to fetch applicants');
        }
      } catch (err) {
        console.error('Caught error:', err);
        setError('An error occurred while fetching applicants');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, [company_id]);

  const transformedData: Applicant[] = useMemo(() => {
    return applicationsData.map((application) => ({
      id: application.id,
      name: `${application.user.firstname} ${application.user.lastname}`,
      email: application.user.email,
      applied_role: application.job?.title || 'N/A',
      status:
        application.status === 'pending'
          ? 'Applied'
          : application.status === 'approved'
            ? 'Shortlisted'
            : 'Rejected',
      applied_date: new Date(application.date_added).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      job_id: application.job?.id || null,
      job: application.job || null,
    }));
  }, [applicationsData]);

  return { data: transformedData, isLoading, error, company_id };
}