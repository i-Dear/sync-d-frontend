import useModalStore from "@/store/useModalStore";

const VoteModal = () => {
  const { isOpen, setModalState } = useModalStore();

  return (
    <div className="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 px-[24rem] py-[4rem] text-center">
      <div className=" flex h-full w-full flex-col bg-white">
        <div className="border-grey-100 flex h-[50px] items-center justify-center border p-[8px]">
          투표
        </div>
        <div className="h-full"></div>
        <div className="border-grey-100 flex h-[50px] items-center justify-center border p-[8px]">
          <button
            className="w-[80px] cursor-pointer rounded-2xl bg-primary  p-2 text-center text-[18px] text-white"
            onClick={() => setModalState(false)}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoteModal;
