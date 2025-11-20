'use client';

import { useSearchParams } from 'next/navigation';
import OnboardLayout from '../components/onboard-layout';
import Welcome from '../components/welcome';
import BasicInformation from '../components/basic-info';
import TrackSelection from '../components/select-track';
import AddPortfolioProjects from '../components/add-projects';

const Page = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');

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
export default Page;
