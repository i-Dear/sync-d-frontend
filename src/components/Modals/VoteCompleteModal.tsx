import {
  useStorage,
  useMutation,
  useUpdateMyPresence,
} from "~/liveblocks.config";
import useModalStore from "@/store/useModalStore";
import { Process } from "@/lib/types";
import { SetStateAction } from "react";
import { Camera } from "@/lib/types";
import Lottie from "react-lottie";
import checkJson from "~/public/lotties/check.json";

interface ModalProps {
  setCamera: React.Dispatch<SetStateAction<Camera>>;
}

const VoteCompleteModal = ({ setCamera }: ModalProps) => {
  const { setModalState } = useModalStore();
  const updateMyPresence = useUpdateMyPresence();
  const process = useStorage((root) => root.process);

  const latestUndoneProcess = process.find(
    (process) => !process.done,
  ) as Process;
  const latestUndoneStep = latestUndoneProcess?.step;

  const countVoteResult = useMutation(({ storage }) => {
    const voteList = storage.get("voteList");
    const voteCount = voteList.get("voteCount");

    const voteCountObject = voteCount.toObject();
    let maxVotes = 0;
    let winningVote = null;

    for (const [key, value] of Object.entries(voteCountObject)) {
      if (value > maxVotes) {
        maxVotes = value;
        winningVote = key;
      }
    }
    const initVote = () => {
      voteCount.update({
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
      });
      voteList.set("totalCount", 0);
    };
    return { winningVote, initVote };
  }, []);

  const handleClick = () => {
    const { initVote } = countVoteResult();
    initVote();
    setModalState(false);
    setCamera(() => ({
      x: latestUndoneProcess.camera.x,
      y: latestUndoneProcess.camera.y,
    }));
    updateMyPresence({
      currentProcess: latestUndoneStep,
      isSynced: false,
    });
  };

  const { winningVote } = countVoteResult();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: checkJson,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex h-[fit] w-[40rem] flex-col items-center justify-start gap-[0.8rem] rounded-[2rem] bg-white px-[4.45rem] py-[3.2rem] shadow-2xl">
      <div className="flex h-[16rem] w-[16rem] items-center justify-center">
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>
      <div className="flex flex-col items-center justify-center gap-[0.2rem]">
        <span className="text-[1.8rem] font-semibold text-div-text">
          우리 팀은
        </span>
        <span className="text-[3.6rem] font-bold text-div-text">
          {winningVote}번 문제
        </span>
        <span className="text-[1.8rem] font-semibold text-div-text">
          에 가장 관심이 많았어요 !
        </span>
      </div>
      <button
        className="mt-[1.6rem] min-w-[7.2rem] cursor-pointer rounded-[1.2rem] bg-gray-700 px-[1.2rem] py-[0.8rem] text-center text-[1.4rem] font-normal text-white"
        onClick={handleClick}
      >
        닫기
      </button>
    </div>
  );
};

export default VoteCompleteModal;
