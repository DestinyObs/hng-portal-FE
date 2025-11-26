'use client';

import { useState } from 'react';
import FiltersSidebar from './filters-sidebar';
import JobCard from './job-card';
import SearchBar from './search-bar';
// import FindJobsHeader from './find-jobs-header';
import ApplyJobs from './apply-jobs';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const mockJobs = [
  {
    id: 1,
    title: 'UI/UX Designer',
    company: 'BrightLabs',
    salary: '₦125,000',
    type: 'Remote • Entry Level • Freelance',
    location: 'Lagos, Nigeria',
    posted: '09-05-2025',
    image: '/images/profile.png',
  },
  {
    id: 2,
    title: 'Visual Designer',
    company: 'BrightLabs',
    salary: '₦100,000',
    type: 'Remote • Entry Level • Freelance',
    location: 'Lagos, Nigeria',
    posted: '09-05-2025',
    image: '/images/profile.png',
  },
  {
    id: 3,
    title: 'Graphics Designer',
    company: 'BrightLabs',
    salary: '₦100,000',
    type: 'Remote • Entry Level • Freelance',
    location: 'Lagos, Nigeria',
    posted: '09-05-2025',
    image: '/images/profile.png',
  },
];

export default function FindJobsPage() {
  const [selectedJob, setSelectedJob] = useState<(typeof mockJobs)[0] | null>(
    null,
  );

  return (
    <>
      <div className="min-h-screen bg-(--color-white-100)">
        {/* <FindJobsHeader /> */}

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
            <SearchBar />
          </div>

          <div className="flex gap-8 lg:gap-10 items-start">
            <aside className="hidden lg:block w-80 shrink-0">
              <div className="sticky top-8">
                <h2 className="mb-6 text-lg font-semibold text-(--color-gray-500)">
                  Recommended Jobs for You
                </h2>
                <FiltersSidebar />
              </div>
            </aside>

            {/* Job Listings */}
            <section className="flex-1 min-w-0">
              <h1 className="mb-8 text-2xl font-semibold text-(--color-gray-500) lg:hidden">
                Recommended Jobs for You
              </h1>

              <div className="space-y-6">
                {mockJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    {...job}
                    onClick={() => setSelectedJob(job)}
                  />
                ))}
              </div>

              <div className="mt-12 flex items-center justify-center gap-5 py-2">
                <button
                  className="flex items-center font-medium text-[.85rem] text-(--color-gray-100) hover:text-(--color-gray-300) disabled:text-(--color-gray-75)"
                  disabled
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`px-3 py-1 rounded-sm font-medium transition ${
                        page === 1
                          ? 'bg-(--color-primary-50) text-(--color-primary-blue)'
                          : 'text-(--color-gray-100) hover:bg-(--color-gray-50)'
                      }`}
                    >
                      {page.toString().padStart(2, '0')}
                    </button>
                  ))}
                  <span className="px-2 text-(--color-gray-100)">...</span>
                </div>
                <button className="flex items-center font-medium text-[.85rem] text-(--color-gray-100) hover:text-(--color-gray-300)">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>

      {selectedJob && (
        <ApplyJobs job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </>
  );
}
