'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApplicants } from './use-applicants.hook';
import { createColumns } from '@/components/shared/applicants-column';
import ApplicantsFilters from './applicants-filters';
import ApplicantsTable from './applicants-table';

export default function ApplicantsPageClient() {
  const searchParams = useSearchParams();
  const { data, company_id } = useApplicants(); // removed unused isLoading, error

  const urlJobId = searchParams.get('jobId');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [preSelectedJobId, setPreSelectedJobId] = useState<string | null>(null);

  // Auto-apply job filter from URL on first load
  useEffect(() => {
    if (!urlJobId) return;

    // Micro-task to safely update state
    const timeout = setTimeout(() => {
      setPreSelectedJobId(urlJobId);
    }, 0);

    return () => clearTimeout(timeout);
  }, [urlJobId]);

  const columns = createColumns(company_id!);

  const filteredData = data.filter((applicant) => {
    // Pre-filter by jobId from URL (if present)
    if (preSelectedJobId && applicant.job_id !== preSelectedJobId) {
      return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        applicant.name.toLowerCase().includes(q) ||
        applicant.email.toLowerCase().includes(q) ||
        applicant.applied_role?.toLowerCase().includes(q)
      );
    }
    if (selectedRole && applicant.applied_role !== selectedRole) return false;
    if (selectedStatus && applicant.status !== selectedStatus) return false;

    return true;
  });

  // Optional: give user a way to clear the pre-filter
  const clearJobFilter = () => setPreSelectedJobId(null);

  return (
    <div className="w-full min-h-screen py-4">
      <div className="bg-white py-6 px-4 rounded-2xl">
        {preSelectedJobId && (
          <div className="mb-4 text-sm text-tertiary-500">
            Showing applicants for job ID: {preSelectedJobId}{' '}
            <button
              onClick={clearJobFilter}
              className="ml-2 underline hover:text-primary-300"
            >
              Clear filter
            </button>
          </div>
        )}

        <ApplicantsFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        <ApplicantsTable data={filteredData} columns={columns} />
      </div>
    </div>
  );
}
