'use client';

import { useEffect, useState, useMemo } from 'react';
import { view_applicants_per_company } from '@/api/actions/view-applicants';
import { useAuthStore } from '@/store/auth';
import { JobApplicationItem } from '@/types/view-job-applicants';
import { Applicant } from '@/components/shared/applicants-column';

export function useApplicants() {
  const { user } = useAuthStore();
  const company_id = user?.company?.id;

  const [applicationsData, setApplicationsData] = useState<
    JobApplicationItem[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      if (!company_id) {
        console.log('❌ No company_id found');
        return;
      }

      console.log('🔍 Fetching applicants for company:', company_id);

      try {
        setIsLoading(true);
        setError(null);

        const response = await view_applicants_per_company(company_id);

        console.log('📦 API Response:', response);
        console.log('✅ Success:', response.success);
        console.log('📊 Data:', response.data);

        // FIX: The API returns paginated data in data.data, not data.applications
        if (response.success && response.data && response.data.data) {
          console.log('📝 Applications:', response.data.data);
          console.log('🔢 Applications count:', response.data.data.length);
          setApplicationsData(response.data.data);
        } else {
          console.log('❌ Failed to fetch applicants');
          setError('Failed to fetch applicants');
        }
      } catch (err) {
        console.error('❌ Caught error:', err);
        setError('An error occurred while fetching applicants');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, [company_id]);

  const transformedData: Applicant[] = useMemo(() => {
    // Add safety check here
    if (!applicationsData || !Array.isArray(applicationsData)) {
      console.log('⚠️ No applications data or not an array');
      return [];
    }

    console.log('🔄 Transforming', applicationsData.length, 'applications');

    return applicationsData.map((application) => ({
      id: application.id,
      name: `${application.user.firstname} ${application.user.lastname}`,
      email: application.user.email,
      applied_role: application.job?.title || 'N/A',
      status:
        application.status === 'pending'
          ? 'Applied'
          : application.status === 'shortlisted'
            ? 'Shortlisted'
            : application.status === 'hired'
              ? 'Hired'
              : application.status === 'interview'
                ? 'Interview'
                : application.status === 'in review'
                  ? 'In Review'
                  : 'Rejected',
      applied_date: new Date(application.date_added).toLocaleDateString(
        'en-US',
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        },
      ),
      job_id: application.job?.id || null,
      job: application.job ? { id: application.job.id } : null,
      user_id: application.user_id,
    }));
  }, [applicationsData]);

  console.log('📋 Final transformed data:', transformedData);

  return { data: transformedData, isLoading, error, company_id };
}
