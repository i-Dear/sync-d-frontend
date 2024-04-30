interface ModalProps {
  currentProcess: number;
  onClose: () => void;
}

const Modal = ({ currentProcess, onClose }: ModalProps) => {
  return (
    <div className="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 text-center">
      <div
        className="h-10/12 w-10/12 bg-white md:w-1/3"
        onClick={() => onClose()}
      >
        <div className="flex h-[50px] items-center justify-center border border-black p-[8px]">
          제목
        </div>
        <div className="h-[400px] border border-black  p-[8px]"></div>
        <div className="border-grey-100 flex h-[50px] items-center justify-center border p-[8px]">
          <button
            className="w-[80px] cursor-pointer rounded-2xl bg-primary  p-2 text-center text-[18px] text-white"
            onClick={() => onClose()}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
