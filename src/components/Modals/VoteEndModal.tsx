import useModalStore from "@/store/useModalStore";
import Lottie from "react-lottie";
import checkJson from "~/public/lotties/check.json";

const CompleteModal = () => {
  const { setModalState } = useModalStore();

  const handleClick = () => {
    setModalState(false);
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
      <span className="text-[3.6rem] font-bold text-div-text">투표 완료!</span>
      <button
        className="min-w-[7.2rem] cursor-pointer rounded-[1.2rem] bg-gray-700 px-[1.2rem] py-[0.8rem] text-center text-[1.4rem] font-normal text-white"
        onClick={handleClick}
      >
        닫기
      </button>
    </div>
  );
};

export default CompleteModal;
