"use client";

import useUserInfoStore from "@/store/useUserInfoStore";
import NavLinks from "./NavLinks";
import DownArrow from "~/public/down.svg";
import Image from "next/image";

const LeftNav = () => {
  const userInfo = useUserInfoStore((state) => state.userInfo);

  return (
    <div className="flex w-[36.4rem] flex-col gap-[1.2rem] border-r-[0.1rem] border-light-gray-100 p-[1.2rem]">
      <div className="flex h-[5.2rem] w-[33.2rem] items-center justify-start px-[1.2rem]">
        <Image
          src={userInfo.avatar}
          alt="userAvatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="ml-[1.2rem] text-[1.6rem] font-bold text-div-text">
          {userInfo.name}
        </span>
        <div className="ml-[0.6rem] flex h-[2.4rem] w-[2.4rem] cursor-pointer items-center justify-center rounded-full ">
          <DownArrow />
        </div>
      </div>
      <NavLinks />
    </div>
  );
};

export default LeftNav;
