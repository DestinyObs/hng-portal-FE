'use client';

import React, { useState } from 'react';
import { OctagonAlert, Paperclip } from 'lucide-react';
import JobApplicationDetails from './job-details';
import { Button } from '../ui/button';
import { PreviewProps } from '@/types/job-application-form';
import { Modal } from '../dashboard/modal';

const JobApplicationPreview: React.FC<PreviewProps> = ({
  data,
  onSubmit,
  onEdit,
}) => {
  const { cover_letter, portfolioLink, resume } = data;
  const file = resume instanceof FileList ? resume[0] : resume;
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  return (
    <div className="w-full mx-auto bg-gray-50 p-4 space-y-6">
      <JobApplicationDetails />

      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6 mb-14">
        {/* Cover Letter Preview */}
        <div className="py-3">
          <h2 className="text-xl font-semibold mb-2">Cover Letter</h2>

          <div className="border border-input rounded-lg p-4 bg-gray-50 min-h-[180px] whitespace-pre-line wrap-break-word overflow-auto">
            {cover_letter || 'No cover letter provided.'}
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

          {file ? (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
              <Paperclip size={18} />
              <span>{file.name}</span> {/* ✅ Now name exists */}
            </div>
          ) : (
            <p className="text-gray-400">No resume uploaded.</p>
          )}
        </div>
      </div>

      {/* Action Buttons  */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Button
            onClick={() => setShowApplicationModal(true)}
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

      <Modal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        title="Submit Application?"
        message="Are you sure you want to proceed with your job application?"
        icon={
          <div className="text-primary-300 flex items-center justify-center text-4xl bg-[#FEF0C7] rounded-full w-16 h-16">
            <OctagonAlert size={48} className="text-[#E3822A] " />
          </div>
        }
        primaryButton={{
          label: 'Yes, Submit',
          onClick: () => {
            onSubmit();
            setShowApplicationModal(false);
          },
        }}
        secondaryButton={{
          label: 'Cancel',
          onClick: () => setShowApplicationModal(false),
        }}
      />
    </div>
  );
};

export default JobApplicationPreview;
