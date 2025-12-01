import Image from 'next/image';
import { Heart } from 'lucide-react';
import { RawJob2 } from '@/types/job-card'; // Import RawJob
import { useRouter } from 'next/navigation'; // Import useRouter
import { useMutation, useQueryClient } from '@tanstack/react-query'; // Import useMutation and useQueryClient
import { saveJob } from '@/api/actions/talent';
import { toast } from 'sonner';
import { APIResponse } from '@/types/api-response';
import { SuccessResponse } from '@/types/api-response';
import PlaceholderProfile from '../dashboard/placeholder-profile';

export interface JobCardProps {
  job: RawJob2;
  // onViewJob: (jobId: string) => void; // Removed as per new instruction
}

export default function JobCard({ job }: JobCardProps) {
  // Removed onViewJob from destructuring
  const router = useRouter(); // Initialize useRouter
  const queryClient = useQueryClient();
  const companyName = job.company?.name || 'N/A';
  const jobType = job.job_type?.name || 'N/A';
  const workMode = job.work_mode?.name || 'N/A';
  const jobLevel = job.job_levels?.name || 'N/A'; // Corrected access to job_levels
  const location = [job.state?.name, job.country?.name]
    .filter(Boolean)
    .join(', ');

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
        // Invalidate both queries to refetch jobs and update saved status everywhere
        queryClient.invalidateQueries({ queryKey: ['savedJobs'] });
        queryClient.invalidateQueries({ queryKey: ['talentFindJobs'] });
      } else {
        toast.error(response.message || 'Failed to save job.');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'A network error occurred.');
    },
  });

  return (
    <article
      onClick={() => router.push(`/talent/job/${job.id}?modal=true`)}
      className="w-full rounded-xl border border-[#9C9C9C] bg-(--color-white-50) p-8 hover:border-(--color-primary-blue) hover:shadow-md cursor-pointer transition"
    >
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          {effectiveLogoUrl ? (
            <Image
              src={effectiveLogoUrl!}
              alt={companyName}
              width={56}
              height={56}
              className="rounded-xl object-cover"
            />
          ) : (
            <PlaceholderProfile name={companyName} size={56} fontSize="24px" />
          )}

          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-(--color-gray-500) leading-none">
              {job.title}
            </h3>
            <p className="text-(--color-gray-100) text-sm font-medium leading-none">
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
            className={`h-6 w-6 transition ${
              job.is_saved
                ? 'text-gray-900 fill-gray-900'
                : 'text-gray-400 hover:text-gray-900'
            }`}
          />
        </button>
      </div>

      <p className="mb-6 text-(--color-gray-100) text-sm leading-relaxed">
        {job.description}
      </p>

      <div className="mb-6 flex flex-wrap gap-3">
        {job.skills && job.skills.length > 0 ? (
          job.skills.map((skill) => (
            <span
              key={skill.id}
              className="inline-block px-4 py-2 text-xs font-medium text-(--color-gray-300) bg-white border border-[#9C9C9C] rounded-[36px]"
            >
              {skill.name}
            </span>
          ))
        ) : (
          <span className="inline-block px-4 py-2 text-xs font-medium text-(--color-gray-300) bg-white border border-[#9C9C9C] rounded-[36px]">
            No skills specified
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm text-(--color-gray-100)">
          Posted: {job.created_at || 'N/A'} • {workMode} • {jobType} •{' '}
          {jobLevel} • {location}
        </div>
        <div className="text-2xl font-bold text-(--color-gray-500)">
          {job.salary ? `₦ ${job.salary}` : 'Salary not specified'} per Month
        </div>
      </div>
    </article>
  );
}
