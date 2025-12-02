'use client';

import React, { useEffect, useState } from 'react';
import { Search, ListFilter, ChevronDown, Trash, Loader2 } from 'lucide-react';
import { columns, Applicant } from '@/components/shared/applicants-column';
import { DataTable } from '@/components/shared/ui/data-table';
import { JobApplicationItem } from '@/types/view-job-applicants';
import { view_applicants_per_company } from '@/api/actions/view-applicants';
import { useAuthStore } from '@/store/auth';

// interface AllApplicantsProps {
//   company_id: string;
//   job_id: string;
// }

export default function AllApplicants() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<string>('');
  const [selectedStatus, setSelectedStatus] = React.useState<string>('');
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const { user } = useAuthStore();
  const company_id = user?.company?.id;

  // New states for data fetching
  const [applicationsData, setApplicationsData] = useState<
    JobApplicationItem[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const statuses = ['Applied', 'Shortlisted', 'Rejected'];

  const statusTextStyles: Record<string, string> = {
    Applied: 'text-tertiary-200 bg-tertiary-50 ',
    Shortlisted: 'text-[#3730A3] bg-light-blue',
    Rejected: 'text-[#EF4444] bg-[#FEE2E2]',
  };

  const statusDotStyles: Record<string, string> = {
    Applied: 'bg-tertiary-200',
    Shortlisted: 'bg-[#3730A3]',
    Rejected: 'bg-[#EF4444]',
  };

  // Fetch applicants data
  // Fetch applicants data
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (company_id) {
          const response = await view_applicants_per_company(company_id);

          if (response.success && response.data) {
            setApplicationsData(response.data.applications);
          } else {
            setError('Failed to fetch applicants');
          }
        }
      } catch (err) {
        console.error('Caught error:', err);
        setError('An error occurred while fetching applicants');
      } finally {
        setIsLoading(false);
      }
    };

    if (company_id) {
      fetchApplicants();
    }
  }, [company_id]);

  // Transform API data to match table format
  const transformedData: Applicant[] = React.useMemo(() => {
    return applicationsData.map((application) => ({
      id: application.id,
      name: `${application.user.firstname} ${application.user.lastname}`,
      email: application.user.email,
      applied_role: 'application.job.title',
      status:
        application.status === 'pending'
          ? 'Applied'
          : application.status === 'approved'
            ? 'Shortlisted'
            : 'Rejected',
      applied_date: new Date(application.date_added).toLocaleDateString(
        'en-US',
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        },
      ),
    }));
  }, [applicationsData]);

  const filteredData = React.useMemo(() => {
    let filtered = transformedData;

    if (searchQuery) {
      filtered = filtered.filter(
        (applicant) =>
          applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          applicant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          applicant.applied_role
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedRole) {
      filtered = filtered.filter((a) => a.applied_role === selectedRole);
    }

    if (selectedStatus) {
      filtered = filtered.filter((a) => a.status === selectedStatus);
    }

    return filtered;
  }, [transformedData, searchQuery, selectedRole, selectedStatus]);

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full min-h-screen py-4">
        <div className="bg-white p-6 rounded-2xl">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary-300" />
            <span className="ml-2 text-tertiary-500">
              Loading applicants...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full min-h-screen py-4">
        <div className="bg-white p-6 rounded-2xl">
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary-300 text-white rounded-lg hover:bg-primary-400"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-4">
      <div className="bg-white py-6 px-4 rounded-2xl">
        <div className="flex flex-col lg:items-center lg:justify-between lg:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-tertiary-100" />
            <input
              type="text"
              placeholder="Search"
              className="w-64 pl-10 pr-4 py-2 border border-tertiary-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-transparent md:w-72 lg:w-96"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col-reverse gap-4 md:flex-row">
            {showFilters && (
              <div className="relative">
                <div className="flex gap-2 lg:gap-5 items-center cursor-pointer">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === 'status' ? null : 'status',
                      )
                    }
                    className="flex items-center gap-2 px-1.5 py-2 text-sm rounded-lg bg-tertiary-50 justify-between cursor-pointer"
                  >
                    <span className="text-tertiary-500 font-medium">
                      {selectedStatus || 'Job Status'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-[#242533]" />
                  </button>
                  <Trash
                    className="w-4 h-4 text-tertiary-100 cursor-pointer"
                    onClick={() => {
                      setShowFilters(!showFilters);
                      if (showFilters) {
                        setSelectedRole('');
                        setSelectedStatus('');
                      }
                    }}
                  />
                </div>
                {openDropdown === 'status' && (
                  <div className="absolute right-9 top-12 z-50 mt-1 w-auto p-4 bg-white rounded-lg shadow-lg">
                    {statuses.map((status) => (
                      <div
                        key={status}
                        className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setSelectedStatus(status);
                          setOpenDropdown(null);
                        }}
                      >
                        <div
                          className={`flex items-center gap-2 rounded-2xl w-auto py-0.5 px-2 font-medium text-sm ${statusTextStyles[status]}`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${statusDotStyles[status]}`}
                          ></div>
                          <span>{status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => {
                setShowFilters(!showFilters);
                if (showFilters) {
                  setSelectedRole('');
                  setSelectedStatus('');
                }
              }}
              className="w-fit flex items-center gap-2 px-3 py-2 text-sm text-[#344054] border border-tertiary-50 rounded-lg cursor-pointer"
            >
              <ListFilter className="w-4 h-4 text-tertiary-100" />
              {showFilters ? 'Remove Filters' : 'Filters'}
            </button>
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="text-center py-12 text-tertiary-500">
            No applicant found
          </div>
        ) : (
          <section className="w-72 md:w-160 lg:w-full">
            <DataTable columns={columns} data={filteredData} />
          </section>
        )}
      </div>
    </div>
  );
}
