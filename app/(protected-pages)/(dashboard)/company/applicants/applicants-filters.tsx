'use client';

import { useState } from 'react';
import { Search, ListFilter, ChevronDown, Trash } from 'lucide-react';

const statuses = ['Applied', 'Shortlisted', 'Rejected'] as const;

const statusTextStyles: Record<string, string> = {
  Applied: 'text-tertiary-200 bg-tertiary-50',
  Shortlisted: 'text-[#3730A3] bg-light-blue',
  Rejected: 'text-[#EF4444] bg-[#FEE2E2]',
};

const statusDotStyles: Record<string, string> = {
  Applied: 'bg-tertiary-200',
  Shortlisted: 'bg-[#3730A3]',
  Rejected: 'bg-[#EF4444]',
};

interface Props {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedRole: string;
  setSelectedRole: (r: string) => void;
  selectedStatus: string;
  setSelectedStatus: (s: string) => void;
}

export default function ApplicantsFilters({
  searchQuery,
  setSearchQuery,
  selectedRole,
  setSelectedRole,
  selectedStatus,
  setSelectedStatus,
}: Props) {
  const [showFilters, setShowFilters] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const uniqueRoles = Array.from(
    new Set(
      // we'll pass filtered data from parent later if needed
      // for now we just show the button
    )
  );

  const clearFilters = () => {
    setSelectedRole('');
    setSelectedStatus('');
    setShowFilters(false);
  };

  return (
    <div className="flex flex-col lg:items-center lg:justify-between lg:flex-row gap-3 mb-6">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-tertiary-100" />
        <input
          type="text"
          placeholder="Search"
          className="w-64 pl-10 pr-4 py-2 border border-tertiary-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-300 md:w-72 lg:w-96"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col-reverse gap-4 md:flex-row">
        {(showFilters || selectedStatus) && (
          <div className="relative">
            <div className="flex gap-2 lg:gap-5 items-center">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-tertiary-50"
              >
                <span className="text-tertiary-500 font-medium">
                  {selectedStatus || 'Job Status'}
                </span>
                <ChevronDown className="w-4 h-4 text-[#242533]" />
              </button>

              <Trash
                className="w-5 h-5 text-tertiary-100 cursor-pointer hover:text-tertiary-300"
                onClick={clearFilters}
              />
            </div>

            {openDropdown === 'status' && (
              <div className="absolute right-0 top-12 z-50 mt-1 w-48 p-3 bg-white rounded-lg shadow-lg border">
                {statuses.map((status) => (
                  <div
                    key={status}
                    className="px-3 py-2 text-sm rounded hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSelectedStatus(status);
                      setOpenDropdown(null);
                    }}
                  >
                    <div className={`flex items-center gap-2 py-1 px-2 rounded-2xl text-sm font-medium ${statusTextStyles[status]}`}>
                      <div className={`w-2 h-2 rounded-full ${statusDotStyles[status]}`} />
                      {status}
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
            if (showFilters) clearFilters();
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm text-[#344054] border border-tertiary-50 rounded-lg hover:bg-gray-50"
        >
          <ListFilter className="w-4 h-4 text-tertiary-100" />
          {showFilters ? 'Remove Filters' : 'Filters'}
        </button>
      </div>
    </div>
  );
}