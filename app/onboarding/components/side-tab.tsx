'use client';

import FileDocIcon from '@/components/icons/file-doc';
import OpenMailIcon from '@/components/icons/open-mail';
import UserProfileIcon from '@/components/icons/user-profile';
import FolderIcon from '@/components/icons/folder-icon';
import UserProfileIcon2 from '@/components/icons/user-profile2';
import {
  useUserType,
  useTalentOnboardTab,
  useCompanyOnboardTab,
} from '@/store/onboarding';
import clsx from 'clsx';
const SideTabSkeleton = () => (
  <section className="mt-6 hidden fixed left-12 top-1/2 -translate-y-1/2 lg:block">
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((i) => (
        <aside key={i} className="flex items-start gap-5">
          <div className="flex flex-col items-center">
            <div className="rounded-md shadow border border-gray-50 p-3 bg-gray-50 animate-pulse">
              <div className="size-6" />
            </div>
            {i !== 3 && <hr className="h-8 w-0.5 bg-[#E7ECE8]" />}
          </div>
          <div className="space-y-2">
            <div className="h-5 w-32 bg-gray-50 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-50/70 rounded animate-pulse" />
          </div>
        </aside>
      ))}
    </div>
  </section>
);
const SideTab = () => {
  const { userType, hydrated: userTypeHydrated } = useUserType();
  const { tabs: talentTab, hydrated: talentHydrated } = useTalentOnboardTab();
  const { tabs: companyTab, hydrated: companyHydrated } =
    useCompanyOnboardTab();
  if (!userTypeHydrated || !talentHydrated || !companyHydrated) {
    return <SideTabSkeleton />;
  }
  const currentTab = userType === 'talent' ? talentTab : companyTab;

  const tabConfigurations = {
    talent: [
      {
        title: 'Profile Setup',
        subtitle: 'Tell Us About Yourself',
        icon: UserProfileIcon,
        type: 'profile',
      },
      {
        title: 'Select Your Track',
        subtitle: 'Choose Your Specialty',
        icon: OpenMailIcon,
        type: 'track',
      },
      {
        title: 'Portfolio Projects',
        subtitle: 'Showcase Your Work',
        icon: FileDocIcon,
        type: 'portfolio',
      },
    ],
    company: [
      {
        title: 'Company Identity',
        subtitle: 'Set Up Your Company',
        icon: UserProfileIcon2,
        type: 'profile-setup',
      },
      {
        title: 'Company Details',
        subtitle: 'Add Company Details',
        icon: FolderIcon,
        type: 'company-detail',
      },
    ],
  };

  const tabsList = tabConfigurations[userType];

  return (
    <section
      className="mt-6 hidden fixed left-12 top-1/2 -translate-y-1/2 lg:block"
      style={{ fontFamily: 'DM Sans' }}
    >
      <div className="flex flex-col">
        {tabsList.map((t, i) => (
          <aside key={i} className="flex items-start gap-5 group">
            <div className="flex flex-col items-center">
              <div
                className={clsx(
                  'rounded-lg shadow border p-2.5 transition-colors',
                  currentTab === t.type
                    ? 'text-[#040609] bg-primary-50 border-[#4E92E1]'
                    : 'text-[#E7E8E9] border-gray-50',
                )}
              >
                <t.icon
                  className={`size-5 font-bold ${currentTab === t.type ? 'text-[#4E92E1]' : 'text-[#E7E8E9]'}`}
                />
              </div>
              <hr
                className={clsx(
                  'group-last:hidden h-8 border-t-0 w-0.5 bg-[#E7ECE8]',
                )}
              />
            </div>
            <div className="mb-2">
              <p
                className={clsx(
                  'text-base font-medium',
                  currentTab === t.type ? 'text-[#111827]' : 'text-[#92959C]',
                )}
              >
                {t.title}
              </p>
              <p
                className={clsx(
                  'font-normal text-sm',
                  currentTab === t.type ? 'text-[#414652]' : 'text-[#B5B7BC]',
                )}
              >
                {t.subtitle}
              </p>
            </div>
          </aside>
        ))}
      </div>
    </section>
  );
};

export default SideTab;
