'use client';

import React from 'react';
import { Paperclip } from 'lucide-react';
import JobApplicationDetails from './job-details';
import { Button } from '../ui/button';
import { PreviewProps } from '@/types/job-application-form';

// The preview page receives the form data as props
const JobApplicationPreview: React.FC<PreviewProps> = ({
  data,
  onSubmit,
  onEdit,
}) => {
  const { coverLetter, portfolioLink, resume } = data;

  return (
    <div className="max-w-[1120px] mx-auto bg-gray-50 p-4 space-y-6">
      <JobApplicationDetails />

      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6 mb-14">
        {/* Cover Letter Preview */}
        <div className="py-3">
          <h2 className="text-xl font-semibold mb-2">Cover Letter</h2>

          <div className="border border-input rounded-lg p-4 bg-gray-50 min-h-[180px] whitespace-pre-line">
            {coverLetter || 'No cover letter provided.'}
          </div>
        </div>

        {/* Portfolio Link Preview */}
        <div className="py-3">
          <p className="text-md text-gray-500 mb-4">Portfolio Link</p>
          {portfolioLink ? (
            <a
              href={portfolioLink}
              target="_blank"
              className="text-primary-300 underline"
            >
              {portfolioLink}
            </a>
          ) : (
            <p className="text-gray-400">No portfolio link provided.</p>
          )}
        </div>

        {/* Resume Preview */}
        <div className="py-3">
          <p className="block text-lg font-medium mb-3 text-gray-500">
            Attachment
          </p>

          {resume && resume.length > 0 ? (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
              <Paperclip size={18} />
              <span>{resume[0].name}</span>
            </div>
          ) : (
            <p className="text-gray-400">No resume uploaded.</p>
          )}
        </div>
      </div>

      {/* Action Buttons  */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex justify-between gap-4">
          <Button
            onClick={onSubmit}
            variant={'default'}
            className="cursor-pointer"
          >
            Submit
          </Button>
          <Button
            variant="outline"
            className="border-primary-300 text-gray-500"
            onClick={onEdit}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPreview;
