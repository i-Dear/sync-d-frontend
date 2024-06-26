import { useMyPresence } from "~/liveblocks.config";
import { useMutation } from "~/liveblocks.config";
import useModalStore from "@/store/useModalStore";

import { Process } from "@/lib/types";

const SkipModal = () => {
  const [myPresence] = useMyPresence();
  const { currentProcess } = myPresence;

  const { setModalState } = useModalStore();

  const skipProcess = useMutation(({ storage }) => {
    const storageProcess = storage.get("process");
    const updatedProcess = {
      ...storageProcess.get(currentProcess),
      done: true,
    } as Process;
    storageProcess.set(currentProcess, updatedProcess);
    setModalState(false);
  }, []);

  return (
    <div className=" space-around flex h-[20rem] w-[60rem] flex-col bg-white">
      <div className="border-grey-100 flex h-[50px] items-center justify-center border p-[8px]">
        스킵
      </div>
      <div className="h-full">{currentProcess}단계를 건너뛸까요?</div>
      <div className="border-grey-100 flex h-[50px] items-center justify-center gap-[4rem] border p-[8px]">
        <button
          className="w-[80px] cursor-pointer rounded-2xl bg-gray-700  p-2 text-center text-[18px] text-white"
          onClick={() => setModalState(false)}
        >
          닫기
        </button>
        <button
          className="w-[80px] cursor-pointer rounded-2xl bg-primary  p-2 text-center text-[18px] text-white"
          onClick={skipProcess}
        >
          스킵
        </button>
      </div>
    </div>
  );
};

export default SkipModal;
