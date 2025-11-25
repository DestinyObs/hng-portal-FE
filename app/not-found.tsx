import { Button } from '@/components/ui/button';
import { User } from '@/lib/types';
import Link from 'next/link';
import { NextRequest } from 'next/server';

export default async function NotFound(req: NextRequest) {
  function parseUserCookie(cookieValue: string): User | null {
    try {
      return JSON.parse(cookieValue);
    } catch (error) {
      console.error('Error parsing user cookie:', error);
      return null;
    }
  }

  const userCookies = req.cookies.get('user');
  const userData: User | null = userCookies
    ? parseUserCookie(userCookies.value)
    : null;

  const userRole = userData?.roles[0].name;
  return (
    <div className="h-screen flex items-center flex-col justify-center bg-white px-5 relative">
      {/* 404 Text */}
      <div>
        <h1 className="text-[200px] md:text-[400px] font-bold text-[#D9F3FF] ">
          404
        </h1>
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
        <Button asChild className=" p-7 mt-2">
          <Link
            href={
              userRole === 'employer'
                ? '/company/dashboard'
                : userRole === 'talent'
                  ? '/talent/dashboard'
                  : ''
            }
          >
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
