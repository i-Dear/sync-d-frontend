import { useMyPresence, useUpdateMyPresence } from "~/liveblocks.config";
import useModalStore from "@/store/useModalStore";
import Modal from "@/components/HelpModal";

const ProcessSkipButton = () => {
  const [myPresence, ...rest] = useMyPresence();
  const { currentProcess } = myPresence;
  const { isOpen, changeModalState } = useModalStore();

  //추후 skip에서 쓰일 로직
  const updateMyPresence = useUpdateMyPresence();

  const skipCurrentProcess = () => {
    changeModalState();

    // updateMyPresence({
    //   currentProcess: currentProcess + 1,
    // });
    // console.log("skipCurrentProcess", currentProcess);
  };

  return (
    <button
      className="w-[64px] cursor-pointer rounded-2xl bg-gray-300 p-2 text-center text-[18px] font-bold"
      onClick={skipCurrentProcess}
    >
      Skip
    </button>
  );
};

export default ProcessSkipButton;
