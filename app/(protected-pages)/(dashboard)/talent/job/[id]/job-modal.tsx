'use client';

import { Button } from '@/components/ui/button';
import { job } from '@/constants/constants';
import { Heart, ChevronLeft, ExpandIcon, Verified } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export const JobModal = () => {
  const searchParams = useSearchParams();
  const modalParam = searchParams.get('modal');
  const isModalOpen = modalParam === 'true';

  // the job params would come from the url then fetched using a custom hook
  // on small screen, the modal would become invible and the route would link to the job-details page instead
  const router = useRouter();

  if (!isModalOpen) return;
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
          <button className="flex items-center gap-1.5 cursor-pointer">
            <ExpandIcon className="w-3 h-3 bg-[#737373] text-white rounded-sm" />
            <p className="text-title">Open in a new window</p>
          </button>
        </div>

        {/* info */}
        <div className=" p-8 border-[0.5px] border-tertiary-75 rounded-xl space-y-5">
          <div className="flex items-center gap-3">
            {/* company logo */}
            <div className="relative w-14 h-14 img">
              <Image
                fill
                className="rounded-2xl"
                src={'/images/profile-test.webp'}
                alt={''}
              />
            </div>
            {/* jobe title & company */}
            <div className="">
              <h2 className="text-2xl font-bold text-tertiary-700">
                {job.title}
              </h2>
              <p className="text-xl font-semibold text-tertiary-700 flex items-center gap-1">
                {job.company}{' '}
                <Verified fill="#00AEFF" color="white" size={13} />
              </p>
            </div>
          </div>
          {/* description */}
          <p className="text-tertiary-200 text-base leading-relaxed">
            {job.description}
          </p>

          {/* Skills */}
          <ul className="flex justify-start flex-wrap gap-3 text-gray-600 font-light">
            {job.skills &&
              job.skills.map((item: string, index: number) => (
                <li
                  key={index}
                  className="border border-[#EAF0ED] text-sm py-1.5 px-3 p rounded-full"
                >
                  {item}
                </li>
              ))}
          </ul>

          {/* time posted - work-mode - job_level - freelance - lagos, nigeria */}
          <div className="other info text-sm text-tertiary-200">
            {/* time posted */}
            <span>Posted: {job.posted} - </span>
            {/* job type */}
            <span>{job.work_mode} - </span>
            {/* job - level */}
            <span>{job.level} - </span>
            {/* job - type */}
            <span>{job.job_type} - </span>
            {/* location */}
            <span>
              {job.state}, {job.country}
            </span>
          </div>

          {/* Salary */}
          <div className=" ">
            <p className="text-xl font-bold text-tertiary-500">
              {job.salary} per Month
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
