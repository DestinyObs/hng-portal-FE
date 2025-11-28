import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
export default function HeroText() {
  return (
    <div className="not-sm:mt-11 mx-auto max-w-[558px] md:text-left text-center flex flex-col justify-center ">
      <Badge
        variant={'outline'}
        className="bg-white not-md:mx-auto border-0 p-2"
      >
        {' '}
        Connecting talent with Opportunity
      </Badge>
      <h1 className="text-[32px] md:text-[52px] text-white mt-4 md:my-6 font-semibold leading-tight">
        Your Career Platform, Reimagined.
      </h1>

      <p className="not-sm:w-[90%] mx-auto text-white mt-3 md:mt-4 mb-4 md:mb-6">
        {
          "Whether you're building your career or building your team, HNG Connect connects you with the right opportunities."
        }
      </p>
      <div className="flex gap-4 justify-center md:justify-start items-center">
        <Link href="/sign-up/talent" passHref>
          <Button
            asChild
            variant="outline"
            className="px-4 py-5 md:py-6 text-[14px] rounded-3xl bg-white border text-primary-blue"
          >
            <span>Join as Talent</span>
          </Button>
        </Link>

        <Link href="/sign-up/company" passHref>
          <Button
            asChild
            className="px-4 py-5 md:py-6 text-[14px] rounded-3xl border border-white"
          >
            <span>Hire a Talent</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
