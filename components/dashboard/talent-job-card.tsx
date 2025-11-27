'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Placeholder for job data type
interface TalentJobCardProps {
  job: {
    id: string;
    companyLogo: string;
    jobTitle: string;
    companyName: string;
    isVerified: boolean;
    salary: string;
    tags: string[];
    postedDate: string;
    description: string;
  };
  onViewJob: (jobId: string) => void;
}

const TalentJobCard = ({ job, onViewJob }: TalentJobCardProps) => {
  return (
    <div className="flex flex-col p-4 border border-gray-50 rounded-lg shadow-sm bg-white">
      {/* Top section: Logo, Title, Company, Heart */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Image
            src={job.companyLogo}
            alt={job.companyName}
            width={48}
            height={48}
            className="rounded-md"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {job.jobTitle}
            </h3>
            <p className="text-sm text-gray-600 flex items-center">
              {job.companyName}
              {job.isVerified && (
                <span className="ml-1 text-primary-blue">&#10003;</span>
              )}{' '}
              {/* Checkmark icon */}
            </p>
          </div>
        </div>
        <Heart
          size={20}
          className="text-gray-400 hover:text-red-500 cursor-pointer"
        />
      </div>

      {/* Salary */}
      <p className="text-base font-bold text-gray-900 mb-2">{job.salary}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {job.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-white rounded-full text-xs text-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Posted Date */}
      <p className="text-xs text-gray-500 mb-4">Posted: {job.postedDate}</p>

      {/* Description */}
      <p className="text-sm text-gray-700 line-clamp-3 mb-4">
        {job.description}
      </p>

      {/* View Job button */}
      <div className="flex justify-end mt-auto">
        <Button onClick={() => onViewJob(job.id)} variant="outlineGray">
          View Job
        </Button>
      </div>
    </div>
  );
};

export default TalentJobCard;
