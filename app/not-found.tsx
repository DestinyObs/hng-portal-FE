import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen flex items-center flex-col justify-center bg-white px-5 relative">
        {/* 404 Text */}
          <div>
            <h1 className="text-[200px] md:text-[400px] font-bold text-[#D9F3FF] ">404</h1>
          </div>
        
        {/* Error Message */}
        <div className="sm:absolute w-full sm:max-w-72 md:max-w-[18rem] sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 text-center flex flex-col gap-3">

          {/* page cannot be found */}
          <h2 className="text-h4 tracking-wide md:text-3xl font-bold">
            Page Not Found
          </h2>

          {/* paragraph text */}
          <p className="text-card-title leading-loose">
            Sorry, we cannot find the page you are looking for.
          </p>

          {/* button */}
        <Button asChild className=' p-7 mt-2'>
          <Link href="/dashboard">
            Back to Dashboard
          </Link>
        </Button>

        </div>

    </div>
  );
}
