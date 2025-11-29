'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RawJob2 } from '@/types/job-card'; // Import RawJob
import { useRouter } from 'next/navigation'; // Import useRouter
import { useMutation, useQueryClient } from '@tanstack/react-query'; // Import useMutation and useQueryClient
import { saveJob } from '@/api/actions/talent';
import { toast } from 'sonner';
import { APIResponse } from '@/types/api-response';
import { SuccessResponse } from '@/types/api-response';
import PlaceholderProfile from './placeholder-profile';

interface TalentJobCardProps {
  job: RawJob2;
  // onViewJob: (jobId: string) => void; // Removed as per new instruction
}

const TalentJobCard = ({ job }: TalentJobCardProps) => {
  // Removed onViewJob from destructuring
  const router = useRouter(); // Initialize useRouter
  const queryClient = useQueryClient();
  const companyName = job.company?.name || 'N/A';
  const jobLevel = job.job_levels?.[0]?.name || 'N/A';
  const workMode = job.work_mode?.name || 'N/A';
  const jobType = job.job_type?.name || 'N/A';
  const location =
    (job.states?.[0]?.name ? `${job.states[0].name}, ` : '') +
    (job.countries?.[0]?.name || 'N/A');

  const effectiveLogoUrl =
    job.company?.logo_url &&
    !job.company.logo_url.includes('via.placeholder.com')
      ? job.company.logo_url
      : null;

  const { mutate: a_saveJob, isPending: isSaving } = useMutation({
    mutationKey: ['saveJob', job.id],
    mutationFn: () => saveJob(job.id),
    onSuccess: (response: APIResponse<SuccessResponse>) => {
      if (response.success) {
        toast.success(response.message || 'Job bookmark updated!');
        queryClient.invalidateQueries({ queryKey: ['savedJobs'] });
        queryClient.invalidateQueries({ queryKey: ['talentJobs'] });
      } else {
        toast.error(response.message || 'Failed to save job.');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'A network error occurred.');
    },
  });

  return (
    <div className="flex flex-col p-4 border border-gray-50 rounded-lg shadow-sm bg-white">
      {/* Top section: Logo, Title, Company, Heart */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {effectiveLogoUrl ? (
            <Image
              src={effectiveLogoUrl}
              alt={companyName}
              width={48}
              height={48}
              className="rounded-md"
            />
          ) : (
            <PlaceholderProfile name={companyName} size={48} fontSize="20px" />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            <p className="text-sm text-gray-600 flex items-center">
              {companyName}
              {/* Removed isVerified as it's not directly available in RawJob */}
            </p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            a_saveJob();
          }}
          disabled={isSaving}
          aria-label="Save job"
          className="p-2 rounded-lg transition hover:bg-gray-100"
        >
          <Heart
            size={20}
            className={`cursor-pointer transition ${
              job.is_saved
                ? 'text-gray-900 fill-gray-900'
                : 'text-gray-400 hover:text-gray-900'
            }`}
          />
        </button>
      </div>

      {/* Salary */}
      <p className="text-base font-bold text-gray-900 mb-2">
        {job.salary ? `₦ ${job.salary}` : 'Salary not specified'} per Month
      </p>

      <p className="text-sm text-gray-700 mb-3">
        {[workMode, jobLevel, jobType, location]
          .filter((item) => item !== 'N/A')
          .join(' • ')}
      </p>

      {/* Posted Date */}
      <p className="text-xs text-gray-500 mb-4">
        Posted:{' '}
        {job.created_at
          ? new Date(job.created_at).toLocaleDateString('en-GB')
          : 'N/A'}
      </p>

      {/* Description */}
      <p className="text-sm text-gray-700 line-clamp-3 mb-4">
        {job.description}
      </p>

      {/* View Job button */}
      <div className="flex justify-end mt-auto">
        <Button
          onClick={() => router.push(`/talent/job/${job.id}?modal=true`)}
          variant="outlineGray"
          className="w-auto"
        >
          View Job
        </Button>
      </div>
    </div>
  );
};

export default TalentJobCard;
