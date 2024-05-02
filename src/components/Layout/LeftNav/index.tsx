"use client";

import useUserInfoStore from "@/hooks/useUserInfoStore";
import NavLinks from "./NavLinks";
import DownArrow from "~/public/down.svg";

const LeftNav = () => {
  const userInfo = useUserInfoStore();

  return (
    <div className="flex w-[36.4rem] flex-col gap-[1.2rem] border-r-[0.1rem] border-light-gray-100 p-[1.2rem]">
      <div className="flex h-[5.2rem] w-[33.2rem] items-center justify-start px-[1.2rem]">
        <div className="h-[3.2rem] w-[3.2rem] rounded-full bg-primary"></div>
        <span className="ml-[1.2rem] text-[1.6rem] font-bold text-div-text">
          {userInfo.name}
        </span>
        <div className="ml-[0.6rem] flex h-[2.4rem] w-[2.4rem] cursor-pointer items-center justify-center rounded-full ">
          <DownArrow />
        </div>
      </div>
      <NavLinks userId={userInfo._id} />
    </div>
  );
};

export default LeftNav;
