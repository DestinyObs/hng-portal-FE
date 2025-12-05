'use client';
import Loading from '@/app/loading';
import { PreviewJob } from '@/components/(company)/preview';
import { Button } from '@/components/ui/button';
import { useDelete, useGetJob, useUpdateStatus } from '@/hooks/jobs';
import { useAuthStore } from '@/store/auth';
import { Job, RawJob } from '@/types/job-card';
import { Country, State } from 'country-state-city';
import { DM_Sans } from 'next/font/google';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const dm_sans = DM_Sans({ subsets: ['latin'], variable: '--font-dm_sans' });

const Page = () => {
  const { id } = useParams();
  const { user } = useAuthStore();

  const companyId = user?.company?.id;
  const { changeStatus, isPending: IsChanging } = useUpdateStatus();
  const { removeJob, isPending: isRemoving } = useDelete();
  const { data: job, isPending } = useGetJob(companyId, id as string);
  const rawJob = job as RawJob;
  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(rawJob?.country);
  console.log(rawJob);

  const stateObj = states?.find((item) => item.isoCode === rawJob.state);
  const state = stateObj?.name || '';

  const countryObj = countries?.find(
    (item) => item.isoCode === rawJob?.country,
  );
  const country = countryObj?.name || '';

  const fetchedJob: Job = {
    id: rawJob?.id || '',
    title: rawJob?.title || '',
    description: rawJob?.description || '',
    acceptance_criteria: rawJob?.acceptance_criteria || '',
    state: state || '',
    country: country || '',
    company: rawJob?.company?.name || '',
    companyLogo: rawJob?.company?.logo_url || '',
    price: rawJob?.price,
    track: rawJob?.track?.name,
    job_type: rawJob?.job_type?.name || '',
    work_mode: rawJob?.work_mode?.name || '',
    skills: rawJob?.skills?.map((skill: { name: string }) => skill.name) || [],
    level: rawJob?.job_levels?.name,
    location: [rawJob?.state, rawJob?.country].filter(Boolean).join(', '),
    posted: rawJob?.created_at,
    onsiteOrRemote: rawJob?.work_mode?.name,
    applyLink: `https://example.com/apply/${rawJob?.id}`,
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
            onClick={() =>
              removeJob({
                company_id: companyId || '',
                job_id: (id as string) || '',
              })
            }
            size={'sm'}
            variant="destructiveOutline"
            className={`${dm_sans.className}`}
          >
            {isRemoving ? 'Removing...' : 'Remove Job'}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {rawJob.status === 'draft' ? (
            <>
              <div className="">
                <Button
                  asChild
                  size={'sm'}
                  className="bg-[#00AEFF] hover:bg-[#0088cc] capitalize text-white"
                >
                  <Link href={`/company/job/${id}/edit-job`}>
                    Continue Editing Draft
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <>
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
                  onClick={() =>
                    changeStatus({
                      company_id: companyId || '',
                      job_id: (id as string) || '',
                      status: 'inactive',
                    })
                  }
                  size={'sm'}
                  className="bg-[#00AEFF] hover:bg-[#0088cc] capitalize text-white"
                >
                  {!IsChanging ? 'close job' : 'closing...'}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
