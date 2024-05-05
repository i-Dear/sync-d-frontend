import useModalStore from "@/store/useModalStore";

const CompleteModal = () => {
  const { setModalState } = useModalStore();

  return (
    <div className="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 px-[50rem] py-[40rem] text-center">
      <div className=" space-around flex h-full w-[60rem] flex-col bg-white">
        <div className="h-full">투표가 완료되었습니다.</div>
        <div className="border-grey-100 flex h-[50px] items-center justify-center gap-[4rem] border p-[8px]">
          <button
            className="w-[80px] cursor-pointer rounded-2xl bg-gray-700  p-2 text-center text-[18px] text-white"
            onClick={() => setModalState(false)}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteModal;
