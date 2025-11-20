'use client';

import FileDocIcon from '@/components/icons/file-doc';
import OpenMailIcon from '@/components/icons/open-mail';
import UserProfileIcon from '@/components/icons/user-profile';
import { useTalentOnboardTab } from '@/store/onboarding';
import clsx from 'clsx';

const tabsList = [
  {
    title: 'Profile Setup',
    subtitle: 'Tell Us About Yourself',
    icon: <UserProfileIcon className="size-5" />,
    type: 'profile',
    link: '/onboarding/talent/profile-setup',
  },
  {
    title: 'Select Your Track',
    subtitle: 'Select Your Track',
    icon: <OpenMailIcon className="size-5" />,
    type: 'track',
    link: '/onboarding/talent/select-track',
  },
  {
    title: 'Portfolio Projects',
    subtitle: 'Portfolio Projects',
    icon: <FileDocIcon className="size-5" />,
    type: 'portfolio',
    link: '/onboarding/talent/portfolio-projects',
  },
];

const SideTab = () => {
  const tabs = useTalentOnboardTab((state) => state?.tabs);

  return (
    <>
      {/* For Mobile and tablet */}
      {/* <div className="lg:hidden flex justify-between items-center w-full mt-5">
        {tabsList.map((t, i) => {
          return (
            <div key={i} className="group flex items-center w-full">
              <aside className="">{t.icon}</aside>
              <hr
                className={clsx(
                  'group-last:w-0 w-30',
                  tabs === t.type ? 'bg-primary-blue' : 'bg-black/50',
                )}
              />
            </div>
          );
        })}
      </div> */}
      {/* For Desktop */}
      <section className="mt-6 hidden fixed left-12 top-1/2 -translate-y-1/2 lg:block">
        <div className="flex flex-col">
          {tabsList.map((t, i) => {
            return (
              <aside
                key={i}
                className="flex items-start gap-5 group"
                // onClick={() => {
                //   navigate.push(t.link);
                //   setTabs(t.type as TalentOnboardTab);
                // }}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={clsx(
                      'rounded-md shadow border p-3 transition-colors',
                      tabs === t.type
                        ? 'text-primary-blue bg-primary-50 border-primary-blue'
                        : 'text-gray-75/65 border-gray-50',
                    )}
                  >
                    {t.icon}
                  </div>
                  <hr
                    className={clsx(
                      'group-last:hidden h-6 w-0.5',
                      tabs === t.type ? 'bg-primary-blue' : 'bg-gray-75/65',
                    )}
                  />
                </div>
                <div
                  className={clsx(
                    '',
                    tabs === t.type ? 'text-black/75' : 'text-gray-75/65',
                  )}
                >
                  <p className="font-semibold">{t.title}</p>
                  <p className="text-sm">{t.subtitle}</p>
                </div>
              </aside>
            );
          })}
        </div>
      </section>
    </>
  );
};
export default SideTab;
