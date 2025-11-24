'use client';

import { useSearchParams } from 'next/navigation';
import OnboardLayout from './onboard-layout';
import Welcome from './welcome';
import BasicInformation from './basic-info';
import TrackSelection from './select-track';
import AddPortfolioProjects from './add-projects';
import {
  TalentOnboardTab,
  useTalentOnboardTab,
  useUserType,
} from '@/store/onboarding';
import { useEffect } from 'react';

const TalentOnboardingContent = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const setUserType = useUserType((state) => state.setUserType);
  const setTabs = useTalentOnboardTab((state) => state.setTabs);

  useEffect(() => {
    setUserType('talent');
    if (page) {
      setTabs(page as TalentOnboardTab);
    }
  }, [page, setUserType, setTabs]);

  return (
    <>
      {page === 'profile' ? (
        <OnboardLayout>
          <BasicInformation />
        </OnboardLayout>
      ) : page === 'track' ? (
        <TrackSelection />
      ) : page === 'portfolio' ? (
        <OnboardLayout>
          <AddPortfolioProjects />
        </OnboardLayout>
      ) : (
        <Welcome />
      )}
    </>
  );
};
export default TalentOnboardingContent;
