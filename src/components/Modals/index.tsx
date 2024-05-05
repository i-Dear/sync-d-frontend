import useModalStore from "@/store/useModalStore";
import GuideModal from "./GuideModal";
import SkipModal from "./SkipModal";
import VoteModal from "./VoteModal";
import CompleteModal from "./CompleteModal";
interface ModalMapType {
  [key: string]: () => JSX.Element;
}

const ModalMap: ModalMapType = {
  guide: GuideModal,
  skip: SkipModal,
  vote: VoteModal,
  complete: CompleteModal,
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
