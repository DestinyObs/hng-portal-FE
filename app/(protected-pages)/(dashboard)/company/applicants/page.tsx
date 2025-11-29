import React from 'react';
import { Tabs } from '@/components/shared/ui/tabs';
import AllApplicants from './all-applicants';
import Candidatelists from './candidate-lists';

// interface ApplicantsPageProps {
//   params: {
//     companyId: string;
//   };
// }

export default async function ApplicantsPage() {
  // export default async function ApplicantsPage({ params }: ApplicantsPageProps) {
  // const { companyId: company_id } = await params;

  const tabsData = [
    {
      value: 'all',
      tabsName: 'All Applicants',
      TabView: () => <AllApplicants />,
    },
    {
      value: 'lists',
      tabsName: 'Candidates List',
      TabView: () => <Candidatelists />,
    },
  ];

  return (
    <div className="w-full min-h-screen px-6 py-4">
      <Tabs tabs={tabsData} variant="ghost" />
    </div>
  );
}
