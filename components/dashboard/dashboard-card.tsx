import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DasbhoardCardProps } from '@/types/dashboard';

export default function DashboardCard({ card }: DasbhoardCardProps) {
  return (
    <Card
      className={`col-span-1 gap-3 px-4 sm:px-6 py-4 rounded-[15px] bg-white border-[0.5px]`}
      style={{ border: `1px solid ${card.color}` }}
    >
      <CardHeader className="flex flex-col px-0 gap-[30px]">
        <CardTitle className="flex justify-between w-full gap-0.5">
          <span className="text-lg sm:text-xl font-semibold font-dm_sans leading-5 md:leading-6 text-tertiary-500">
            {card.title}
          </span>
          <span
            className={`flex items-center size-7 p-[7.273px] rounded-full`}
            style={{ background: card.iconBg }}
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
            className={`text-xl sm:text-2xl font-ag font-semibold leading-6 sm:leading-7`}
            style={{ color: card.color }}
          >
            {card.count}
          </span>
          <span className="text-sm sm:text-base text-tertiary-100 font-dm_sans font-normal leading-6">
            {card.description}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <div
          className={`w-full h-[3px]`}
          style={{ backgroundColor: card.color }}
        />
      </CardContent>
    </Card>
  );
}
