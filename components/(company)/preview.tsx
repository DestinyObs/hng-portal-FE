'use client';

import Image from 'next/image';
import { Dot } from 'lucide-react';
import { DM_Sans } from 'next/font/google';
import { Job } from '@/types/job-card';
import PlaceholderProfile from '../dashboard/placeholder-profile';
const dm_sans = DM_Sans({ subsets: ['latin'], variable: '--font-dm_sans' });

export const PreviewJob = ({ postDetails }: { postDetails: Job }) => {
  return (
    <div className=" bg-white rounded-lg space-y-6">
      {/* Job Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-tertiary-50 pb-4">
        <div className="flex flex-col gap-2">
          {/* company-logo */}
          <div className="relative w-28 h-28 img">
            {postDetails?.companyLogo ? (
              <Image
                src={postDetails?.companyLogo}
                alt="profile"
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <PlaceholderProfile
                radius={'50%'}
                size={'100%'}
                name={postDetails.company}
              />
            )}
          </div>
          <h2 className="text-[32px] font-bold text-gray-800 ">
            {postDetails?.title}
          </h2>
          <p className="text-sec-dark-gray font-semibold text-[24px]">
            {postDetails?.company}
          </p>
          <div
            className={`text-[14px] capitalize text-black-200 font-['var(--font-dm_sans)'] flex ${dm_sans.className}`}
          >
            {/* work-mode */}
            <span>{postDetails?.work_mode}</span>
            <Dot />
            <span>{postDetails?.level ?? postDetails?.job_type}</span>
            <Dot />
            {/* location */}
            <span>
              {postDetails?.state}, {postDetails?.country}
            </span>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className={`space-y-2 ${dm_sans.className}`}>
        <h3 className="text-xl font-semibold text-tertiary-500 ">
          Job Description
        </h3>
        <p className="text-tertiary-200 text-[16px] wrap-anywhere">
          {postDetails?.description}
        </p>
      </div>

      {/* Skills and Expertise */}
      <div className="space-y-2 py-4 pb-5 border-y border-y-tertiary-50">
        <h3 className="text-xl font-medium text-tertiary-500 ">
          Skills and Expertise
        </h3>
        <ul className="flex justify-start flex-wrap gap-3 text-gray-600">
          {postDetails?.skills &&
            postDetails?.skills.map((item: string, index: number) => (
              <li
                key={index}
                className="border border-[#EAF0ED] py-1.5 px-3 p rounded-full"
              >
                {item}
              </li>
            ))}
        </ul>
      </div>

      {/* Acceptance Criteria */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-tertiary-500">
          Acceptance Criteria
        </h3>
        <div className="list-disc list-inside text-tertiary-200 space-y-1 text-[16px] ${dm_sans.className} wrap-anywhere">
          {postDetails?.acceptance_criteria}
        </div>
      </div>
    </div>
  );
};
