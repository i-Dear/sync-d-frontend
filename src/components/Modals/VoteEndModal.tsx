import { useStorage, useMutation } from "~/liveblocks.config";
import useModalStore from "@/store/useModalStore";
import { Process } from "@/lib/types";
import { SetStateAction, useState } from "react";
import { Camera } from "@/lib/types";

interface ModalProps {
  setCamera: React.Dispatch<SetStateAction<Camera>>;
}

const VoteCompleteModal = ({ setCamera }: ModalProps) => {
  const { setModalState } = useModalStore();

  const process = useStorage((root) => root.process);

  const latestUndoneProcess = process.find(
    (process) => !process.done,
  ) as Process;

  const countVoteResult = useMutation(({ storage }) => {
    const voteList = storage.get("voteList");
    const voteCount = voteList.get("voteCount");

    const voteCountObject = voteCount.toObject();
    let maxVotes = 0;
    let winningVote = null;

    for (const [key, value] of Object.entries(voteCountObject)) {
      console.log(key, value);
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
    console.log("최다 득표 번호:", winningVote, "번", "득표수:", maxVotes);
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
  };

  const { winningVote } = countVoteResult();
  return (
    <div className=" space-around flex h-[20rem] w-[60rem] flex-col bg-white">
      <div className="border-grey-100 flex h-[50px] items-center justify-center border p-[8px]">
        Synced!
      </div>
      <div className="h-full">
        {winningVote}번이 가장 많은 득표수를 획득하였습니다!
      </div>
      <div className="border-grey-100 flex h-[50px] items-center justify-center gap-[4rem] border p-[8px]">
        <button
          className="w-[80px] cursor-pointer rounded-2xl bg-gray-700  p-2 text-center text-[18px] text-white"
          onClick={handleClick}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default VoteCompleteModal;
