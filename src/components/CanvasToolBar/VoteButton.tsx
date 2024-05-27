import useModalStore from "@/store/useModalStore";
import { useMyPresence, useStorage } from "~/liveblocks.config";
import { useState, useEffect } from "react";

const VOTE_PROCESSES = [3];

const VoteButton = () => {
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

  const handleVoteButtonClick = () => {
    setModalType("vote");
    setModalState(true);
  };

  return (
    <>
      {currentProcess === latestUndoneStep &&
      VOTE_PROCESSES.includes(currentProcess) ? (
        <button
          onClick={handleVoteButtonClick}
          className="w-[80px] cursor-pointer rounded-2xl bg-primary-500 p-2 text-center text-[18px] text-white"
        >
          Vote
        </button>
      ) : null}
    </>
  );
};

export default VoteButton;
