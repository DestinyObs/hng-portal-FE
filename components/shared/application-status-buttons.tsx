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

export function ApplicationStatusButtons({
  applicationId,
  companyId,
  jobId,
  currentStatus,
  onStatusUpdate,
}: ApplicationStatusButtonsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<{
    status: 'pending' | 'approved' | 'rejected';
    label: string;
  } | null>(null);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleStatusChange = async () => {
    if (!selectedAction) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await updateApplicationStatus(
        companyId,
        jobId,
        applicationId,
        selectedAction.status,
      );

      if (response.success) {
        setMessage({
          type: 'success',
          text: `Successfully ${selectedAction.label.toLowerCase()}!`,
        });
        onStatusUpdate(selectedAction.status);
      } else {
        setMessage({
          type: 'error',
          text:
            response.message || 'Failed to update status. Please try again.',
        });
      }
    } catch {
      setMessage({
        type: 'error',
        text: 'An error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
      setShowModal(false);
      setSelectedAction(null);
    }
  };

  const openConfirmation = (
    status: 'pending' | 'approved' | 'rejected',
    label: string,
  ) => {
    setSelectedAction({ status, label });
    setShowModal(true);
  };

  return (
    <div className="mt-6">
      {message && (
        <div
          className={`mb-4 p-3 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => openConfirmation('approved', 'Shortlist Talent')}
          disabled={isLoading || currentStatus === 'approved'}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium text-[#3730A3] bg-[#E0E7FF] hover:bg-[#C7D2FE] disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Shortlist Talent
        </button>

        <button
          onClick={() => openConfirmation('rejected', 'Reject Talent')}
          disabled={isLoading || currentStatus === 'rejected'}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium text-[#EF4444] bg-[#FEF2F2] hover:bg-[#FEE2E2] disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Reject Talent
        </button>

        <button
          onClick={() => openConfirmation('pending', 'Move to Applied')}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium text-[#6B7280] bg-[#F3F4F6] hover:bg-[#E5E7EB] disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Move to Applied
        </button>
      </div>

      {showModal && selectedAction && (
        <div
          className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              Confirm Action
            </h3>
            <p className="text-gray-700 mb-6 text-base">
              Are you sure you want to{' '}
              <strong className="text-gray-900">
                {selectedAction.label.toLowerCase()}
              </strong>
              ?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedAction(null);
                }}
                disabled={isLoading}
                className="px-5 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusChange}
                disabled={isLoading}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium transition"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
