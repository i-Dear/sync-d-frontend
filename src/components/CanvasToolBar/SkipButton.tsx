import useModalStore from "@/store/useModalStore";
import { useState, useEffect } from "react";
import { useMyPresence, useStorage } from "~/liveblocks.config";

const SKIPABLE_PROCESSES = [1, 2];

const SkipButton = () => {
  const { setModalType, setModalState } = useModalStore();

  const [myPresence] = useMyPresence();
  const { currentProcess } = myPresence;
  const [latestUndoneStep, setLatestUndoneStep] = useState(
    myPresence.currentProcess,
  );

  const processes = useStorage((storage) => storage.process);

  useEffect(() => {
    const latestUndoneProcess = processes.find((process) => !process.done);
    setLatestUndoneStep(latestUndoneProcess?.step || 1);
  }, [processes]);

  const handleSkipButtonClick = () => {
    setModalType("skip");
    setModalState(true);
  };

  return (
    <>
      {currentProcess === latestUndoneStep &&
      SKIPABLE_PROCESSES.includes(currentProcess) ? (
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
