'use client';
import Loading from '@/app/loading';
import { PreviewJob } from '@/components/(company)/preview';
import { Button } from '@/components/ui/button';
import { useGetJob } from '@/hooks/jobs';
import { useAuthStore } from '@/store/auth';
import { Job, RawJob } from '@/types/job-card';
import { DM_Sans } from 'next/font/google';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const dm_sans = DM_Sans({ subsets: ['latin'], variable: '--font-dm_sans' });

const Page = () => {
  const { id } = useParams(); // Get :id from URL
  const { user } = useAuthStore(); // Get logged-in company user

  const companyId = user?.company?.id;

  // Fetch job by company + job id
  const { data: job, isPending } = useGetJob(companyId, id as string);
  const rawJob = job as RawJob;

  const fetchedJob: Job = {
    id: rawJob?.id || '',
    title: rawJob?.title || '',
    description: rawJob?.description || '',
    acceptance_criteria: rawJob?.acceptance_criteria || '',
    state: rawJob?.states?.[0]?.name || '',
    country: rawJob?.countries?.[0]?.name || '',
    company: rawJob?.company?.name || '',
    companyLogo: rawJob?.company?.logo_url || '',
    price: rawJob?.price,
    track: rawJob?.track?.name,
    job_type: rawJob?.job_type?.name || '',
    work_mode: rawJob?.work_mode?.name || '',
    skills: rawJob?.skills?.map((skill: { name: string }) => skill.name) || [],
    level: rawJob?.job_levels?.[0]?.name,
    location: `${rawJob?.states?.[0]?.name || ''}, ${rawJob?.countries?.[0]?.name || ''}`,
    posted: rawJob?.created_at,
    onsiteOrRemote: rawJob?.work_mode?.name,
    applyLink: `https://example.com/apply/${rawJob?.id}`, // replace with actual
  };

  if (isPending) return <Loading />;

  return (
    <div className=" p-6 bg-white shadow rounded-lg space-y-6">
      <PreviewJob postDetails={fetchedJob} />

      {/* CTA BTNS  */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 my-2 border-t border-tertiary-50 pt-6 ">
        {/* remove job */}
        <div className="">
          <Button
            size={'sm'}
            variant="destructiveOutline"
            className={`${dm_sans.className}`}
          >
            Remove Job
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* edit job */}
          <div className="">
            <Button
              size={'sm'}
              variant="outlineGray"
              className={`${dm_sans.className}`}
              asChild
            >
              <Link href={`/company/job/${id}/edit-job`}>Edit Job</Link>
            </Button>
          </div>
          {/* close job  */}
          <div className="">
            <Button
              size={'sm'}
              className="bg-[#00AEFF] hover:bg-[#0088cc] capitalize text-white"
            >
              close job
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
