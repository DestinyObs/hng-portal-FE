import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function JobCard({
  job,
}: {
  job: {
    title: string;
    status: boolean;
    applicants: number;
    location: string;
    workType: string;
    entryLevel: boolean;
    updatedAt: string;
  };
}) {
  return (
    <Card
      className={`col-span-1 gap-4 h-fit px-4 sm:px-6 py-4 rounded-xl bg-white-50 border-[0.5px] border-[#E8E8E8]`}
    >
      <CardHeader className="flex flex-col gap-4 px-0 w-full">
        <CardTitle className="flex items-center">
          <span className="font-ag text-lg sm:text-xl font-bold leading-5 sm:leading-6 text-tertiary-500">
            {job.title}
          </span>
        </CardTitle>
        <CardDescription className="flex flex-col justify-start gap-4 font-dm_sans">
          <div className="flex self-stretch items-center gap-2">
            <span
              className={cn(
                `capitalize text-sm sm:text-xs font-semibold py-1 px-4 rounded-lg leading-4.5`,
                job.status ? 'bg-[#ECFDF3]' : 'bg-[#FEE2E2]',
              )}
            >
              {job.status ? 'Active' : 'Closed'}
            </span>
            <span className="text-sm sm:text-xs font-semibold  whitespace-nowrap px-2 py-1 bg-[#F8FAFF] rounded-lg leading-4">
              {job.applicants} Applicants
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="capitalize text-sm sm:text-xs text-black-200 leading-5">
                {job.workType}
              </span>
              <div className="rounded-full size-1 bg-[#E8E8E8]" />
              <span className="capitalize text-sm sm:text-xs text-black-200 leading-5">
                Entry Level
              </span>
              <div className="rounded-full size-1 bg-[#E8E8E8]" />
              <span className="text-sm sm:text-xs text-black-200 leading-5">
                {job.location}
              </span>
            </div>
            <span className="w-full text-sm sm:text-xs text-black-200 leading-5">
              {job.updatedAt}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex sm:justify-end gap-4 sm:gap-2 px-0 font-dm_sans">
        <Button size={'sm'} className="text-base" variant={'outlineGray'}>
          View Job Posting
        </Button>
        <Button variant="default" className="px-4 py-2 text-sm sm:text-xs">
          View Applicants
        </Button>
      </CardContent>
    </Card>
  );
}
