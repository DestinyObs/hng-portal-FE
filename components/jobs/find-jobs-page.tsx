'use client';

import { useState, useCallback } from 'react'; // Import useCallback
import FiltersSidebar from './filters-sidebar';
import JobCard from './job-card';
import SearchBar from './search-bar';
import ApplyJobs from './apply-jobs';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'; // Import Loader2
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import { getTalentJobs } from '@/api/actions/talent'; // Import getTalentJobs
import { RawJob2, TalentJobsQueryParams } from '@/types/job-card'; // Import RawJob and TalentJobsQueryParams
import { toast } from 'sonner';

export default function FindJobsPage() {
  const [selectedJob, setSelectedJob] = useState<RawJob2 | null>(null);
  const [queryParams, setQueryParams] = useState<TalentJobsQueryParams>({
    page: 1,
    per_page: 10,
  });
  const [searchQuery, setSearchQuery] = useState<string>('');

  const {
    data: jobsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['talentFindJobs', { ...queryParams, search: searchQuery }],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey;
      return getTalentJobs(params as TalentJobsQueryParams);
    },
  });

  const jobs: RawJob2[] = jobsData?.data || [];
  // Assuming API response includes total pages or a way to determine it
  const totalPages = 5; // Placeholder, replace with actual data from API

  if (isError) {
    toast.error(error?.message || 'Failed to fetch jobs.');
  }

  const handleViewJob = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      setSelectedJob(job);
    }
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  const handlePageChange = useCallback((page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setQueryParams((prev) => ({ ...prev, page: 1 })); // Reset to first page on new search
  }, []);

  // Placeholder for filter changes, to be implemented when FiltersSidebar is updated
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
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              {['Explore Jobs', 'Applied (0)', 'Saved Jobs (1)'].map(
                (item, i) => (
                  <li key={item} className="flex items-center">
                    {i > 0 && (
                      <span className="mx-2 text-(--color-gray-100)">•</span>
                    )}
                    <span
                      className={
                        item === 'Explore Jobs'
                          ? 'font-semibold text-(--color-primary-blue)'
                          : 'text-(--color-gray-100)'
                      }
                    >
                      {item}
                    </span>
                  </li>
                ),
              )}
            </ol>
          </nav>

          <div className="mb-10">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="flex gap-8 lg:gap-10 items-start">
            <aside className="hidden lg:block w-80 shrink-0">
              <div className="sticky top-8">
                <h2 className="mb-6 text-lg font-semibold text-(--color-gray-500)">
                  Recommended Jobs for You
                </h2>
                <FiltersSidebar onFilterChange={handleFilterChange} />
              </div>
            </aside>

            {/* Job Listings */}
            <section className="flex-1 min-w-0">
              <h1 className="mb-8 text-2xl font-semibold text-(--color-gray-500) lg:hidden">
                Recommended Jobs for You
              </h1>

              <div className="space-y-6">
                {isLoading ? (
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

              {/* Pagination */}
              {jobs.length > 0 && (
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
                    {/* <span className="px-2 text-(--color-gray-100)">...</span> */}
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
            </section>
          </div>
        </main>
      </div>

      {selectedJob && (
        <ApplyJobs job={selectedJob} onClose={handleCloseModal} />
      )}
    </>
  );
}
