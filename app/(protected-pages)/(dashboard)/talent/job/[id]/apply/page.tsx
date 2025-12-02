'use client';

import JobApplicationPage from '@/components/job-application/application-page';

const page = () => {
  return (
    <div className="max-w-[1120px] mx-auto px-4">
      <div className="flex flex-col justify-start ">
        <JobApplicationPage />
      </div>
    </div>
  );
};

export default page;
