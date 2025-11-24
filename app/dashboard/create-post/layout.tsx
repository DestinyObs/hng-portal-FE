import CreateNewJob from '@/components/dashboard/create-post/create-new-job';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="">
        <CreateNewJob />
      </div>

      <Link
        href="/dashboard/jobs"
        className="flex items-center gap-2 font-medium hover:opacity-80 transition-opacity py-6"
      >
        <ArrowLeft className="w-4 h-4  " />
        Back to Jobs
      </Link>

      {children}
    </>
  );
};

export default layout;
