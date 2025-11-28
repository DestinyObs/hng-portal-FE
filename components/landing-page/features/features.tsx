import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import React from 'react';
import FeatureCard from './feature-card';
import { Feature } from '@/lib/types';
const features: Feature[] = [
  {
    image: 'features/Layer.png',
    header: 'Verified Talent Pool',
    description:
      'No guesswork. Every talent profile is reviewed and tied to real skill history.',
  },
  {
    image: 'features/Dashboard.png',
    header: 'Streamlined Hiring',
    description:
      'Review candidates, and connect instantly. Everything happens inside one seamless platform.',
  },
  {
    image: 'features/Chat.png',
    header: 'Built-In Messaging',
    description:
      'Send messages directly inside the platform. Share details, and keep conversations organized in one place.',
  },
  {
    image: 'features/JobPost.png',
    header: 'Smart Job Matching',
    description:
      'From verified profiles to smart job matching, HNG Connect gives both sides exactly what they need to succeed.',
  },
];
export default function Features() {
  return (
    <div>
      <Card className="text-center bg-white gap-0" variant={'ghost'}>
        <CardTitle>
          <Badge
            className="border-primary-300 text-primary-300 font-semibold text-[14px] px-4 py-1"
            variant={'outline'}
          >
            Features
          </Badge>
        </CardTitle>
        <CardHeader className="my-2">
          <h3 className="text-[20px] font-medium md:text-[34px]">
            {' '}
            Experience a Smarter Way to Connect Talent and Opportunity
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-[#4e4a4a] text-sm md:text-[18px]">
            {' '}
            From verified profiles to smart job matching, HNG Connect gives both
            sides <br className="hidden md:block" /> exactly what they need to
            succeed.
          </p>
        </CardContent>
      </Card>
      <div className="w-[90%] max-w-[1200] flex  mx-auto lg:flex-wrap  gap-8 not-lg:overflow-x-scroll [&::-webkit-scrollbar]:hidden mb-[60px] justify-center">
        {features.map((feature, index) => (
          <FeatureCard feature={feature} key={index} />
        ))}
      </div>
    </div>
  );
}
