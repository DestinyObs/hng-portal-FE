'use client';

import { useState, useCallback } from 'react'; // Import useCallback
import FiltersSidebar from './filters-sidebar';
import JobCard from './job-card';
import SearchBar from './search-bar';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'; // Import Loader2
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import { getTalentJobs, getSavedJobs } from '@/api/actions/talent'; // Import getTalentJobs and getSavedJobs
import { RawJob2, TalentJobsQueryParams } from '@/types/job-card'; // Import RawJob and TalentJobsQueryParams
import { toast } from 'sonner';
import { TalentJobsResponse } from '@/types/api-response'; // Import TalentJobsResponse

export default function FindJobsPage() {
  const [queryParams, setQueryParams] = useState<TalentJobsQueryParams>({
    page: 1,
    per_page: 10,
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'explore' | 'saved'>('explore');

  const {
    data: jobsData,
    isLoading: isLoadingJobs,
    isError: isErrorJobs,
    error: errorJobs,
  } = useQuery<TalentJobsResponse, Error>({
    queryKey: [
      'talentFindJobs',
      { ...queryParams, ...(searchQuery && { search: searchQuery }) },
    ],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey;
      return getTalentJobs(params as TalentJobsQueryParams);
    },
  });

  const {
    data: savedJobsData,
    isLoading: isLoadingSavedJobs,
    isError: isErrorSavedJobs,
    error: errorSavedJobs,
  } = useQuery<RawJob2[], Error>({
    queryKey: ['savedJobs'],
    queryFn: async () => {
      const response = await getSavedJobs();
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch saved jobs.');
      }
      return response.data || [];
    },
  });

  const jobs: RawJob2[] = jobsData?.data || [];
  const totalJobsCount = jobsData?.total || 0;
  const savedJobs: RawJob2[] = savedJobsData || [];
  const savedJobsCount = savedJobs.length;

  // Pagination is currently disabled by mentor instruction
  // const totalPages = jobsData?.last_page || 1;

  console.log('Final jobsData object:', jobsData); // Temporary debug line

  if (isErrorJobs) {
    toast.error(errorJobs?.message || 'Failed to fetch jobs.');
  }
  if (isErrorSavedJobs) {
    toast.error(errorSavedJobs?.message || 'Failed to fetch saved jobs.');
  }

  const handlePageChange = useCallback((page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setQueryParams((prev) => ({ ...prev, page: 1 })); // Reset to first page on new search
  }, []);

  const handleFilterChange = useCallback(
    (newFilters: Partial<TalentJobsQueryParams>) => {
      setQueryParams((prev) => ({ ...prev, ...newFilters, page: 1 })); // Reset to first page on new filters
    },
    [],
  );

  return (
    <>
      <div className="min-h-screen bg-(--color-white-100)">
        <main className="mx-auto max-w-[1440px] px-6 py-8 md:px-12 lg:px-20 xl:px-32">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('explore')}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === 'explore'
                  ? 'border-b-2 border-primary-blue text-primary-blue'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Explore Jobs ({totalJobsCount})
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === 'saved'
                  ? 'border-b-2 border-primary-blue text-primary-blue'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Your Saved Jobs ({savedJobsCount})
            </button>
          </div>

          <div className="mb-10">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="flex gap-8 lg:gap-10 items-start">
            <aside className="hidden lg:block w-80 shrink-0">
              <div className="sticky top-8">
                <h2 className="mb-6 text-lg font-semibold text-(--color-gray-500)">
                  Filters
                </h2>
                <FiltersSidebar onFilterChange={handleFilterChange} />
              </div>
            </aside>

            {/* Job Listings */}
            <section className="flex-1 min-w-0">
              <h1 className="mb-8 text-2xl font-semibold text-(--color-gray-500) lg:hidden">
                Recommended Jobs for You
              </h1>

              {activeTab === 'explore' && (
                <div className="space-y-6">
                  {isLoadingJobs ? (
                    <div className="col-span-full flex justify-center items-center h-48">
                      <Loader2 className="h-10 w-10 animate-spin text-primary-blue" />
                    </div>
                  ) : jobs.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500">
                      No jobs found.
                    </div>
                  ) : (
                    jobs.map((job) => <JobCard key={job.id} job={job} />)
                  )}
                </div>
              )}

              {activeTab === 'saved' && (
                <div className="space-y-6">
                  {isLoadingSavedJobs ? (
                    <div className="col-span-full flex justify-center items-center h-48">
                      <Loader2 className="h-10 w-10 animate-spin text-primary-blue" />
                    </div>
                  ) : savedJobs.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500">
                      You have no saved jobs.
                    </div>
                  ) : (
                    savedJobs.map((job) => <JobCard key={job.id} job={job} />)
                  )}
                </div>
              )}

              {/* Pagination (currently disabled as per mentor instructions) */}
              {/*
              {jobs.length > 0 && activeTab === 'explore' && (
                <div className="mt-12 flex items-center justify-center gap-5 py-2">
                  <button
                    className="flex items-center font-medium text-[.85rem] text-(--color-gray-100) hover:text-(--color-gray-300) disabled:text-(--color-gray-75)"
                    disabled={queryParams.page === 1}
                    onClick={() => handlePageChange(queryParams.page! - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <div className="flex items-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          className={`px-3 py-1 rounded-sm font-medium transition ${
                            page === queryParams.page
                              ? 'bg-(--color-primary-50) text-(--color-primary-blue)'
                              : 'text-(--color-gray-100) hover:bg-(--color-gray-50)'
                          }`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page.toString().padStart(2, '0')}
                        </button>
                      ),
                    )}
                  </div>
                  <button
                    className="flex items-center font-medium text-[.85rem] text-(--color-gray-100) hover:text-(--color-gray-300)"
                    disabled={queryParams.page === totalPages}
                    onClick={() => handlePageChange(queryParams.page! + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
              */}
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
