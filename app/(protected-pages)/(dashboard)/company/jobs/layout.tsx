import DashboardNav from '@/components/dashboard/dashoard-nav';

import { companyDashboardNavLinks } from '@/constants/dashboard';
import { ReactNode } from 'react';

export default function Page({ children }: { children: ReactNode }) {
  return (
    <div>
      <DashboardNav tabs={companyDashboardNavLinks} />
      <div className="py-5">{children}</div>
    </div>
  );
}
