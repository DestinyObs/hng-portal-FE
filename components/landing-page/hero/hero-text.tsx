import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
export default function HeroText() {
  return (
    <div className="not-sm:mt-11 mx-auto max-w-[558px] md:text-left text-center flex flex-col justify-center ">
      <Badge variant={'outline'} className="border-primary-300 not-md:mx-auto">
        {' '}
        Connecting talent with Opportunity
      </Badge>
      <h1 className="text-[32px] md:text-[52px] mt-4 md:my-6 font-semibold leading-tight">
        Your Career Platform, Reimagined.
      </h1>

      <p className="not-sm:w-[90%] mx-auto text-[#4A5565] mt-3 md:mt-4 mb-4 md:mb-6">
        {
          "Whether you're building your career or building your team, HNG Portal connects you with the right opportunities."
        }
      </p>
      <div className="flex gap-4 justify-center md:justify-start items-center">
        <Link href="/join-talent" passHref>
          <Button asChild className="px-4 py-5 md:py-6 text-[14px]">
            <span>Join as Talent</span>
          </Button>
        </Link>

        <Link href="/hire-talent" passHref>
          <Button
            asChild
            variant="outline"
            className="px-4 py-5 md:py-6 text-[14px]"
          >
            <span>Hire a Talent</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
