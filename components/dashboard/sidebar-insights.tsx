import { Fragment } from 'react';
import { stats } from '@/lib/utils';
import { Bookmark } from 'lucide-react';

export const SidebarInsights = ({ role }: { role: string }) => {
  return (
    // insights
    <div className="border border-tertiary-50 profilecard flex justify-center gap-2 bg-white rounded-md flex-col py-4 px-3">
      <h3 className="text-h5 font-semibold">
        {role === 'company' ? 'Insights' : 'Job Statistics'}
      </h3>

      <div className="insight">
        {stats &&
          stats.map((item, index) => (
            <Fragment key={index}>
              <InsightCard stat={item} />
              {index !== stats.length - 1 && (
                <span className=" w-full h-px bg-tertiary-50 inline-block" />
              )}
            </Fragment>
          ))}
      </div>
    </div>
  );
};

type stat = {
  title: string;
  description: string;
};

const InsightCard = ({ stat }: { stat: stat }) => {
  return (
    <div className="flex justify-start items-center gap-3 py-1">
      <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[#F1F5F9]">
        <Bookmark width={16} height={16} fill="#93C5FD" strokeWidth={0} />
      </div>
      <div className="text">
        <p className="views text-base">{stat.title}</p>
        <p className="text-sm text-tertiary-100">{stat.description}</p>
      </div>
    </div>
  );
};
