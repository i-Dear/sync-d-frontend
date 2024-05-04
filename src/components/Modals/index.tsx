import useModalStore from "@/store/useModalStore";
import GuideModal from "./GuideModal";
import SkipModal from "./SkipModal";
import VoteModal from "./VoteModal";

interface ModalMapType {
  [key: string]: () => JSX.Element;
}

const ModalMap: ModalMapType = {
  guide: GuideModal,
  skip: SkipModal,
  vote: VoteModal,
};

const Modal = () => {
  const { modalType } = useModalStore();

  const ModalComponent = ModalMap[modalType];

  return (
    <div>
      <ModalComponent />
    </div>
  );
};

export default Modal;
