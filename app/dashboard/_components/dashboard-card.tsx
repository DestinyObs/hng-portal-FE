import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const DASHBOARD_CARD = [
  {
    title: 'Active Job Posting',
    icon: '/assets/dashboard/icons/briefcase.svg',
    description: 'Active Jobs',
    color: '[#14BA6D]',
    iconBg: 'accent-3',
    count: 10,
  },
  {
    title: 'Total Applicants',
    icon: '/assets/dashboard/icons/people.svg',
    description: 'New Applicants',
    color: '[#E0E7FF]',
    iconBg: '[#E0E7FF]',
    count: 80,
  },
  {
    title: 'Hires Completed',
    icon: '/assets/dashboard/icons/profile-tick.svg',
    description: 'Hires',
    color: 'accent-pink',
    iconBg: 'accent-pink',
    count: 15,
  },
];

export default function DashboardCard({ card }) {
  return (
    <Card
      className={`col-span-1 gap-3 px-4 sm:px-6 py-4 rounded-[15px] bg-white border-[0.5px] border-${card.color}`}
    >
      <CardHeader className="flex flex-col px-0 gap-[30px]">
        <CardTitle className="flex justify-between w-full gap-0.5">
          <span className="text-lg sm:text-xl font-semibold font-dm_sans leading-5 md:leading-6 text-tertiary-500">
            {card.title}
          </span>
          <span
            className={`flex items-center size-7 p-[7.273px] bg-${card.iconBg} rounded-full`}
          >
            <Image
              src={card.icon}
              alt={card.title}
              width={100}
              height={100}
              className="shrink-0 size-4 md:size-[17.455px]"
            />
          </span>
        </CardTitle>
        <CardDescription className="flex flex-col w-full gap-1.5">
          <span
            className={`text-xl sm:text-2xl text-[var(--color-${card.color})] font-ag font-semibold leading-6 sm:leading-7`}
          >
            {card.count}
          </span>
          <span className="text-sm sm:text-base text-tertiary-100 font-dm_sans font-normal leading-6">
            {card.description}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <div className={`w-full h-[3px] bg-${card.color}`} />
      </CardContent>
    </Card>
  );
}
