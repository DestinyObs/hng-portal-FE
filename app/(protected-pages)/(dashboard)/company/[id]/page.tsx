'use client';
import React from 'react';
import { Tabs } from '@/components/shared/ui/tabs';
import AllApplicants from './all-applicants';
import Candidatelists from './candidate-lists';

interface ApplicantsPageProps {
  params: {
    id: string; // This is the company_id from the route
  };
}

export default function ApplicantsPage({ params }: ApplicantsPageProps) {
  const { id: company_id } = params;

  const tabsData = [
    {
      value: 'all',
      tabsName: 'All Applicants',
      TabView: () => <AllApplicants company_id={company_id} />,
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
