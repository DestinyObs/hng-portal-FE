'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { change_applicant_status } from '@/api/actions/view-applicants';

type StatusType = 'pending' | 'shortlisted' | 'rejected';

const VALID_STATUSES: StatusType[] = ['pending', 'shortlisted', 'rejected'];

const isValidStatus = (value: string): value is StatusType =>
  VALID_STATUSES.includes(value as StatusType);

const statusLabels: Record<StatusType, string> = {
  pending: 'Applied',
  shortlisted: 'Shortlisted',
  rejected: 'Rejected',
};

type Props = {
  company_id: string;
  job_id: string;
  applicant_id: string;
  currentStatus: string;
};

const ApplicantStatusPanel = ({
  company_id,
  job_id,
  applicant_id,
  currentStatus,
}: Props) => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<StatusType | null>(null);

  const status: StatusType = isValidStatus(currentStatus)
    ? currentStatus
    : 'pending';

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: change_applicant_status,
    onSuccess: (res, payload) => {
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ['single_applicant_view', applicant_id],
        });
        toast.success(
          payload.status === 'shortlisted'
            ? 'Talent successfully shortlisted'
            : payload.status === 'rejected'
              ? 'Talent successfully rejected'
              : 'Talent marked as pending',
        );
      } else {
        toast.error('Status update failed.');
      }
      setShowModal(false);
    },
    onError: () => {
      toast.error('Failed to update status. Try again.');
      setShowModal(false);
    },
  });

  const confirmStatusChange = () => {
    if (!selectedStatus) return;
    updateStatus({
      company_id,
      job_id,
      applicant_id,
      status: selectedStatus,
    });
  };

  const handleStatusClick = (newStatus: StatusType) => {
    if (newStatus === status) return;
    setSelectedStatus(newStatus);
    setShowModal(true);
  };

  const renderStatusButton = (
    buttonStatus: StatusType,
    activeClasses: string,
    idleClasses: string,
    dotColor: string,
  ) => {
    const isActive = status === buttonStatus;
    return (
      <button
        onClick={() => handleStatusClick(buttonStatus)}
        disabled={isPending || isActive}
        className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all border flex items-center justify-center gap-2 disabled:opacity-50 wrap-break-word ${
          isActive ? activeClasses : idleClasses
        }`}
      >
        <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
        {statusLabels[buttonStatus]}
      </button>
    );
  };

  return (
    <>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              disabled={isPending}
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-semibold mb-2">
              Confirm Status Change
            </h3>
            <p className="text-gray-600 mb-6 wrap-break-word">
              {selectedStatus === 'shortlisted'
                ? 'Are you sure you want to shortlist this talent?'
                : selectedStatus === 'rejected'
                  ? 'Are you sure you want to reject this talent?'
                  : 'Are you sure you want to mark this talent as pending?'}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={isPending}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                disabled={isPending}
                className="flex-1 px-4 py-2.5 bg-primary-300 text-white rounded-lg"
              >
                {isPending ? 'Updating...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Panel */}
      <Card className="border border-gray-200 sticky top-6">
        <CardContent className="p-6">
          <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide">
            Application Status
          </h3>

          <div className="space-y-3">
            {renderStatusButton(
              'pending',
              'bg-tertiary-50 text-tertiary-200 border-tertiary-200 cursor-default',
              'bg-white text-tertiary-200 border-gray-200 hover:border-tertiary-200 hover:bg-tertiary-50',
              'bg-tertiary-200',
            )}

            {renderStatusButton(
              'shortlisted',
              'bg-light-blue text-[#3730A3] border-[#3730A3] cursor-default',
              'bg-white text-[#3730A3] border-gray-200 hover:border-[#3730A3] hover:bg-light-blue',
              'bg-[#3730A3]',
            )}

            {renderStatusButton(
              'rejected',
              'bg-[#FEE2E2] text-[#EF4444] border-[#EF4444] cursor-default',
              'bg-white text-[#EF4444] border-gray-200 hover:border-[#EF4444] hover:bg-[#FEE2E2]',
              'bg-[#EF4444]',
            )}
          </div>

          <p className="mt-4 pt-4 border-t text-xs text-center text-gray-500 wrap-break-word">
            Current status:
            <span className="font-semibold text-gray-700 ml-1">
              {statusLabels[status]}
            </span>
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default ApplicantStatusPanel;
