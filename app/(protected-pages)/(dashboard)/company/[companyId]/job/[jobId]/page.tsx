// import React from 'react';
// import { Tabs } from '@/components/shared/ui/tabs';
// import AllApplicants from './all-applicants';

// interface ApplicantsPageProps {
//   params: {
//     companyId: string;
//     jobId: string;
//   };
// }

// export default async function ApplicantsPage({ params }: ApplicantsPageProps) {
//   const { companyId: company_id, jobId: job_id } = await params;

//   const tabsData = [
//     {
//       value: 'all',
//       tabsName: 'All Applicants',
//       TabView: () => <AllApplicants company_id={company_id} job_id={job_id} />,
//     },
//     // {
//     //   value: 'lists',
//     //   tabsName: 'Candidates List',
//     //   TabView: () => <Candidatelists />,
//     // },
//   ];

//   return (
//     <div className="w-full min-h-screen py-4">
//       <Tabs tabs={tabsData} variant="ghost" />
//     </div>
//   );
// }
