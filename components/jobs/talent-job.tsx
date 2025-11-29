'use client';
import { JobDetailsResponse } from '@/types/talent-jobs';
import { PreviewJob } from '../(company)/preview';
import { useGetTalentJob } from '@/hooks/jobs';
import Loading from '@/app/loading';
import { Button } from '../ui/button';
import { ChevronLeft, Heart } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import {
  WhiteFacebookIcon,
  WhiteInstagramIcon,
  WhiteTwitterIcon,
  WhiteWhatsappIcon,
} from '@/public/assets/images/landing-page/shared/icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatNumbers } from '@/constants/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveJob } from '@/api/actions/talent';
import { toast } from 'sonner';
import { APIResponse, SuccessResponse } from '@/types/api-response'; // Combined import

const TalentJob = ({ id }: { id: string }) => {
  const { data: jobResponse, isPending } = useGetTalentJob<JobDetailsResponse>(
    id as string,
  );
  const job = jobResponse?.data; // Access the data property
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: a_saveJob, isPending: isSaving } = useMutation({
    mutationKey: ['saveJob', id],
    mutationFn: () => saveJob(id),
    onSuccess: (response: APIResponse<SuccessResponse>) => {
      if (response.success) {
        toast.success(response.message || 'Job bookmark updated!');
        queryClient.invalidateQueries({ queryKey: ['talentJob', id] });
        queryClient.invalidateQueries({ queryKey: ['savedJobs'] });
        queryClient.invalidateQueries({ queryKey: ['talentFindJobs'] });
        queryClient.invalidateQueries({ queryKey: ['talentJobs'] });
      } else {
        toast.error(response.message || 'Failed to save job.');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'A network error occurred.');
    },
  });

  const skills = job?.skills?.map((item: { name: string }) => item.name); // Add optional chaining
  const fixedJob = {
    id: job?.id || '',
    category: job?.category?.name || '', // Add optional chaining
    title: job?.title || '',
    description: job?.description || '',
    skills: skills || [],
    acceptance_criteria: job?.acceptance_criteria || '',
    track: job?.track?.name || '', // Add optional chaining
    job_type: job?.job_type?.name || '', // Add optional chaining
    work_mode: job?.job_levels?.name || '', // Add optional chaining
    price: job?.salary?.toString() || '', // Add optional chaining
    state: job?.state?.name || '', // Add optional chaining
    country: job?.country?.name || '', // Add optional chaining
    company: job?.company?.name || '', // Add optional chaining
    companyLogo: job?.company?.logo_url || '', // Add optional chaining
    salary: job?.salary?.toString() || '', // Add optional chaining
    location: job?.country?.name || '', // Add optional chaining
    workType: job?.job_type?.name || '', // Add optional chaining
    level: job?.job_levels?.name || '', // Add optional chaining
    onsiteOrRemote: job?.job_type?.name || '', // Add optional chaining
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://staging.connect.hng.tech/talent/jobs/${id}`,
    );
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  if (isPending || !job) return <Loading />; // Update check
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
              <ReactMarkdown>{job.company.description}</ReactMarkdown>
            </div>
            {/* button to view company profile... dont add till a page like that exist  */}
          </div>
        </div>

        <div className="card-2 w-full md:w-[315px] space-y-6">
          <div className="w-full rounded-xl bg-white border border-tertiary-50 p-6 space-y-10">
            {/* Salary */}
            <div className="border-b border-tertiary-50 pb-5">
              <p className="text-2xl font-semibold text-primary-blue text-[28px]">
                ₦{formatNumbers(job.salary)}
              </p>
              <p className="text-sm font-semibold text-gray-400 mt-1 text-[16px]">
                Salary
              </p>
            </div>

            {/* Apply Button */}
            <div className="md:max-w-[315px] space-y-3">
              <Button disabled={job?.is_applied} size={'xs'}>
                Apply Now
              </Button>

              {/* Save Job */}
              <Button
                onClick={() => a_saveJob()}
                disabled={isSaving}
                variant={'outline'}
                size={'xs'}
              >
                <Heart
                  className={`mr-2 ${
                    job?.is_saved ? 'fill-red-500 text-red-500' : '' // Add optional chaining
                  }`}
                />{' '}
                {job?.is_saved ? 'Saved' : 'Save job'}{' '}
                {/* Add optional chaining */}
              </Button>
            </div>

            {/* Share -change the icon */}
            <div className="space-y-4">
              <p className="font-semibold text-title">Share This Job</p>
              <div className="links flex gap-7">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Check out this job: https://takeda.emerj.net/talent/jobs/${id}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhiteWhatsappIcon />{' '}
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `https://takeda.emerj.net/talent/jobs/${id}`,
                  )}`}
                  target="_blank"
                >
                  <WhiteFacebookIcon />{' '}
                </a>
                <a href="https://instagram.com" target="_blank">
                  <WhiteInstagramIcon />{' '}
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    `https://takeda.emerj.net/talent/jobs/${id}`,
                  )}&text=${encodeURIComponent(job?.title ?? '')}`}
                  target="_blank"
                >
                  <WhiteTwitterIcon />{' '}
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-2 rounded-2xl bg-white border border-tertiary-50 p-6">
            <p className="font-semibold text-gray-900 text-title">Job link</p>

            <div className="w-full flex items-center justify-between p-4 border border-tertiary-50 rounded-lg">
              <a
                href={`https://staging.connect.hng.tech/talent/jobs/${id}`}
                target="_blank"
                className="text-base text-primary-600 wrap-anywhere"
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
