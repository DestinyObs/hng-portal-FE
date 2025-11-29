'use client';

import Loading from '@/app/loading';
import PlaceholderProfile from '@/components/dashboard/placeholder-profile';
import { Button } from '@/components/ui/button';
import { formatNumbers } from '@/constants/constants';
import { useGetTalentJob } from '@/hooks/jobs';
import { JobDetailsResponse } from '@/types/talent-jobs';
import { Heart, ChevronLeft, ExpandIcon, Verified } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveJob } from '@/api/actions/talent';
import { toast } from 'sonner';
import { APIResponse, SuccessResponse } from '@/types/api-response';

export const JobModal = () => {
  const searchParams = useSearchParams();
  const modalParam = searchParams.get('modal');
  const id = searchParams.get('id');
  const isModalOpen = modalParam === 'true';
  const { data: jobResponse, isPending } = useGetTalentJob<JobDetailsResponse>(
    id as string,
  );
  const job = jobResponse?.data; // Access the data property
  const queryClient = useQueryClient();

  const { mutate: a_saveJob, isPending: isSaving } = useMutation({
    mutationKey: ['saveJob', job?.id],
    mutationFn: () => saveJob(job!.id),
    onSuccess: (response: APIResponse<SuccessResponse>) => {
      if (response.success) {
        toast.success('Job saved successfully!');
        queryClient.invalidateQueries({ queryKey: ['savedJobs'] }); // Invalidate saved jobs query to refetch
      } else {
        toast.error(response.message || 'Failed to save job.');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'A network error occurred.');
    },
  });

  const router = useRouter();

  if (!isModalOpen) return;
  if (isPending) return <Loading />;
  console.log(job);

  return (
    <div className="fixed inset-0 z-50 sm:flex items-center justify-end bg-tertiary-500/60">
      <div className="bg-white w-full max-w-[664px] overflow-y-auto h-screen p-6 py-12 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start pr-5">
          <button
            onClick={() => router.back()}
            className="p-[1.5px] cursor-pointer border border-black-500 rounded-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {/* route to the full job page */}
          <button
            onClick={() => router.push(`/talent/job/${id}`)}
            className="flex items-center gap-1.5 cursor-pointer hover:text-tertiary-75"
          >
            <ExpandIcon className="w-3 h-3 bg-[#737373] text-white rounded-sm" />
            <p className="text-title">Open in a new window</p>
          </button>
        </div>

        {/* info */}
        <div className=" p-8 border-[0.5px] border-tertiary-75 rounded-xl space-y-5 overflow-x-hidden">
          <div className="flex items-center gap-3">
            {/* company logo */}
            <div className="relative w-14 h-14 img">
              {job?.company?.logo_url ? ( // Add optional chaining
                <Image
                  fill
                  className="rounded-2xl"
                  src={job?.company?.logo_url} // Add optional chaining
                  alt={''}
                />
              ) : (
                <PlaceholderProfile
                  radius={'16px'}
                  size={'100%'}
                  fontSize={25}
                  name={job?.company.name || ''}
                />
              )}
            </div>
            {/* jobe title & company */}
            <div className="">
              <h2 className="text-2xl font-bold text-tertiary-700">
                {job?.title}
              </h2>
              <p className="text-xl font-semibold text-tertiary-700 flex items-center gap-1">
                {job?.company.name}{' '}
                {job?.company?.is_verified === 1 && (
                  <Verified fill="#00AEFF" color="white" size={13} />
                )}
              </p>
            </div>
          </div>
          {/* description */}
          <div className="text-tertiary-200 text-base leading-relaxed">
            <ReactMarkdown>{job?.description}</ReactMarkdown>
          </div>

          {/* Skills */}
          <ul className="flex justify-start flex-wrap gap-3 text-gray-600 font-light">
            {job?.skills &&
              job.skills.map((item) => (
                <li
                  className="border border-[#EAF0ED] text-sm py-1.5 px-3 p rounded-full"
                  key={item.id}
                >
                  {item.name}
                </li>
              ))}
          </ul>

          {/* time posted - work-mode - job_level - freelance - lagos, nigeria */}
          <div className="other info text-sm text-tertiary-200">
            {/* time posted */}
            <span>Posted: {job?.created_at} - </span>
            {/* job type */}
            <span>{job?.job_type?.name} - </span> {/* Add optional chaining */}
            {/* job - level */}
            <span>{job?.job_levels?.name} - </span>{' '}
            {/* Add optional chaining */}
            <span>
              {job?.state?.name}, {job?.country?.name}
            </span>{' '}
            {/* Add optional chaining */}
          </div>

          {/* Salary */}
          <div className=" ">
            <p className="text-xl font-bold text-tertiary-500">
              ₦{formatNumbers(job?.salary || 0)} per Month
            </p>
          </div>

          {/* Actions */}
          <div className=" space-y-6 mt-4">
            <Button
              onClick={() => router.push(`/talent/job/${id}/apply`)}
              disabled={job?.is_applied}
              size={'xs'}
            >
              Start Application
            </Button>
            <Button size={'xs'} variant="outline">
              <Heart /> Save job
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
