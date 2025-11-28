'use client';

import PreviewForm from '@/components/job-application/preview-form';
import { JobApplicationFormData } from '@/types/job-application-form';
import { ChevronLeft } from 'lucide-react';
import React, { useState } from 'react';

const Page = () => {
  const [formData, setFormData] = useState<JobApplicationFormData>({
    coverLetter: 'My cover letter...',
    portfolioLink: 'https://myportfolio.com',
    resume: undefined, // or a FileList if selected
  });
  console.log(setFormData);

  return (
    <div className="max-w-[1120px] mx-auto px-4">
      <div className="flex justify-start ">
        {/* Back button */}
        <button className="inline-flex items-center text-left text-primary-blue font-semibold p-6 cursor-pointer">
          <ChevronLeft className="mr-2" />
          Back
        </button>
      </div>
      <PreviewForm data={formData} onSubmit={() => {}} onEdit={() => {}} />
    </div>
  );
};

export default Page;
