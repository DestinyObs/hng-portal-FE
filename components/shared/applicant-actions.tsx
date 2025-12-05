'use client';

import { useRouter } from 'next/navigation';

export default function ApplicantActions({
  company_id,
  job_id,
  applicant_id,
}: {
  company_id: string;
  job_id: string;
  applicant_id: string;
}) {
  const router = useRouter();

  return (
    <button
      onClick={() =>
        router.push(
          `/company/${company_id}/job/${job_id}/applicant/${applicant_id}`,
        )
      }
      className="text-primary-300 hover:text-primary-400 font-medium text-sm transition-colors"
    >
      View Details
    </button>
  );
}
