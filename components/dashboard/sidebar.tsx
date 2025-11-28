'use client';
import Image from 'next/image';
import { Button } from '../ui/button';
import { AlertCircle } from 'lucide-react';
import { Progress } from '../ui/progress';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';

const DashboardSidebar = () => {
  const { user } = useAuthStore();

  // Workaround: Infer role based on the presence of the company object
  const role = user?.company ? 'employer' : 'talent';

  return (
    <aside className="w-72 hidden lg:flex flex-col gap-5">
      {/* profile-card */}
      <div className="border border-tertiary-50 profilecard flex justify-center items-center gap-2 bg-white rounded-md flex-col py-6 px-3">
        {/* user profile image */}
        <div className="relative w-40 h-40 mx-auto">
          <Image
            src={
              role === 'employer'
                ? '/images/company-profile.png'
                : '/images/talent-profile.jpg'
            }
            alt="profile"
            fill
            className="rounded-full object-cover"
          />
        </div>

        {/* name */}
        <h1 className="text-h5 font-bold text-gray-900 capitalize">
          {role === 'employer'
            ? user?.company?.name
            : `${user?.firstname} ${user?.lastname}`}
        </h1>
        <p className="text-body-1 text-gray-500">
          {role === 'employer'
            ? user?.status
            : `${user?.firstname} ${user?.lastname}`}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-5 mt-auto w-full">
          {role === 'employer' && (
            <Button className="cursor-pointer" size={'md'} asChild>
              <Link href={'/company/job/create'}>Post a Job</Link>
            </Button>
          )}
          {role === 'talent' && (
            <Button className="cursor-pointer" size={'md'} asChild>
              <Link href={'/profile-view'}>View Profile</Link>
            </Button>
          )}
          <Button size={'sm'} className="text-base" variant={'outlineGray'}>
            Request Verification
          </Button>
        </div>
      </div>

      {/* complete profile card */}
      <div className="border border-tertiary-50 profilecard flex justify-center items-start gap-4 bg-white rounded-md flex-col py-5 px-3">
        <h3 className="font-semibold text-h5">Complete your profile</h3>

        {/* progress bar */}
        <div className="progress-bar w-full">
          <h4 className="text-base text-tertiary-100">
            Your Profile is{' '}
            <span className="text-primary-blue font-bold">70%</span> complete
          </h4>
          <Progress
            indicatorClassname="bg-primary-blue"
            value={70}
            className="w-full h-1.5 bg-[#DCDCDC]"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col mt-2 w-full">
          <Button
            variant={'outline'}
            asChild
            size={'sm'}
            className="text-body-1 text-primary-blue bg-primary-50"
          >
            <Link href={'/talent/profile'}>Finish your profile</Link>
          </Button>
        </div>

        {/* note */}
        <div className="note flex items-center gap-2">
          <div className="icon">
            <AlertCircle width={16} height={16} />
          </div>
          <div className="text-sm text-tertiary-100">
            {role === 'employer'
              ? 'Complete your profile to attract stronger applicants.'
              : 'Complete your profile to attract more employers'}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
