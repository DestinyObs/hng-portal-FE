import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import React from 'react';
import GreenCheck from '@/public/assets/auth/icons/green-check';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { ConfirmationModalProps } from '@/types/modal';
import { useSkipToDashboard } from '@/hooks/use-skip-to-dashboard';

export default function ConfirmationModal({
  openDialog,
  setOpenDialog,
}: ConfirmationModalProps) {
  const { skipToDashboard } = useSkipToDashboard();
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent
        className="rounded-xl w-[90%]  max-w-[590px] border-none"
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogTitle className="hidden"></DialogTitle>
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          {/* Success Icon */}
          <div className="flex flex-col gap-3 justify-center items-center">
            {' '}
            <GreenCheck />
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900">
              Profile Setup Complete!
            </h2>
            {/* Description */}
            <p
              className="text-gray-600"
              style={{
                fontFamily: 'DM Sans',
              }}
            >
              Your company profile is now active. Start posting jobs and
              discover qualified talent faster.
            </p>
          </div>
          <DialogDescription className="border-t border-tertiary-50 w-full"></DialogDescription>
          {/* Go to Dashboard Button */}
          <DialogFooter className="w-full flex justify-center items-center">
            <Button
              onClick={() => skipToDashboard('/talent/dashboard')}
              className="bg-gray-900 hover:bg-gray-800 text-white px-4 h-10 rounded-lg"
              style={{ fontFamily: 'DM Sans' }}
            >
              Go to Dashboard
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
