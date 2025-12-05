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
import React from 'react';

export const JobModal = () => {
  const searchParams = useSearchParams();
  const modalParam = searchParams.get('modal');
  const id = searchParams.get('id');
  const isModalOpen = modalParam === 'true';
  const { data: jobResponse, isPending } = useGetTalentJob<JobDetailsResponse>(
    id as string,
  );
  const job = jobResponse?.data;
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isSaved, setIsSaved] = React.useState(job?.is_saved || false);

  const { mutate: a_saveJob, isPending: isSaving } = useMutation({
    mutationKey: ['saveJob', job?.id],
    mutationFn: () => saveJob(job!.id),
    onMutate: () => {
      // Optimistic update
      setIsSaved((prev) => !prev);
    },
    onSuccess: (response: APIResponse<SuccessResponse>) => {
      if (response.success) {
        toast.success('Job saved successfully!');
        queryClient.invalidateQueries({ queryKey: ['savedJobs'] });
        queryClient.invalidateQueries({ queryKey: ['talentJobs'] });
      } else {
        toast.error(response.message || 'Failed to save job.');
        setIsSaved(job?.is_saved || false); // revert on failure
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'A network error occurred.');
      setIsSaved(job?.is_saved || false); // revert on error
    },
  });

  React.useEffect(() => {
    setIsSaved(job?.is_saved || false); // sync with query data when loaded
  }, [job?.is_saved]);

  if (!isModalOpen) return null;
  if (isPending) return <Loading />;

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
          <button
            onClick={() => router.push(`/talent/job/${id}`)}
            className="flex items-center gap-1.5 cursor-pointer hover:text-tertiary-75"
          >
            <ExpandIcon className="w-3 h-3 bg-[#737373] text-white rounded-sm" />
            <p className="text-title">Open in a new window</p>
          </button>
        </div>

        {/* Info */}
        <div className="p-8 border-[0.5px] border-tertiary-75 rounded-xl space-y-5 overflow-x-hidden">
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 img">
              {job?.company?.logo_url ? (
                <Image
                  fill
                  className="rounded-2xl"
                  src={job.company.logo_url}
                  alt={job.company.name || ''}
                />
              ) : (
                <PlaceholderProfile
                  radius={'16px'}
                  size={'100%'}
                  className="text-[25px]"
                  name={job?.company?.name || ''}
                />
              )}
            </div>
            <div>
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

          {/* Description */}
          <div className="text-tertiary-200 text-base leading-relaxed">
            <ReactMarkdown>{job?.description}</ReactMarkdown>
          </div>

          {/* Skills */}
          <ul className="flex justify-start flex-wrap gap-3 text-gray-600 font-light">
            {job?.skills?.map((item) => (
              <li
                className="border border-[#EAF0ED] text-sm py-1.5 px-3 p rounded-full"
                key={item.id}
              >
                {item.name}
              </li>
            ))}
          </ul>

          {/* Time & Job Info */}
          <div className="text-sm text-tertiary-200">
            <span>Posted: {job?.created_at} - </span>
            <span>{job?.job_type?.name} - </span>
            <span>{job?.job_levels?.name} - </span>
            <span>
              {job?.state?.name}, {job?.country?.name}
            </span>
          </div>

          {/* Salary */}
          <p className="text-xl font-bold text-tertiary-500">
            ₦{formatNumbers(job?.salary || 0)} per Month
          </p>

          {/* Actions */}
          <div className="space-y-6 mt-4">
            <Button
              onClick={() => router.push(`/talent/job/${id}/apply`)}
              disabled={job?.is_applied}
              size={'xs'}
            >
              {job?.is_applied ? 'Already Applied' : 'Start Application'}
            </Button>

            <Button
              size={'xs'}
              variant="outline"
              onClick={() => a_saveJob()}
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              <Heart
                size={16}
                fill={isSaved ? '#00AEFF' : 'none'}
                color={isSaved ? '#00AEFF' : '#00AEFF'}
              />
              {isSaved ? 'Saved' : 'Save job'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
