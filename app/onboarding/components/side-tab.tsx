'use client';

import FileDocIcon from '@/components/icons/file-doc';
import OpenMailIcon from '@/components/icons/open-mail';
import UserProfileIcon from '@/components/icons/user-profile';
import { useTalentOnboardTab } from '@/store/onboarding';
import clsx from 'clsx';

const SideTab = () => {
  const tabs = useTalentOnboardTab((state) => state?.tabs);

  const tabsList = [
    {
      title: 'Profile Setup',
      subtitle: 'Tell Us About Yourself',
      icon: <UserProfileIcon className="size-6" />,
      type: 'profile',
      link: `/onboarding/talent?page=${tabs}`,
    },
    {
      title: 'Select Your Track',
      subtitle: 'Select Your Track',
      icon: <OpenMailIcon className="size-6" />,
      type: 'track',
      link: `/onboarding/talent?page=${tabs}`,
    },
    {
      title: 'Portfolio Projects',
      subtitle: 'Portfolio Projects',
      icon: <FileDocIcon className="size-6" />,
      type: 'portfolio',
      link: `/onboarding/talent?page=${tabs}`,
    },
  ];

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
                        ? 'text-[#4E92E1] bg-primary-50 border-[#4E92E1]'
                        : 'text-[#E7E8E9] border-gray-50',
                    )}
                  >
                    {t.icon}
                  </div>
                  <hr
                    className={clsx('group-last:hidden h-8 w-0.5 bg-[#E7ECE8]')}
                  />
                </div>
                <div
                  className={clsx(
                    '',
                    tabs === t.type ? 'text-[#111827]' : 'text-gray-75/65',
                  )}
                >
                  <p className="text-lg">{t.title}</p>
                  <p className="font-extralight">{t.subtitle}</p>
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
