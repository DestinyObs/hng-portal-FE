'use client';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth';
import TalentJobCard from '@/components/dashboard/talent-job-card';
import Link from 'next/link';
import JobDetailModal from '@/components/dashboard/job-detail-modal';
import Image from 'next/image'; // Import Image

const mockJobs = [
  {
    id: '1',
    companyLogo: '/images/company-profile.png',
    jobTitle: 'UI/UX Designer',
    companyName: 'BrightLabs',
    isVerified: true,
    salary: '₦ 125,000',
    tags: ['Remote', 'Entry Level', 'Full time', 'Lagos, Nigeria'],
    skills: [
      'Proficiency in Figma, Adobe XD, or Sketch',
      'Excellent communication & collaboration skills',
      'Strong understanding of UX principles & design systems',
    ],
    postedDate: '09-05-2025',
    description:
      'Design and refine intuitive web interfaces that provide users with a seamless and visually engaging experience. Collaborate with developers and product teams to improve usability, accessibility, and performance across desktop and mobile platforms, ensuring consistent design standards and user satisfaction.',
  },
  {
    id: '2',
    companyLogo: '/images/company-profile.png',
    jobTitle: 'Graphics Designer',
    companyName: 'HNG',
    isVerified: true,
    salary: '₦ 125,000',
    tags: ['Remote', 'Entry Level', 'Full time', 'Lagos, Nigeria'],
    skills: ['Adobe Creative Suite', 'Illustration', 'Branding'],
    postedDate: '09-05-2025',
    description:
      'Design and refine intuitive web interfaces that provide users with a seamless and visually engaging experience...',
  },
  {
    id: '3',
    companyLogo: '/images/company-profile.png',
    jobTitle: 'UI/UX Designer',
    companyName: 'HNG',
    isVerified: true,
    salary: '₦ 125,000',
    tags: ['On-site', 'Mid Level', 'Contract', 'Abuja, Nigeria'],
    skills: ['User Research', 'Wireframing', 'Prototyping'],
    postedDate: '09-05-2025',
    description:
      'Design and refine intuitive web interfaces that provide users with a seamless and visually engaging experience...',
  },
  {
    id: '4',
    companyLogo: '/images/company-profile.png',
    jobTitle: 'Graphics Designer',
    companyName: 'BrightLabs',
    isVerified: true,
    salary: '₦ 125,000',
    tags: ['Hybrid', 'Senior Level', 'Full time', 'Lagos, Nigeria'],
    skills: ['Motion Graphics', 'Video Editing', 'After Effects'],
    postedDate: '09-05-2025',
    description:
      'Design and refine intuitive web interfaces that provide users with a seamless and visually engaging experience...',
  },
];

const mockDashboardCards = [
  { title: 'Job Applications', value: '21', footer: 'Applications Sent' },
  { title: 'Profile Views', value: '21', footer: 'Views this month' },
  { title: 'Save Jobs', value: '15', footer: 'Jobs Saved' },
];

// Define Job type based on mockJobs structure
type Job = (typeof mockJobs)[0];

const TalentDashboardPage = () => {
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleViewJob = (jobId: string) => {
    const job = mockJobs.find((j) => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const getIconAndBackground = (title: string) => {
    switch (title) {
      case 'Job Applications':
        return {
          icon: '/assets/dashboard/icons/briefcase.svg',
          bgColor: 'bg-green-100',
        };
      case 'Profile Views':
        return {
          icon: '/assets/dashboard/icons/people.svg',
          bgColor: 'bg-purple-100',
        };
      case 'Save Jobs':
        return {
          icon: '/assets/dashboard/icons/profile-tick.svg',
          bgColor: 'bg-blue-100',
        };
      default:
        return { icon: '', bgColor: 'bg-gray-200' };
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        {/* Welcome Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.firstname || 'Esther'}!
          </h1>
          <p className="text-gray-600">
            You&apos;re almost there. Complete your profile to unlock better job
            matches
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockDashboardCards.map((card, index) => {
            const { icon, bgColor } = getIconAndBackground(card.title);
            return (
              <div
                key={index}
                className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">{card.title}</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {card.value}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center`}
                  >
                    {icon && (
                      <Image
                        src={icon}
                        alt={card.title}
                        width={24}
                        height={24}
                      />
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{card.footer}</p>
                <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                  <div
                    className="bg-primary-blue h-1 rounded-full"
                    style={{ width: '70%' }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommended Jobs */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Recommended Jobs for You
          </h2>
          <Link href="#" className="text-sm text-black font-medium">
            View All Jobs
          </Link>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockJobs.map((job) => (
            <TalentJobCard key={job.id} job={job} onViewJob={handleViewJob} />
          ))}
        </div>
      </div>
      <JobDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        job={selectedJob}
      />
    </>
  );
};
export default TalentDashboardPage;
