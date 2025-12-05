import { Suspense } from 'react';
import ApplicantsPageClient from './applicants-page-client';

export const metadata = {
  title: 'All Applicants',
};

export default function ApplicantsPage() {
  return (
    <Suspense fallback={<div>Loading applicants...</div>}>
      <ApplicantsPageClient />
    </Suspense>
  );
}
