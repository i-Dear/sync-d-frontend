import { useMyPresence, useUpdateMyPresence } from "~/liveblocks.config";
interface ModalProps {
  onClose: () => void;
}

const SkipModal = ({ onClose }: ModalProps) => {
  const [myPresence] = useMyPresence();
  const { currentProcess } = myPresence;

  return (
    <div className="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 px-[24rem] py-[4rem] text-center">
      <div className=" flex h-full w-full flex-col bg-white">
        <div className="border-grey-100 flex h-[50px] items-center justify-center border p-[8px]">
          스킵
        </div>
        <div className="full">{currentProcess}단계를 건너뛸까요?</div>
        <div className="border-grey-100 flex h-[50px] items-center justify-center border p-[8px]">
          <button
            className="bg-grey w-[80px] cursor-pointer rounded-2xl  p-2 text-center text-[18px] text-white"
            onClick={() => onClose()}
          >
            닫기
          </button>
          <button
            className="w-[80px] cursor-pointer rounded-2xl bg-primary  p-2 text-center text-[18px] text-white"
            onClick={() => onClose()}
          >
            스킵
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkipModal;
