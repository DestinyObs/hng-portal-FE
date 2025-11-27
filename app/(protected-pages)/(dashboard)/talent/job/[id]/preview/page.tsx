import PreviewForm from '@/components/job-application/preview-form';
import { ChevronLeft } from 'lucide-react';
import React from 'react';

const page = () => {
  return (
    <div className="max-w-[1120px] mx-auto px-4">
      <div className="flex justify-start ">
        {/* Back button */}
        <button className="inline-flex items-center text-left text-primary-blue font-semibold p-6 cursor-pointer">
          <ChevronLeft className="mr-2" />
          Back
        </button>
      </div>
      <PreviewForm />
    </div>
  );
};

export default page;
