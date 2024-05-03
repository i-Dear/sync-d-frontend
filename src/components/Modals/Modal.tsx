import useModalStore from "@/store/useModalStore";
import GuideModal from "./GuideModal";
import SkipModal from "./SkipModal";
import { useState, useEffect } from "react";

interface ModalMapType {
  [key: string]: () => JSX.Element;
}

const ModalMap: ModalMapType = {
  guide: GuideModal,
  skip: SkipModal,
};

const Modal = () => {
  const { modalKey, isOpen, setModalKey } = useModalStore();

  const ModalComponent = ModalMap[modalKey];
  useEffect(() => {
    console.log("여기용", modalKey);
  }, [modalKey]);

  return (
    <div>
      <ModalComponent />
    </div>
  );
};

export default Modal;