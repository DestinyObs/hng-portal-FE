'use client';

import { useSearchParams } from 'next/navigation';
import OnboardLayout from '../components/onboard-layout';
import Welcome from '../components/welcome';
import BasicInformation from '../components/basic-info';
import TrackSelection from '../components/select-track';
import AddPortfolioProjects from '../components/add-projects';
import { TalentOnboardTab, useTalentOnboardTab, useUserType } from '@/store/onboarding';
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
