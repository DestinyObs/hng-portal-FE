'use client';
import JobApplicationPage from '@/components/job-application/application-page';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  return (
    <div className="max-w-[1120px] mx-auto px-4">
      <div className="flex flex-col justify-start ">
        {/* Back button */}
        <button
          className="inline-flex items-center text-left text-primary-blue font-semibold p-6 cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeft className="mr-2" />
          Back
        </button>
        <JobApplicationPage />
      </div>
    </div>
  );
};

export default Page;
