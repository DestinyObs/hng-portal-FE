'use client';

import Loading from '@/app/loading';
import PlaceholderProfile from '@/components/dashboard/placeholder-profile';
import { Button } from '@/components/ui/button';
import { formatNumbers } from '@/constants/constants';
import { useGetTalentJob } from '@/hooks/jobs';
import { JobDetailsResponse } from '@/types/talent-jobs';
import { Heart, ChevronLeft, ExpandIcon, Verified } from 'lucide-react';
import {  useRouter, useSearchParams } from 'next/navigation';

export const JobModal = () => {
  const searchParams = useSearchParams();
  const modalParam = searchParams.get('modal');
  const id = searchParams.get('id');
  const isModalOpen = modalParam === 'true';
  const { data: job, isPending } = useGetTalentJob<JobDetailsResponse>(
    id as string,
  );

  const router = useRouter();

  if (!isModalOpen) return;
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
          {/* route to the full job page */}
          <button
            onClick={() => router.push(`/talent/job/${id}`)}
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <ExpandIcon className="w-3 h-3 bg-[#737373] text-white rounded-sm" />
            <p className="text-title">Open in a new window</p>
          </button>
        </div>

        {/* info */}
        <div className=" p-8 border-[0.5px] border-tertiary-75 rounded-xl space-y-5">
          <div className="flex items-center gap-3">
            {/* company logo */}
            <div className="relative w-14 h-14 img">
              {/* {job?.company.logo_url ? (
                <Image
                  fill
                  className="rounded-2xl"
                  src={job?.company.logo_url}
                  alt={''}
                />
              ) : ( */}
                <PlaceholderProfile
                  radius={'16px'}
                  size={'100%'}
                  name={job?.company.name || ''}
                />
              {/* )} */}
            </div>
            {/* jobe title & company */}
            <div className="">
              <h2 className="text-2xl font-bold text-tertiary-700">
                {job?.title}
              </h2>
              <p className="text-xl font-semibold text-tertiary-700 flex items-center gap-1">
                {job?.company.name}{' '}
                <Verified fill="#00AEFF" color="white" size={13} />
              </p>
            </div>
          </div>
          {/* description */}
          <p className="text-tertiary-200 text-base leading-relaxed">
            {job?.description}
          </p>

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
            <span>{job?.job_type.name} - </span>
            {/* job - level */}
            <span>{job?.job_levels.name} - </span>
            <span>
              {job?.state.name}, {job?.country.name}
            </span>
          </div>

          {/* Salary */}
          <div className=" ">
            <p className="text-xl font-bold text-tertiary-500">
              ₦{formatNumbers(job?.salary || 0)} per Month
            </p>
          </div>

          {/* Actions */}
          <div className=" space-y-6 mt-4">
            <Button size={'xs'}>Start Application</Button>
            <Button size={'xs'} variant="outline">
              <Heart /> Save job
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
