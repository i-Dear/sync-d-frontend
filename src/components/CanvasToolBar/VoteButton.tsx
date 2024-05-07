import useModalStore from "@/store/useModalStore";
import { useMyPresence } from "~/liveblocks.config";

const VOTE_PROCESSES = [3];

const VoteButton = () => {
  const { setModalType, setModalState } = useModalStore();
  const [myPresence] = useMyPresence();
  const { currentProcess } = myPresence;

  const handleVoteButtonClick = () => {
    setModalType("vote");
    setModalState(true);
  };

  return (
    <>
      {VOTE_PROCESSES.includes(currentProcess) ? (
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
