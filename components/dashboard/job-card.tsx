'use client';

import { useRouter } from 'next/navigation';
import { cn, formatTime } from '@/lib/utils';
import { JobCardProps } from '@/types/job-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth';

export default function JobCard({ job }: { job: JobCardProps }) {
  const navigate = useRouter();
  const { user } = useAuthStore();

  // view job posting handler
  const viewJobHandler = () => navigate.push(`/company/job/${job?.id}`);

  return (
    <Card
      className={`col-span-1 gap-4 h-fit px-4 sm:px-6 py-4 rounded-xl bg-white-50 border-[0.5px] border-[#E8E8E8]`}
    >
      <CardHeader className="flex flex-col gap-4 px-0 w-full">
        <CardTitle className="w-full">
          <span className="block font-ag text-lg sm:text-xl font-bold leading-5 sm:leading-6 text-tertiary-500 wrap-break-word">
            {job?.title}
          </span>
        </CardTitle>

        <CardDescription className="flex flex-col justify-start gap-4 font-dm_sans">
          <div className="flex self-stretch items-center gap-2">
            <span
              className={cn(
                `capitalize text-sm sm:text-xs font-semibold py-1 px-4 rounded-lg leading-4.5`,
                job?.status === 'active' ? 'bg-[#ECFDF3]' : 'bg-[#FEE2E2]',
              )}
            >
              {job?.status}
            </span>
            <span className="text-sm sm:text-xs font-semibold  whitespace-nowrap px-2 py-1 bg-[#F8FAFF] rounded-lg leading-4">
              0 Applicants
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="capitalize text-sm sm:text-xs text-black-200 leading-5">
                {job?.job_type?.name}
              </span>
              <div className="rounded-full size-1 bg-[#E8E8E8]" />
              <span className="capitalize text-sm sm:text-xs text-black-200 leading-5">
                {job.job_level?.name}
              </span>
              <div className="rounded-full size-1 bg-[#E8E8E8]" />
              <span className="text-sm sm:text-xs text-black-200 leading-5">
                {job?.countries?.name}
              </span>
            </div>
            <span className="w-full text-sm sm:text-xs text-black-200 leading-5">
              {formatTime(job?.created_at)}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex sm:justify-end gap-4 sm:gap-2 px-0 font-dm_sans">
        <div className="">
          <Button
            size="xs"
            variant={'outlineGray'}
            className="px-2.5 py-2 text-sm sm:text-xs"
            onClick={viewJobHandler}
          >
            View Job Posting
          </Button>
        </div>
        <div className="">
          <Button
            size="xs"
            variant="default"
            className="px-2.5 py-2 text-sm sm:text-xs"
            onClick={() =>
              navigate.push(`/company/${user?.company?.id}/job/${job.id}`)
            }
          >
            View Applicants
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
