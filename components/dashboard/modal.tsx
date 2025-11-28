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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
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
            className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {icon && <div className="mb-4">{icon}</div>}

            <h2 className="text-lg font-bold text-tertiary-500 mb-3 text-center">
              {title}
            </h2>

            <p className="text-sm text-gray-200 text-center mb-6">{message}</p>

            <div className="flex gap-3 justify-end">
              {secondaryButton && (
                <div>
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
                <div>
                  <Button onClick={primaryButton.onClick} variant="default">
                    {primaryButton.label}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
