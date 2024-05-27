import Lottie from "react-lottie";
import clapJson from "~/public/lotties/clap.json";

const CompleteModal = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: clapJson,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex h-[fit] w-[40rem] flex-col items-center justify-center gap-[0.8rem] rounded-[2rem] bg-white px-[4.45rem] py-[3.2rem] shadow-2xl">
      <div className="flex h-[16rem] w-[16rem] items-center justify-center">
        <Lottie options={defaultOptions} height={160} width={160} />
      </div>
      <span className="text-[3.6rem] font-bold text-div-text">Well done !</span>
      <span className="text-[1.6rem] font-normal text-div-text">
        모든 단계를 완료했습니다!
      </span>
      <button className="mt-[0.4rem] w-fit cursor-pointer rounded-[1.2rem] bg-primary-500 px-[1.2rem] py-[0.8rem] text-center text-[1.4rem] font-semibold text-white">
        결과 확인 바로가기
      </button>
    </div>
  );
};

export default CompleteModal;
