import Image from "next/image";

const TopNavBar = () => {
  return (
    <div className="flex h-[4.8rem] w-full items-center justify-between border-b-[1px] border-light-gray-100 bg-white px-[3.2rem]">
      <div className="flex h-full items-center">
        <div className="flex h-[2.4rem] w-[2.4rem] items-center justify-center">
          <Image src="/logo.svg" alt="logo" width={20} height={20} />
        </div>
        <span className="ml-[1.2rem] h-full text-[1.6rem] font-semibold leading-[5rem]">
          싱크대
        </span>
      </div>
      <div className="flex items-center gap-[3.2rem]">
        <div className="flex h-full w-fit cursor-pointer items-center">
          <span className="h-full text-[1.4rem]">Dashboard </span>
        </div>
        <div className="flex h-full w-fit cursor-pointer items-center">
          <span className="h-full text-[1.4rem]">Projects </span>
        </div>
        <div className="flex h-[3.2rem] w-fit cursor-pointer items-center rounded-2xl bg-primary px-[1.6rem] py-[0.6rem]">
          <span className="h-[3rem] text-[1.4rem] font-normal  leading-[3.2rem] text-white">
            Share
          </span>
        </div>
        <div className="flex h-[3.2rem] w-[3.2rem] cursor-pointer items-center justify-center rounded-2xl bg-light-gray-100">
          <Image src="/bell.svg" alt="bell" width={16} height={16} />
        </div>

        <div className="flex h-[3.2rem] w-[3.2rem] cursor-pointer items-center justify-center rounded-full bg-primary" />
      </div>
    </div>
  );
};

export default TopNavBar;
