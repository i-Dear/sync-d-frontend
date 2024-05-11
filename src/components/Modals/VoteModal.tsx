import { useMyPresence } from "~/liveblocks.config";
import useModalStore from "@/store/useModalStore";
import { useState } from "react";

const VoteModal = () => {
  const { setModalState, setModalType } = useModalStore();
  const [vote, setVote] = useState<number | null>(null);
  const [voteCompleted, setVoteCompleted] = useState<boolean>(false);
  const handleVote = (key: number) => () => {
    setVote(key);
    setVoteCompleted(true);
  };

  const submitVote = () => {
    if (vote) {
      setModalType("complete");
    }
    //유저의 투표 상태 및 투표 정보 업데이트 추가 필요
  };
  return (
    <div className=" flex h-full w-full flex-col bg-white">
      <div className="border-grey-100 flex h-[50px] items-center justify-center border p-[8px]">
        투표
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <div className="grid grid-cols-3 grid-rows-2 gap-[8rem]">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className={`flex h-[20rem] w-[20rem] items-center justify-center rounded-full border font-mono text-9xl font-semibold text-gray-200 ${
                vote === index + 1 ? "bg-primary" : ""
              }`}
              onClick={handleVote(index + 1)}
            >
              <text fontFamily="Arial" fontSize="200" fill="#F0F2F5">
                {index + 1}
              </text>
            </div>
          ))}
        </div>
      </div>
      <div className="border-grey-100 flex h-[50px] items-center justify-center gap-[3rem] border p-[8px]">
        <button
          onClick={submitVote}
          className="w-[80px] cursor-pointer rounded-2xl bg-primary-500 p-2 text-center text-[18px] text-white"
        >
          완료
        </button>
        <button
          className="w-[80px] cursor-pointer rounded-2xl bg-primary  p-2 text-center text-[18px] text-white"
          onClick={() => setModalState(false)}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default VoteModal;
