import { ChevronLeft } from 'lucide-react';
import { Params } from 'next/dist/server/request/params';
import TalentJob from '@/components/jobs/talent-job';

const JobCard = async ({params}: {params: Params}) => {
    const {id} = await params
  return (
    <div className="max-w-[1120px] mx-auto p-6">

      <TalentJob id={id as string} />
    </div>
  );
};

export default JobCard;
