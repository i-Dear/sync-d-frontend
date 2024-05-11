import { useMyPresence } from "~/liveblocks.config";
import useModalStore from "@/store/useModalStore";
import { exampleImages } from "@/lib/guideImages";
import GuideCarousel from "../GuideCarousel";

const GuideModal = () => {
  const [myPresence] = useMyPresence();
  const { currentProcess } = myPresence;
  const { setModalState } = useModalStore();
  const exampleList = exampleImages[currentProcess - 1];

  return (
    <div className=" flex h-full w-full flex-col bg-white">
      <div className="border-grey-100 flex h-[50px] items-center justify-center border p-[8px]">
        {currentProcess}단계 안내문
      </div>
      <GuideCarousel exampleList={exampleList} />
      <div className="border-grey-100 flex h-[50px] items-center justify-center border p-[8px]">
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

export default GuideModal;
