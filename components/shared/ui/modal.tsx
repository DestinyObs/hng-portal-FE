import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useSkipToDashboard } from '@/hooks/use-skip-to-dashboard';
interface ModalProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  children: React.ReactNode;
}
export default function Modal({
  openDialog,
  setOpenDialog,
  children
}:ModalProps) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent
        className="rounded-xl w-[90%]  max-w-[590px] border-none"
        showCloseButton={false}
      >
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
