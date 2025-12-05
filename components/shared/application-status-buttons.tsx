'use client';

import { useState } from 'react';
import { updateApplicationStatus } from '@/app/api/actions/update-application-status';

interface ApplicationStatusButtonsProps {
  applicationId: string;
  companyId: string;
  jobId: string;
  currentStatus: string;
  onStatusUpdate: (newStatus: string) => void;
}

export default function ApplicationStatusButtons({
  applicationId,
  companyId,
  jobId,
  currentStatus,
  onStatusUpdate,
}: ApplicationStatusButtonsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async (
    newStatus: 'approved' | 'rejected' | 'pending',
  ) => {
    setIsLoading(true);
    try {
      const res = await updateApplicationStatus(
        companyId,
        jobId,
        applicationId,
        newStatus,
      );
      if (res.success) {
        onStatusUpdate(newStatus);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonBaseClasses =
    'px-4 py-2 rounded-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors';

  return (
    <div className="flex gap-3 flex-wrap">
      <button
        onClick={() => handleStatusChange('approved')}
        disabled={isLoading || currentStatus === 'approved'}
        className={`${buttonBaseClasses} bg-[#E0E7FF] text-[#3730A3] hover:bg-[#C7D2FE]`}
      >
        Shortlist Talent
      </button>

      <button
        onClick={() => handleStatusChange('rejected')}
        disabled={isLoading || currentStatus === 'rejected'}
        className={`${buttonBaseClasses} bg-[#FEF2F2] text-[#EF4444] hover:bg-[#FEE2E2]`}
      >
        Reject Talent
      </button>

      <button
        onClick={() => handleStatusChange('pending')}
        disabled={isLoading || currentStatus === 'pending'}
        className={`${buttonBaseClasses} bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]`}
      >
        Move to Applied
      </button>
    </div>
  );
}
