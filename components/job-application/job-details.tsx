import React from 'react';
import { useGetTalentJob } from '@/hooks/jobs';
import { useParams } from 'next/navigation';
import Loading from '@/app/loading';
import BookMark from '@/public/assets/apply-for-jobs/icons/book-mark';
import MoneyIcon from '@/public/assets/apply-for-jobs/icons/money';
import JobTypeIcon from '@/public/assets/apply-for-jobs/icons/job-type';

interface Job {
  id: string;
  title: string;
  description: string;
  acceptance_criteria: string;
  salary: number;
  created_at?: string;
  work_type?: { id: string; name: string };
  location?: string;
  job_levels?: { id: string; name: string };
  job_type?: { id: string; name: string };
  category?: { id: string; name: string };
  company?: { id: string; name: string };
  country?: { id: string; name: string };
  state?: { id: string; name: string };
  track?: { id: string; name: string };
  skills?: { id: string; name: string }[];
}

const JobApplicationDetails = () => {
  const { id: jobId } = useParams();
  const { data: response, isPending } = useGetTalentJob(jobId as string);
  const job = response?.data as Job;
  if (isPending) return <Loading />;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6 ">
      {/* Job Details Section */}
      <div className="p-6 flex flex-col md:flex-row md:items-start md:space-x-6 border-b border-tertiary-50">
        {/* Main Job Details */}
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">Job Details</h2>

          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-500">
                {job?.title}
              </h3>
              <p className="text-sm text-gray-200">
                Posted {job?.created_at} - {job?.job_type?.name} -{' '}
                {job?.state?.name}, {job?.country?.name}
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-4 text-gray-200 text-[16px]">
            <p>{job?.description}</p>
          </div>

          <a href="#" className="text-primary-300 text-sm underline">
            View job posting
          </a>
        </div>

        {/* Job Info Cards */}
        <div className="mt-6 md:mt-0 md:w-1/3 grid grid-cols-1 gap-4 border-l border-tertiary-50">
          <div className="flex items-center gap-3 p-3 rounded-lg">
            <BookMark className="w-5.5 h-5.5 text-tertiary-100" />
            <div>
              <p className="font-semibold text-sm">{job?.job_levels?.name}</p>
              <p className="text-xs text-[#686868]">Experience level</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg">
            <MoneyIcon className="w-5.5 h-5.5 text-tertiary-100" />
            <div>
              <p className="font-semibold text-sm">{job?.salary}</p>
              <p className="text-xs text-[#686868]">Project price</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg">
            <JobTypeIcon className="w-5.5 h-5.5 text-tertiary-100" />
            <div>
              <p className="font-semibold text-sm">{job?.job_type?.name}</p>
              <p className="text-xs text-[#686868]">Job type</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">Skills and Expertise</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {job?.skills?.map((skill, index) => (
            <div
              key={index}
              className="px-4 py-3 rounded-full border border-tertiary-50"
            >
              <p className="text-sm">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationDetails;
