import React, { Suspense } from 'react';
import CompanyOnboardingContent from './company-onboarding-content';
export default function page() {
  return (
    <Suspense>
      <CompanyOnboardingContent />
    </Suspense>
  );
}
