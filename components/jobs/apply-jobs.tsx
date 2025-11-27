'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import JobsPageBackIcon from '../icons/jobs-page-back-icon';
import FindJobsNewWindow from '../icons/find-jobs-new-window';
import Link from 'next/link';
import { RawJob2 } from '@/types/job-card'; // Import RawJob

interface ApplyJobsModalProps {
  job: RawJob2;
  onClose: () => void;
}

export default function ApplyJobs({ job, onClose }: ApplyJobsModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => setIsVisible(true));
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const companyName = job.company?.name || 'N/A';
  const jobType = job.job_type?.name || 'N/A';
  const workMode = job.work_mode?.name || 'N/A';
  const jobLevel = job.job_levels?.[0]?.name || 'N/A';
  const location =
    (job.states?.[0]?.name ? `${job.states[0].name}, ` : '') +
    (job.countries?.[0]?.name || 'N/A');

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className={`flex-1 bg-black/50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      <div
        className={`w-[664px] bg-(--color-white-50) shadow-2xl overflow-y-auto transition-transform duration-300 ease-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-20 flex items-center justify-between px-8 bg-(--color-white-50)">
          <button onClick={handleClose}>
            <JobsPageBackIcon className="w-6 h-6" />
          </button>

          <Link
            href={`/find-jobs/${job.id}`} // Using job.id for the link
            target="_blank"
            className="flex items-center gap-2 text-sm text-(--color-gray-100) hover:text-(--color-gray-300) transition no-underline"
          >
            <FindJobsNewWindow className="h-4 w-4" />
            <span>Open in a new window</span>
          </Link>
        </div>

        <div className="p-8">
          <div className="w-full min-h-[696px] bg-[(--color-white-50)] rounded-xl border border-[#9C9C9C] p-8 flex flex-col">
            <div className="flex items-start gap-5 mb-6">
              <div className="relative">
                {job.company?.logo_url ? (
                  <Image
                    src={job.company.logo_url}
                    alt={companyName}
                    width={64}
                    height={64}
                    className="rounded-xl shadow object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow">
                    <span className="text-2xl font-bold text-white">
                      {companyName.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h1 className="text-xl font-bold text-(--color-gray-500) leading-tight">
                  {job.title}
                </h1>
                <p className="text-base font-medium text-(--color-gray-300) mt-1 flex items-center gap-1">
                  {companyName}
                  {/* Assuming isVerified would come from job.company or similar */}
                  {job.company?.name && (
                    <span className="inline-flex items-center justify-center w-4 h-4 bg-(--color-primary-blue) rounded-full">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </p>
              </div>

              <button className="p-2 hover:bg-(--color-gray-50) rounded-lg transition">
                <Heart className="h-5 w-5 text-(--color-gray-100) hover:text-red-500 transition" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-sm text-(--color-gray-300) leading-relaxed">
                {job.description}
              </p>
            </div>

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

            <div className="mb-6">
              <p className="text-xs text-(--color-gray-100)">
                Posted: {job.created_at?.split('T')[0]} • {workMode} • {jobType}{' '}
                • {jobLevel} • {location}
              </p>
            </div>

            <div className="mb-8">
              <p className="text-2xl font-bold text-(--color-gray-500)">
                {job.salary ? `₦ ${job.salary}` : 'Salary not specified'} per
                Month
              </p>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-(--color-primary-blue) text-white font-semibold py-3.5 rounded-lg hover:bg-(--color-primary-100) transition text-sm">
                Start Application
              </button>

              <button className="w-full flex items-center justify-center gap-2 py-3.5 border border-[#00AEFF] rounded-lg font-medium hover:bg-(--color-gray-50) transition text-sm">
                <Heart className="h-4 w-4 text-(--color-primary-blue)" />
                <span className=" text-(--color-primary-blue)">Save job</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
