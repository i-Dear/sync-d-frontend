import useModalStore from "@/store/useModalStore";
import { useMyPresence } from "~/liveblocks.config";

const SKIPABLE_PROCESSES = [1, 2, 10, 11];

const SkipButton = () => {
  const { setModalType, setModalState } = useModalStore();
  const [myPresence] = useMyPresence();
  const { currentProcess } = myPresence;

  const handleSkipButtonClick = () => {
    setModalType("skip");
    setModalState(true);
  };

  return (
    <>
      {SKIPABLE_PROCESSES.includes(currentProcess) ? (
        <button
          onClick={handleSkipButtonClick}
          className="w-[80px] cursor-pointer rounded-2xl bg-gray-500 p-2 text-center text-[18px] text-white"
        >
          Skip
        </button>
      ) : null}
    </>
  );
};

export default SkipButton;
