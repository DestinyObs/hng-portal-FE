'use client';
import { JobDetailsResponse } from '@/types/talent-jobs';
import { PreviewJob } from '../(company)/preview';
import { useGetTalentJob } from '@/hooks/jobs';
import Loading from '@/app/loading';
import { Button } from '../ui/button';
import { ChevronLeft, Heart } from 'lucide-react';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/public/assets/images/landing-page/shared/icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const TalentJob = ({ id }: { id: string }) => {
  const { data: job, isPending } = useGetTalentJob<JobDetailsResponse>(
    id as string,
  );
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  const skills = job?.skills.map((item: { name: string }) => item.name);
  const fixedJob = {
    id: job?.id || '',
    category: job?.category.name || '',
    title: job?.title || '',
    description: job?.description || '',
    skills: skills || [],
    acceptance_criteria: job?.acceptance_criteria || '',
    track: job?.track.name || '',
    job_type: job?.job_type.name || '',
    work_mode: job?.job_levels.name || '',
    price: job?.salary.toString() || '',
    state: job?.state.name || '',
    country: job?.country.name || '',
    company: job?.company.name || '',
    companyLogo: job?.company.logo_url || '',
    salary: job?.salary.toString() || '',
    location: job?.country.name || '',
    workType: job?.job_type.name || '',
    level: job?.job_levels.name || '',
    onsiteOrRemote: job?.job_type.name || '',
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://takeda.emerj.net/talent/jobs/${id}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  if (isPending || !job) return <Loading />;
  return (
    <>
      <div className="flex justify-start ">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-left text-primary-blue font-semibold pt-0 pb-5 cursor-pointer"
        >
          <ChevronLeft className="mr-2" />
          Back
        </button>
      </div>

      <div className=" flex flex-col md:flex-row gap-4 lg:gap-5">
        <div className="w-full p-2 sm:p-6 bg-white border border-tertiary-50 rounded-xl space-y-6">
          <PreviewJob postDetails={fixedJob} />
          {/* about the company should be added here  */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-tertiary-500">
              About the company
            </h3>
            <div className="list-disc list-inside text-tertiary-200 space-y-1 text-[16px] ${dm_sans.className} wrap-anywhere">
              {job.company.description}
            </div>
            {/* button to view company profile... dont add till a page like that exist  */}
          </div>
        </div>

        <div className="card-2 w-full md:w-[315px] space-y-6">
          <div className="w-full rounded-xl bg-white border border-tertiary-50 p-6 space-y-10">
            {/* Salary */}
            <div className="border-b border-tertiary-50 pb-5">
              <p className="text-2xl font-semibold text-primary-blue text-[28px]">
                ₦{job.salary}
              </p>
              <p className="text-sm font-semibold text-gray-400 mt-1 text-[16px]">
                Salary
              </p>
            </div>

            {/* Apply Button */}
            <div className=" space-y-3">
              <Button disabled={job.is_saved || false} size={'xs'}>
                Apply Now
              </Button>

              {/* Save Job */}
              <Button
                disabled={job.is_saved || false}
                variant={'outline'}
                size={'xs'}
              >
                <Heart /> Save job
              </Button>
            </div>

            {/* Share */}
            <div className="space-y-4">
              <p className="font-semibold text-title">Share This Job</p>
              <div className="links flex gap-7">
                <a href="https://instagram.com" target="_blank">
                  <InstagramIcon />{' '}
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    `https://takeda.emerj.net/talent/jobs/${id}`,
                  )}&text=${encodeURIComponent(job?.title ?? '')}`}
                  target="_blank"
                >
                  <TwitterIcon />{' '}
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `https://takeda.emerj.net/talent/jobs/${id}`,
                  )}`}
                  target="_blank"
                >
                  <FacebookIcon />{' '}
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    `https://takeda.emerj.net/talent/jobs/${id}`,
                  )}`}
                  target="_blank"
                >
                  <LinkedInIcon />{' '}
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-2 rounded-2xl bg-white border border-tertiary-50 p-6">
            <p className="font-semibold text-gray-900 text-title">Job link</p>

            <div className="w-full flex items-center justify-between p-4 border border-tertiary-50 rounded-lg">
              <a
                href={`https://takeda.emerj.net/talent/jobs/${id}`}
                target="_blank"
                className="text-base text-primary-600 truncate block whitespace-pre-wrap"
              >
                https://connect.hng.tech/talent/jobs
              </a>
            </div>

            <button
              onClick={handleCopy}
              className="text-sm font-semibold cursor-pointer"
            >
              <span className="text-primary-blue  hover:underline">
                Copy link
              </span>
              {isCopied && (
                <span className="mx-4 text-tertiary-200 rounded-sm no-underline p-1 bg-tertiary-50">
                  copied!
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TalentJob;
