import React from 'react';
import { Button } from '../ui/button';
import { ModalProps } from '@/types/modal';

// Reusable Modal Component
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  primaryButton,
  secondaryButton,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(36, 36, 36, 0.50)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <h2 className="text-lg font-bold text-tertiary-500 mb-3 text-center">
          {title}
        </h2>

        <p className="text-sm text-gray-200 text-center mb-6">{message}</p>

        <div className="flex gap-3 justify-end">
          {secondaryButton && (
            <div className="">
              <Button
                onClick={secondaryButton.onClick}
                variant="outlineGray"
                className="border-black-50"
              >
                {secondaryButton.label}
              </Button>
            </div>
          )}

          {primaryButton && (
            <div className="">
              <Button onClick={primaryButton.onClick} variant="default">
                {primaryButton.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
