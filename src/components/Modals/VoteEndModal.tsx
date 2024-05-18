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

  const voteList = useStorage((root) => root.voteList);

  const process = useStorage((root) => root.process);

  const latestUndoneProcess = process.find(
    (process) => !process.done,
  ) as Process;

  const handleClick = () => {
    setModalState(false);
    setCamera(() => ({
      x: latestUndoneProcess.camera.x,
      y: latestUndoneProcess.camera.y,
    }));
    console.log("hey");
  };
  return (
    <div className=" space-around flex h-[20rem] w-[60rem] flex-col bg-white">
      <div className="border-grey-100 flex h-[50px] items-center justify-center border p-[8px]">
        Synced!
      </div>
      <div className="h-full">투표가 완료되었습니다!</div>
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
