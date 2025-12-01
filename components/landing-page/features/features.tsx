'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import FeatureCard from './feature-card';
import { features } from '@/constants/landing-page';

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
            Experience a Smarter Way to Connect Talent <br /> and Opportunity
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

      <div
        className="
  w-[90%] max-w-[1200px] flex mx-auto gap-8 
  overflow-x-auto not-lg:overflow-x-scroll
  lg:flex-wrap 
  [&::-webkit-scrollbar]:hidden mb-[60px]
  justify-start lg:justify-center
"
      >
        {features.map((feature, index) => (
          <FeatureCard feature={feature} key={index} />
        ))}
      </div>
    </div>
  );
}
