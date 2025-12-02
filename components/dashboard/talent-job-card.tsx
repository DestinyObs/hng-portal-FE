'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TalentJob } from '@/types/job-card'; // Import RawJob
import { useRouter } from 'next/navigation'; // Import useRouter
import { usePathname } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveJob } from '@/api/actions/talent';
import { toast } from 'sonner';
import { APIResponse, SuccessResponse } from '@/types/api-response';
import PlaceholderProfile from '../dashboard/placeholder-profile';

interface TalentJobCardProps {
  job: TalentJob;
}

const TalentJobCard = ({ job }: TalentJobCardProps) => {
  const pathname = usePathname();
  const router = useRouter(); // Initialize useRouter
  const queryClient = useQueryClient();
  const companyName = job.company?.name || 'N/A';
  const jobLevel = job.job_levels?.name || 'N/A';
  const workMode = job.work_mode?.name || 'N/A';
  const jobType = job.job_type?.name || 'N/A';
  const location = [job.state?.name, job.country?.name]
    .filter(Boolean)
    .join(', ');

  const details = [workMode, jobLevel, jobType, location]
    .filter(Boolean)
    .join(' • ');

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
              src={effectiveLogoUrl!}
              alt={companyName}
              width={48}
              height={48}
              className="rounded-md"
            />
          ) : (
            <PlaceholderProfile
              name={companyName}
              size={48}
              className="font-[20px]"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            <p className="text-sm text-gray-600 flex items-center">
              {companyName}
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

      {/* Combined Details */}
      <p className="text-sm text-gray-700 mb-4">
        Posted: {job.created_at || 'N/A'}
        {details ? ` • ${details}` : ''}
      </p>

      {/* Description */}
      <p className="text-sm text-gray-700 line-clamp-3 mb-4">
        {job.description}
      </p>

      {/* View Job button */}
      <div className="flex justify-end mt-auto">
        <Button
          onClick={() => router.push(`${pathname}?modal=true&id=${job.id}`)}
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
