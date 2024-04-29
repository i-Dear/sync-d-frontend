interface ModalProps {
  currentProcess: number;
  onClose: () => void;
}

const Modal = ({ currentProcess, onClose }: ModalProps) => {
  return (
    <div className="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 text-center">
      <div className="w-10/12 bg-white md:w-1/3" onClick={() => onClose()}>
        <div className="p-[8px]">asdasddsa</div>
      </div>
    </div>
  );
};

export default Modal;
