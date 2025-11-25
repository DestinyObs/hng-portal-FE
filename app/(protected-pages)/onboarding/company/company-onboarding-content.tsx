'use client';
import { useSearchParams } from 'next/navigation';
import OnboardLayout from '../components/onboard-layout';
import Welcome from './welcome';
import UserIdentityForm from './profile-setup/user-identity-form';
import FormContainer from './components/form-container';
import CompanyDetailsForm from './profile-detail/company-details-form';
import {
  useUserType,
  useCompanyOnboardTab,
  CompanyOnboardTab,
} from '@/store/onboarding';
import Navigation from '../components/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
const CompanyOnboardingContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get('page');
  const setUserType = useUserType((state) => state.setUserType);
  const setTabs = useCompanyOnboardTab((state) => state.setTabs);

  useEffect(() => {
    setUserType('company');
    if (page) {
      setTabs(page as CompanyOnboardTab);
    }
  }, [page, setUserType, setTabs]);

  return (
    <>
      {page === 'profile-setup' ? (
        <OnboardLayout>
          <FormContainer
            formHeader="Company Identity"
            formSubtitle="Set Up Your Company Identity"
          >
            <UserIdentityForm />
          </FormContainer>
        </OnboardLayout>
      ) : page === 'company-detail' ? (
        <OnboardLayout>
          <FormContainer
            formHeader="Company Details"
            formSubtitle="Add Company Detail"
          >
            <CompanyDetailsForm />
          </FormContainer>
          <Navigation
            rightButtonText={'Skip'}
            rightButtonAction={() => router.push('/dashboard')}
          />
        </OnboardLayout>
      ) : (
        <Welcome />
      )}
    </>
  );
};
export default CompanyOnboardingContent;
