export type FeatureProps = {
  iconSrc: string;
  title: string;
  desc: string;
};

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
