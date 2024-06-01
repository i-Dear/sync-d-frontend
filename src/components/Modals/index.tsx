"use client";

import useModalStore from "@/store/useModalStore";
import GuideModal from "./GuideModal";
import SkipModal from "./SkipModal";
import VoteModal from "./VoteModal";
import VoteEndModal from "./VoteEndModal";
import CreateProjectModal from "./CreateProjectModal";
import ProcessingScenarioModal from "./ProcessingScenarioModal";
import SyncedModal from "./SyncModal";
import VoteCompleteModal from "./VoteCompleteModal";
import CompleteModal from "./CompleteModal";
import InviteModal from "./InviteModal";
import { SetStateAction, useState } from "react";
import { Camera } from "@/lib/types";
import XMarkIcon from "~/public/Xmark";
import Lottie from "react-lottie";
import confettiJson from "~/public/lotties/confetti.json";

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
  voteEnd: VoteEndModal,
  voteComplete: VoteCompleteModal,
  createProject: CreateProjectModal,
  processingScenario: ProcessingScenarioModal,
  synced: SyncedModal,
  complete: CompleteModal,
  invite: InviteModal,
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

  const nonClosableModals = [
    "synced",
    "processingScenario",
    "skip",
    "voteComplete",
  ];
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDownInside && e.target === e.currentTarget) {
      if (
        modalType !== "processingScenario" &&
        !nonClosableModals.includes(modalType)
      )
        setModalState(false);
    }
    setIsMouseDownInside(false);
  };
  const ModalComponent = ModalMap[modalType];

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: confettiJson,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-black bg-opacity-30"
          onMouseUp={handleMouseUp}
        >
          {modalType === "complete" && (
            <Lottie
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              options={defaultOptions}
              height={"100%"}
              width={"100%"}
              isClickToPauseDisabled={true}
            />
          )}
          <div
            onClick={stopPropagation}
            onMouseDown={handleMouseDown}
            className="relative"
          >
            {modalType === "synced" || modalType === "voteComplete" ? (
              <ModalComponent setCamera={setCamera} />
            ) : (
              <ModalComponent />
            )}
            <button
              className="absolute right-[2.4rem] top-[2.4rem] cursor-pointer"
              onClick={() => setModalState(false)}
            >
              <XMarkIcon fill="lightgray" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
