import Lottie from "react-lottie";
import writingJson from "~/public/lotties/writing.json";

const ProcessingScenarioModal = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: writingJson,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex h-[fit] w-[40rem] flex-col items-center justify-start gap-[0.8rem] rounded-[2rem] bg-white px-[4.45rem] py-[3.2rem] shadow-2xl">
      <div className="flex h-[22rem] w-[22rem] items-center justify-center">
        <Lottie options={defaultOptions} height={240} width={240} />
      </div>
      <span className="text-[2.8rem] font-bold text-div-text">
        잠시만 기다려주세요!
      </span>
      <span className="text-[1.6rem] font-normal text-div-text">
        Sync-D가 작성해주신 시나리오를 바탕으로 유저 스토리를 작성하고 있어요.
      </span>
    </div>
  );
};

export default ProcessingScenarioModal;
