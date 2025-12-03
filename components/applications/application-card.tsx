'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { TalentApplication } from '@/types/job-card';
import { useRouter } from 'next/navigation';
import PlaceholderProfile from '../dashboard/placeholder-profile';
import { StatusBadge } from '@/components/ui/status-badge';

interface ApplicationCardProps {
  application: TalentApplication;
}

// Helper function to safely format the date
const formatPostedDate = (dateString?: string): string => {
  if (!dateString) return 'N/A';
  try {
    const datePart = dateString.split(' ')[0];
    const [year, month, day] = datePart.split('-');
    if (year && month && day) {
      return `${day}-${month}-${year}`;
    }
    return 'N/A';
  } catch (error) {
    console.error(error);
    return 'N/A';
  }
};

const ApplicationCard = ({ application }: ApplicationCardProps) => {
  const router = useRouter();
  const { job, status, created_at } = application;

  const companyName = job.company?.name || 'N/A';
  const effectiveLogoUrl =
    job.company?.logo_url &&
    !job.company.logo_url.includes('via.placeholder.com')
      ? job.company.logo_url
      : null;

  const location = [job.state?.name, job.country?.name]
    .filter(Boolean)
    .join(', ');

  const details = [
    job.work_mode?.name,
    job.job_level?.name,
    job.job_type?.name,
    location,
  ]
    .filter(Boolean)
    .join(' • ');

  return (
    <div className="flex flex-col p-6 border border-gray-200 rounded-lg shadow-sm bg-white space-y-4">
      {/* Top section: Logo, Title, Company, Status */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {effectiveLogoUrl ? (
            <Image
              src={effectiveLogoUrl}
              alt={companyName}
              width={48}
              height={48}
              className="rounded-md"
            />
          ) : (
            <PlaceholderProfile
              name={companyName}
              size={48}
              className="text-[20px]"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            <p className="text-sm text-gray-600">{companyName}</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 line-clamp-3">{job.description}</p>

      {/* Skills */}
      {job.skills && job.skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <div
              key={skill.name}
              className="px-3 py-1 text-xs text-gray-700 bg-gray-100 rounded-full"
            >
              {skill.name}
            </div>
          ))}
        </div>
      )}

      {/* Details and Salary */}
      <div>
        <p className="text-sm text-gray-600 mb-2">
          Applied: {formatPostedDate(created_at)}
          {details && ` • ${details}`}
        </p>
        <p className="text-lg font-bold text-gray-900">
          ₦{job.salary} per Month
        </p>
      </div>

      {/* View Job button */}
      <div className="flex justify-end mt-auto">
        <Button
          onClick={() => router.push(`/talent/job/${job.id}`)}
          variant="outline"
        >
          View Job
        </Button>
      </div>
    </div>
  );
};

export default ApplicationCard;
