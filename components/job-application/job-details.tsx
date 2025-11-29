import { skills } from '@/constants/job-applications';
import { Briefcase, Clock, DollarSign } from 'lucide-react';
import React from 'react';

const JobApplicationDetails = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
      {/* Job Details Section */}
      <div className="p-6 flex flex-col md:flex-row md:items-start md:space-x-6 border-b border-tertiary-50">
        {/* Main Job Details */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Job Details</h2>

          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">UI/UX Designer</h3>
              <p className="text-sm text-tertiary-300">
                Posted Yesterday • On site • Lagos, Nigeria
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-4 text-tertiary-300 text-sm">
            <p>
              Design and refine intuitive web interfaces that provide users with
              a seamless and visually engaging experience.
            </p>
            <p>
              Collaborate with developers and product teams to improve
              usability, accessibility, and performance across desktop
            </p>
            <p>
              and mobile platforms, ensuring consistent design standards and
              user satisfaction.
            </p>
          </div>

          <a href="#" className="text-primary-300 text-sm underline">
            View job posting
          </a>
        </div>

        {/* Job Info Cards */}
        <div className="mt-6 md:mt-0 md:w-1/3 grid grid-cols-1 gap-4 border-l border-tertiary-50">
          <div className="flex items-center gap-3 p-3 rounded-lg">
            <Briefcase className="w-5 h-5 text-tertiary-100" />
            <div>
              <p className="font-semibold text-sm">Entry Level</p>
              <p className="text-xs text-gray-600">Experience level</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg">
            <DollarSign className="w-5 h-5 text-tertiary-100" />
            <div>
              <p className="font-semibold text-sm">₦125,0000</p>
              <p className="text-xs text-gray-600">Project price</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg">
            <Clock className="w-5 h-5 text-tertiary-100" />
            <div>
              <p className="font-semibold text-sm">Full time</p>
              <p className="text-xs text-gray-600">Job type</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">Skills and Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="px-4 py-3 rounded-full border border-tertiary-50"
            >
              <p className="text-sm">{skill}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationDetails;
