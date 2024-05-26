const CompleteModal = () => {
  console.log("dljfdakj");
  return (
    <div className=" space-around flex h-[20rem] w-[60rem] flex-col bg-white">
      <div className="border-grey-100 flex h-[50px] items-center justify-center border p-[8px]">
        Synced!
      </div>
      <div className="h-full">준호야 해줘</div>
      <div className="border-grey-100 flex h-[50px] items-center justify-center gap-[4rem] border p-[8px]">
        <button className="w-[80px] cursor-pointer rounded-2xl bg-gray-700  p-2 text-center text-[18px] text-white">
          닫기
        </button>
      </div>
    </div>
  );
};

export default CompleteModal;
