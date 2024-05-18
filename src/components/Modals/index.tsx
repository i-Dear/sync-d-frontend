"use client";

import useModalStore from "@/store/useModalStore";
import GuideModal from "./GuideModal";
import SkipModal from "./SkipModal";
import VoteModal from "./VoteModal";
import CompleteModal from "./CompleteModal";
import CreateProjectModal from "./CreateProjectModal";
import ProcessingScenarioModal from "./ProcessingScenarioModal";
import SyncedModal from "./SyncModal";
import VoteCompleteModal from "./VoteEndModal";
import { SetStateAction, useState } from "react";
import { Camera } from "@/lib/types";

interface ModalMapType {
  [key: string]: (props?: any) => JSX.Element;
}

interface ModalProps {
  setCamera?: React.Dispatch<SetStateAction<Camera>>;
}

const ModalMap: ModalMapType = {
  guide: GuideModal,
  skip: SkipModal,
  vote: VoteModal,
  complete: CompleteModal,
  createProject: CreateProjectModal,
  processingScenario: ProcessingScenarioModal,
  synced: SyncedModal,
  voteComplete: VoteCompleteModal,
};

const Modal = ({ setCamera }: ModalProps) => {
  const [isMouseDownInside, setIsMouseDownInside] = useState(false);
  const { isModalOpen, modalType, setModalState } = useModalStore();

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMouseDownInside(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    const nonClosableModals = [
      "synced",
      "processingScenario",
      "skip",
      "voteComplete",
    ];
    if (
      !isMouseDownInside &&
      e.target === e.currentTarget &&
      !nonClosableModals.includes(modalType)
    ) {
      setModalState(false);
    }
  };
  const ModalComponent = ModalMap[modalType];

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 px-[25rem] py-[20rem] text-center"
          onMouseUp={handleMouseUp}
        >
          <div onClick={stopPropagation} onMouseDown={handleMouseDown}>
            {modalType === ("synced" || "voteComlete") ? (
              <ModalComponent setCamera={setCamera} />
            ) : (
              <ModalComponent />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
