'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { view_applicant_details } from '@/api/actions/view-applicants';
import ApplicantHeader from './applicant-details/applicant-header';
import ApplicantContent from './applicant-details/applicant-content';
import ApplicantStatusPanel from './applicant-details/applicant-status-panel';

type Props = {
  company_id: string;
  job_id: string;
  applicant_id: string;
};

const SingleApplicantView = ({ company_id, job_id, applicant_id }: Props) => {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ['single_applicant_view', applicant_id],
    queryFn: () => view_applicant_details(company_id, job_id, applicant_id),
  });

  const applicant = data?.data ?? null;

  const renderStateScreen = (message: string, color: string) => (
    <div className="w-full min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <p className={`mb-4 ${color}`}>{message}</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-primary-300 text-white rounded-lg hover:bg-primary-400"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  if (isLoading)
    return renderStateScreen('Loading applicant details...', 'text-gray-600');
  if (error)
    return renderStateScreen('Error loading applicant', 'text-red-500');
  if (!applicant)
    return renderStateScreen('No applicant data found', 'text-gray-600');

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <ApplicantHeader applicant={applicant} onBack={() => router.back()} />

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <ApplicantContent applicant={applicant} />
        </div>

        {/* Status Panel */}
        <div className="lg:col-span-1">
          <ApplicantStatusPanel
            company_id={company_id}
            job_id={job_id}
            applicant_id={applicant_id}
            currentStatus={applicant.status}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleApplicantView;
