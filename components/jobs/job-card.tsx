import Image from 'next/image';
import { Heart } from 'lucide-react';
import { RawJob2 } from '@/types/job-card'; // Import RawJob
import { useRouter } from 'next/navigation'; // Import useRouter

export interface JobCardProps {
  job: RawJob2;
  // onViewJob: (jobId: string) => void; // Removed as per new instruction
}

export default function JobCard({ job }: JobCardProps) {
  // Removed onViewJob from destructuring
  const router = useRouter(); // Initialize useRouter
  const companyName = job.company?.name || 'N/A';
  const jobType = job.job_type?.name || 'N/A';
  const workMode = job.work_mode?.name || 'N/A';
  const jobLevel = job.job_levels?.[0]?.name || 'N/A'; // Assuming job_levels is an array and we take the first
  const location =
    (job.states?.[0]?.name ? `${job.states[0].name}, ` : '') +
    (job.countries?.[0]?.name || 'N/A'); // Assuming states and countries are arrays

  const shouldRenderImage =
    job.company?.logo_url &&
    !job.company.logo_url.includes('via.placeholder.com');

  return (
    <article
      onClick={() => router.push(`/talent/job/${job.id}?modal=true`)}
      className="w-full rounded-xl border border-[#9C9C9C] bg-(--color-white-50) p-8 hover:border-(--color-primary-blue) hover:shadow-md cursor-pointer transition"
    >
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-start gap-4">
          {
            shouldRenderImage ? (
              <Image
                src={job.company!.logo_url!}
                alt={companyName}
                width={56}
                height={56}
                className="rounded-xl object-cover"
              />
            ) : null // Render nothing if logo_url is a placeholder or doesn't exist
          }

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
          onClick={(e) => e.stopPropagation()}
          aria-label="Save job"
          className="p-2 rounded-lg transition hover:bg-(--color-gray-50)"
        >
          <Heart className="h-6 w-6 text-(--color-gray-100) hover:text-red-500 transition" />
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
          Posted: {job.created_at?.split('T')[0]} • {workMode} • {jobType} •{' '}
          {jobLevel} • {location}
        </div>
        <div className="text-2xl font-bold text-(--color-gray-500)">
          {job.salary ? `₦ ${job.salary}` : 'Salary not specified'} per Month
        </div>
      </div>
    </article>
  );
}
