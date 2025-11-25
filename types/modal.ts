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
