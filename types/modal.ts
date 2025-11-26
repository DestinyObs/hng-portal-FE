export interface ButtonConfig {
  label: string;
  onClick: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  primaryButton?: ButtonConfig;
  secondaryButton?: ButtonConfig;
}
export interface ConfirmationModalProps {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  onGoToDashboard: () => void;
}