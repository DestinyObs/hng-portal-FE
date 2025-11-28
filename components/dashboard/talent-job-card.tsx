'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RawJob2 } from '@/types/job-card'; // Import RawJob
import { useRouter } from 'next/navigation'; // Import useRouter
import { usePathname } from "next/navigation";

interface TalentJobCardProps {
  job: RawJob2;
  // onViewJob: (jobId: string) => void; // Removed as per new instruction
}

const TalentJobCard = ({ job }: TalentJobCardProps) => {

const pathname = usePathname();
  // Removed onViewJob from destructuring
  const router = useRouter(); // Initialize useRouter
  const companyName = job.company?.name || 'N/A';
  const jobLevel = job.job_levels?.[0]?.name || 'N/A';
  const workMode = job.work_mode?.name || 'N/A';
  const jobType = job.job_type?.name || 'N/A';
  const location =
    (job.states?.[0]?.name ? `${job.states[0].name}, ` : '') +
    (job.countries?.[0]?.name || 'N/A');

  const shouldRenderImage =
    job.company?.logo_url &&
    !job.company.logo_url.includes('via.placeholder.com');

  return (
    <div className="flex flex-col p-4 border border-gray-50 rounded-lg shadow-sm bg-white">
      {/* Top section: Logo, Title, Company, Heart */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {shouldRenderImage && (
            <Image
              src={job.company!.logo_url!}
              alt={companyName}
              width={48}
              height={48}
              className="rounded-md"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            <p className="text-sm text-gray-600 flex items-center">
              {companyName}
              {/* Removed isVerified as it's not directly available in RawJob */}
            </p>
          </div>
        </div>
        <Heart
          size={20}
          className="text-gray-400 hover:text-red-500 cursor-pointer"
        />
      </div>

      {/* Salary */}
      <p className="text-base font-bold text-gray-900 mb-2">
        {job.salary ? `₦ ${job.salary}` : 'Salary not specified'} per Month
      </p>

      {/* Tags (Skills and other job details) */}
      <div className="flex flex-wrap gap-2 mb-3">
        {job.skills &&
          job.skills.length > 0 &&
          job.skills.map((skill) => (
            <span
              key={skill.id}
              className="px-3 py-1 bg-white rounded-full text-xs text-gray-700"
            >
              {skill.name}
            </span>
          ))}
        {workMode !== 'N/A' && (
          <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-700">
            {workMode}
          </span>
        )}
        {jobType !== 'N/A' && (
          <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-700">
            {jobType}
          </span>
        )}
        {jobLevel !== 'N/A' && (
          <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-700">
            {jobLevel}
          </span>
        )}
        {location !== 'N/A' && (
          <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-700">
            {location}
          </span>
        )}
      </div>

      {/* Posted Date */}
      <p className="text-xs text-gray-500 mb-4">
        Posted: {job.created_at ? job.created_at.split('T')[0] : 'N/A'}
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
