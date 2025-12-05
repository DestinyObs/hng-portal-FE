'use client';

import React from 'react';
import { Paperclip } from 'lucide-react';
import JobApplicationDetails from './job-details';
import { Button } from '../ui/button';
import { PreviewProps } from '@/types/job-application-form';
import { useRouter } from 'next/navigation';

const JobApplicationPreview: React.FC<PreviewProps> = ({
  data,
  onSubmit,
  onEdit,
}) => {
  const { cover_letter, portfolioLink, resume } = data;
  const [loading, setLoading] = React.useState(false);

  const file = resume instanceof FileList ? resume[0] : resume;
  const router = useRouter();
  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit();
    setLoading(false);
  };

  return (
    <div className="w-full mx-auto bg-gray-50 p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      <JobApplicationDetails />

      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 space-y-4 sm:space-y-6 mb-14">
        {/* Cover Letter Preview */}
        <div className="py-2 sm:py-3">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">
            Cover Letter
          </h2>

          <div
            className="border border-input rounded-lg p-3 sm:p-4 bg-gray-50 min-h-[140px] sm:min-h-[180px]
                  whitespace-pre-line wrap-break-word w-full overflow-hidden text-sm sm:text-base"
          >
            {cover_letter || 'No cover letter provided.'}
          </div>
        </div>

        {/* Portfolio Link Preview */}
        <div className="py-2 sm:py-3">
          <p className="text-sm sm:text-md text-gray-500 mb-3 sm:mb-4">
            Portfolio Link
          </p>
          {portfolioLink ? (
            <a
              href={portfolioLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-300 underline break-all text-sm sm:text-base hover:text-primary-400 transition-colors"
            >
              {portfolioLink}
            </a>
          ) : (
            <p className="text-gray-400 text-sm sm:text-base">
              No portfolio link provided.
            </p>
          )}
        </div>

        {/* Resume Preview */}
        <div className="py-2 sm:py-3">
          <p className="block text-base sm:text-lg font-medium mb-2 sm:mb-3 text-gray-500">
            Attachment
          </p>

          {file ? (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 overflow-hidden">
              <Paperclip size={18} className="shrink-0" />
              <span className="truncate text-sm sm:text-base">{file.name}</span>
            </div>
          ) : (
            <p className="text-gray-400 text-sm sm:text-base">
              No resume uploaded.
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons  */}
      <div className=" bottom-0 left-0 right-0 bg-white p-4 sm:relative  sm:bg-transparent sm:p-0 max-w-[850px]">
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mx-auto sm:justify-between">
          <Button
            variant="outline"
            className="border-[#E7E7E7] text-[#344054] w-full sm:w-auto"
            onClick={() => router.push('/talent/dashboard')}
          >
            Cancel
          </Button>

          <div className="flex flex-col-reverse md:flex-row gap-3 sm:gap-4">
            <Button
              variant="outline"
              className="border-primary-300 text-gray-500 w-full xs:w-auto"
              onClick={onEdit}
            >
              Edit
            </Button>

            <Button
              onClick={handleSubmit}
              variant={'default'}
              className="cursor-pointer w-full xs:w-auto"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPreview;
