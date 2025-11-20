import { Suspense } from 'react';
import TalentOnboardingContent from '../components/talent-onboarding';

export default function Page() {
  return (
    <Suspense>
      <TalentOnboardingContent />
    </Suspense>
  );
}
