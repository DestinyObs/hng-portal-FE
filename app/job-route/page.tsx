import React from 'react';
import { Job } from '@/types/job-card';
import { PreviewJob } from '@/components/(company)/preview';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Heart } from 'lucide-react';
import { InstagramIcon } from '@/public/assets/images/landing-page/shared/icons';
import { job } from '@/constants/constants';

const JobCard: React.FC<Job> = () => {
  return (
    <div className="max-w-[1120px] mx-auto px-4">
      <div className="flex justify-start ">
        {/* Back button */}
        <button className="inline-flex items-center text-left text-primary-blue font-semibold pt-0 pb-5 cursor-pointer">
          <ChevronLeft className="mr-2" />
          Back
        </button>
      </div>

      <div className=" flex flex-col md:flex-row gap-4 lg:gap-5">
        <div className="w-full p-6 bg-white border border-tertiary-50 rounded-xl space-y-6">
          <PreviewJob postDetails={job} />
          {/* about the company should be added here  */}
        </div>

        <div className="card-2 w-full md:w-[315px] space-y-6">
          <div className="w-full rounded-xl bg-white border border-tertiary-50 p-6 space-y-10">
            {/* Salary */}
            <div className="border-b border-tertiary-50 pb-5">
              <p className="text-2xl font-semibold text-primary-blue text-[28px]">
                ₦{job.price}
              </p>
              <p className="text-sm font-semibold text-gray-400 mt-1 text-[16px]">
                Salary
              </p>
            </div>

            {/* Apply Button */}
            <div className=" space-y-3">
              <Button size={'xs'}>Apply Now</Button>

              {/* Save Job */}
              <Button variant={'outline'} size={'xs'}>
                <Heart /> Save job
              </Button>
            </div>

            {/* Share */}
            <div className="space-y-4">
              <p className="font-semibold text-title">Share This Job</p>
              <div className="links flex gap-7">
                <button>
                  <InstagramIcon />{' '}
                </button>
                <button>
                  <InstagramIcon />{' '}
                </button>
                <button>
                  <InstagramIcon />{' '}
                </button>
                <button>
                  <InstagramIcon />{' '}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2 rounded-2xl bg-white border border-tertiary-50 p-6">
            <p className="font-semibold text-gray-900 text-title">Job link</p>

            <div className="flex items-center justify-between p-4 border border-tertiary-50 rounded-lg space-y-4">
              <a
                href="https://hngportal.com/apply/BRIGHTLABS-UX-001"
                target="_blank"
                className="text-base text-primary-600 truncate"
              >
                https://hngportal.com/apply/BRIGHTLABS-UX-001
              </a>
            </div>

            <button className="text-sm text-primary-blue font-semibold hover:underline">
              Copy link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
