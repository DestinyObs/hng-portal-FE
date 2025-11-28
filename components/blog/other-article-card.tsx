import React from 'react';
import { CarouselItem } from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { ArticleCard } from '@/lib/types';
import Link from 'next/link';

export const OtherArticleCard = ({ article }: { article: ArticleCard }) => {
  return (
    <CarouselItem className="cursor-pointer basis-full w-[384px] sm:basis-1/2 lg:basis-1/4">
      <div className="w-full">
        <Card className="group p-0 py-0 w-full md:h-[292px] h-64 flex flex-col sm:flex-row gap-0 border-0 transition-all duration-300 ease-in-out">
          <CardContent className="relative w-full h-full p-0">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover rounded-[11px]"
            />
          </CardContent>
        </Card>
        <div className="py-2">
          <h3 className="text-tertiary-200 py-3 text-2xl font-medium">
            Understanding the Right Talent For The Jobs
          </h3>
          <p className="text-tertiary-75 text-sm ">
            Lorem ipsum dolor sit amet consectetur. Convallis nunc eget egestas
            arcu enim sem. Blandit ut non tellus cras sit ullamcorper neque
            faucibus. Aliquet tellus venenatis tristique bibendum lectus.
          </p>

          <Link
            href={'/'}
            className="pt-5 inline-block underline text-primary-blue"
          >
            see more
          </Link>
        </div>
      </div>
    </CarouselItem>
  );
};
