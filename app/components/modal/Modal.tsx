import { RxCross2 } from "react-icons/rx";
import Button from "../buttons/Button";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  isOpen?: boolean;
  children: React.ReactNode;
  label: string;
  onClose?: () => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  isLoading?: boolean;
  buttonText: string;
}

const Modal = ({
  label = "Add New Category",
  children,
  className = "",
  isLoading,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
}: ModalProps) => {
  if (!isOpen) {
    return <></>;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-[999] backdrop-blur-sm bg-[rgba(0,0,0,0.5)]">
      <form
        className={twMerge(
          "Mspace-y-6 bg-white w-[80%] md:w-[60%] lg:[50%] xl:w-[40%] rounded-lg shadow-[0px_2px_15px_rgba(128, 128, 128, 0.466)] px-8 py-4",
          className
        )}
        onSubmit={onSubmit}
      >
        <div className="flex justify-end rounded-s-lg gap-2 sticky top-0 z-40 bg-white flex-row flex-wrap">
          <div className="w-fit border border-transparent p-1 rounded-full hover:border-secondary cursor-pointer transition-all">
            <span className="text-lg text-primary" onClick={onClose}>
              <RxCross2 />
            </span>
          </div>
        </div>
        <h1 className="text-2xl !my-0 font-medium text-center">{label}</h1>
        <div className="max-h-[430px] overflow-y-auto bg-white">{children}</div>
        <div className="w-full">
          <Button label={buttonText} isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default Modal;
