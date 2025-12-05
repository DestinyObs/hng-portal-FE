import ApplicantsPageClient from './applicants-page-client';
import { Suspense } from 'react';

export const metadata = {
  title: 'All Applicants',
};

export default function ApplicantsPage() {
  return (
    <Suspense>
      <ApplicantsPageClient />
    </Suspense>
  );
}