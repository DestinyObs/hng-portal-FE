'use client';

import React from 'react';

interface Applicant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'Pending' | 'Reviewed' | 'Hired' | 'Rejected';
}

const applicants: Applicant[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    status: 'Pending',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'Reviewed',
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '987-654-3210',
    status: 'Hired',
  },
];

const ApplicantsPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Applicants</h1>
    </div>
  );
};

export default ApplicantsPage;
