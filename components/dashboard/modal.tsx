import React from 'react';
import { Button } from '../ui/button';
import { ModalProps } from '@/types/modal';
import { motion, AnimatePresence } from 'motion/react';

// Reusable Modal Component
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  primaryButton,
  secondaryButton,
  icon,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(36, 36, 36, 0.50)' }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-lg sm:rounded-xl shadow-xl max-w-md w-full p-5 sm:p-6 md:p-8"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {icon && (
              <div className="mb-3 sm:mb-4 rounded-full flex items-center justify-center">
                {icon}
              </div>
            )}

            <h2 className="text-base sm:text-lg md:text-xl font-bold text-tertiary-500 mb-2 sm:mb-3 text-center px-2">
              {title}
            </h2>

            <p className="text-xs sm:text-sm text-gray-200 text-center mb-5 sm:mb-6 px-2">
              {message}
            </p>

            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              {secondaryButton && (
                <Button
                  onClick={secondaryButton.onClick}
                  variant="outlineGray"
                  className="border-black-50 w-full sm:w-auto"
                >
                  {secondaryButton.label}
                </Button>
              )}

              {primaryButton && (
                <Button
                  onClick={primaryButton.onClick}
                  variant="default"
                  className="w-full sm:w-auto"
                >
                  {primaryButton.label}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
