import { useStorage, useUpdateMyPresence } from "~/liveblocks.config";
import useModalStore from "@/store/useModalStore";
import { Process } from "@/lib/types";
import { SetStateAction } from "react";
import { Camera } from "@/lib/types";
import Lottie from "react-lottie";
import checkJson from "~/public/lotties/check.json";

interface ModalProps {
  setCamera: React.Dispatch<SetStateAction<Camera>>;
}

const SyncedModal = ({ setCamera }: ModalProps) => {
  const { setModalType, setModalState } = useModalStore();
  const updateMyPresence = useUpdateMyPresence();

  const process = useStorage((root) => root.process);

  const latestUndoneProcess = process.find(
    (process) => !process.done,
  ) as Process;
  const latestUndoneStep = latestUndoneProcess?.step;

  const handleClick = () => {
    setModalState(false);
    setCamera(() => ({
      x: latestUndoneProcess.camera.x,
      y: latestUndoneProcess.camera.y,
    }));
    updateMyPresence({
      currentProcess: latestUndoneStep,
      isSynced: false,
    });
    const localStorageProcess = JSON.parse(
      localStorage.getItem("isFirstVisitedStep") as string,
    );

    if (localStorageProcess[latestUndoneStep - 1] === false) {
      setModalType("guide");
      setModalState(true);
      localStorageProcess[latestUndoneStep - 1] = true;
      localStorage.setItem(
        "isFirstVisitedStep",
        JSON.stringify(localStorageProcess),
      );
    }
  };

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
      <span className="text-[3.6rem] font-bold text-div-text">Good Job !</span>
      <span className="text-[1.6rem] font-normal text-div-text">
        {latestUndoneStep - 1}단계를 완료했습니다!
      </span>
      <button
        className="w-fit cursor-pointer rounded-[1.2rem] bg-gray-700 px-[1.2rem] py-[0.8rem] text-center text-[1.4rem] font-normal text-white"
        onClick={handleClick}
      >
        다음 단계로 이동
      </button>
    </div>
  );
};

export default SyncedModal;
