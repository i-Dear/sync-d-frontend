import useModalStore from "@/store/useModalStore";

const CompleteModal = () => {
  const { setModalState } = useModalStore();

  return (
    <div className=" flex h-[20rem] w-[40rem] flex-col bg-white">
      <div className="border-grey-100 flex h-full items-center justify-center border p-[8px]">
        투표가 완료되었습니다.
      </div>

      <div className="border-grey-100 flex h-[50px] items-center justify-center gap-[3rem] border p-[8px]">
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

export default CompleteModal;
