"use client";

import useUserInfoStore from "@/store/useUserInfoStore";
import NavLinks from "./NavLinks";
import DownArrow from "~/public/down.svg";
import Image from "next/image";
import UserInfoSettingBar from "@/components/UserInfoSettingBar";
import { useToggle } from "@/hooks/useToggle";

const LeftNav = () => {
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const [isToggle, handleToggle] = useToggle();

  return (
    <div className="relative flex w-[36.4rem] flex-col gap-[1.2rem] border-r-[0.1rem] border-light-gray-100 p-[1.2rem]">
      <div className="flex h-[5.2rem] w-[33.2rem] items-center justify-start px-[1.2rem]">
        <Image
          src={userInfo.avatar || "/default-avatar.png"}
          alt="userAvatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="ml-[1.2rem] text-[1.6rem] font-bold text-div-text">
          {userInfo.name}
        </span>
        <div
          onClick={() => handleToggle()}
          className="ml-[0.6rem] flex h-[2.4rem] w-[2.4rem] cursor-pointer items-center justify-center rounded-full "
        >
          <DownArrow />
        </div>
      </div>
      {isToggle && <UserInfoSettingBar userInfo={userInfo} />}
      <NavLinks />
    </div>
  );
};

export default LeftNav;
