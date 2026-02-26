import { BadgeCheckIcon } from "../Icon";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string | React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, description }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <BadgeCheckIcon className="w-20 h-20 text-green-500" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {title ?? "-"}
        </h3>
        <div className="text-gray-500 mb-8 leading-relaxed">
          {description ?? "-"}
        </div>

        <Button onClick={onClose} className="w-full">
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Modal;
