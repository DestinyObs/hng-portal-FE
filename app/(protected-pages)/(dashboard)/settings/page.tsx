'use client';

import { useAuthStore } from '@/store/auth';
import TalentAccountForm from '@/components/settings/account/talent-account-form';
import CompanyAccountForm from '@/components/settings/account/company-account-form';

export default function AccountPage() {
  const { user } = useAuthStore();

  if (user?.current_role === 'employer') {
    return <CompanyAccountForm />;
  }

  return <TalentAccountForm />;
}
