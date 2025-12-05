'use client';
import Image from 'next/image';
import { Button } from '../ui/button';
import { AlertCircle } from 'lucide-react';
import { Progress } from '../ui/progress';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import PlaceholderProfile from './placeholder-profile';
import clsx from 'clsx';
import { useGetProfileData } from '@/hooks/profile-settings';

const DashboardSidebar = ({ className }: { className?: string }) => {
  const { user } = useAuthStore();
  const role = user?.current_role;
  const { data } = useGetProfileData();

  const calculateProfileCompletion = () => {
    if (!data || role !== 'talent') return 0;
    let completed = 0;
    const total = 5;
    if (data.photo_url) completed++;
    if (data.bio?.bio) completed++;
    if (data.skills && data.skills.length > 0) completed++;
    if (data.experiences && data.experiences.length > 0) completed++;
    if (data.portfolios && data.portfolios.length > 0) completed++;
    return Math.round((completed / total) * 100);
  };
  const profileCompletion = calculateProfileCompletion();
  return (
    <aside className={clsx('flex-col gap-5', className)}>
      {/* profile-card */}
      <div className="border border-tertiary-50 profilecard flex justify-center items-center gap-2 bg-white rounded-md flex-col py-6 px-3">
        {/* user profile image */}
        <div className="relative w-40 h-40 mx-auto">
          {user?.company?.logo_url && role === 'employer' ? (
            <Image
              src={user?.company?.logo_url}
              alt="profile"
              fill
              className="rounded-full object-cover"
            />
          ) : data?.photo_url && role === 'talent' ? (
            <Image
              src={data?.photo_url}
              alt="profile"
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <PlaceholderProfile
              radius={'50%'}
              size={'100%'}
              className="text-5xl"
              name={
                role === 'employer' && user?.company?.name
                  ? user?.company?.name
                  : `${user?.firstname ?? ''} ${user?.lastname ?? ''}`.trim()
              }
            />
          )}
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
          {/* <Button size={'sm'} className="text-base" variant={'outlineGray'}>
            Request Verification
          </Button> */}
        </div>
      </div>

      {/* complete profile card */}
      {user?.bio?.onboarding_status === 'pending' &&
        profileCompletion < 100 && (
          <div className="border border-tertiary-50 profilecard flex justify-center items-start gap-4 bg-white rounded-md flex-col py-5 px-3">
            <h3 className="font-semibold text-h5">Complete your profile</h3>

            {/* progress bar */}
            <div className="progress-bar w-full">
              <h4 className="text-base text-tertiary-100">
                Your Profile is{' '}
                <span className="text-primary-blue font-bold">
                  {profileCompletion}%
                </span>{' '}
                complete
              </h4>
              <Progress
                indicatorClassname="bg-primary-blue"
                value={profileCompletion}
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
                <Link href={'/settings?flow=onboarding'}>
                  Finish your profile
                </Link>
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
        )}
    </aside>
  );
};

export default DashboardSidebar;
