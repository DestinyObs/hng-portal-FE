import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import GreenCheck from '@/public/assets/auth/icons/green-check';
import { DialogTitle } from '@radix-ui/react-dialog';
import { ConfirmModalType } from '@/types/onboarding-talent';
import { useSkipToDashboard } from '@/hooks/use-skip-to-dashboard';

export default function ConfirmationModal({
  openDialog,
  setOpenDialog,
  title,
  subtitle,
}: ConfirmModalType) {
  const { skipToDashboard } = useSkipToDashboard();

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent
        className="rounded-xl w-full border-none"
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogTitle className="hidden"></DialogTitle>
        <div className="flex flex-col items-center justify-center gap-6 text-center py-4">
          <div className="flex flex-col gap-3 justify-center items-center">
            <GreenCheck />
            <h2 className="text-xl font-bold">{title}</h2>
            <p
              className=""
              style={{
                fontFamily: 'DM Sans',
              }}
            >
              {subtitle}
            </p>
          </div>
          <hr className="my-1 h-[1px] w-full border-none bg-[#E7E7E7]" />
          <section className="w-full flex justify-center items-center">
            <Button
              onClick={() => {
                skipToDashboard('/talent/dashboard');
              }}
              className="bg-gray-900 hover:bg-gray-800 text-white px-4 h-9 rounded-lg text-sm font-normal"
              style={{ fontFamily: 'DM Sans' }}
            >
              Go to Dashboard
            </Button>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
