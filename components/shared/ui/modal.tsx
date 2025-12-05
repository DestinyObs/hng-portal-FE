import { Dialog, DialogContent } from '@/components/ui/dialog';
import React from 'react';
interface ModalProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  children: React.ReactNode;
}
export default function Modal({
  openDialog,
  setOpenDialog,
  children,
}: ModalProps) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent
        className="rounded-xl w-[90%]  max-w-[590px] border-none overflow-y-scroll [&::-webkit-scrollbar]:hidden max-h-[90vh] p-6 sm:p-10"
        showCloseButton={false}
      >
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
