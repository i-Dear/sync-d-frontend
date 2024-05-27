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
    <div className="flex h-[fit] w-[100rem] flex-col items-center justify-center gap-[0.8rem] rounded-[2rem] bg-white px-[4.45rem] py-[3.2rem] shadow-2xl">
      <h1 className="mb-[1.6rem] text-[1.8rem] font-bold leading-[1.2rem] tracking-[-0.08rem]">
        {currentProcess}단계 안내문
      </h1>
      <GuideCarousel exampleList={exampleList} />
      <button
        onClick={() => setModalState(false)}
        className="mt-[0.4rem] w-fit min-w-[7.2rem] cursor-pointer rounded-[1.2rem] bg-primary-500 px-[1.2rem] py-[0.8rem] text-center text-[1.4rem] font-semibold text-white"
      >
        닫기
      </button>
    </div>
  );
};

export default GuideModal;
