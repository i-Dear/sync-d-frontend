"use client";

import Image from "next/image";
import useUserInfoStore from "@/store/useUserInfoStore";
import useModalStore from "@/store/useModalStore";
import { usePathname } from "next/navigation";
import Link from "next/link";
import BellIcon from "~/public/bell.svg";
import LogoIcon from "~/public/logo.svg";
import { set } from "react-hook-form";

const TopNavBar = () => {
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const pathname = usePathname();
  const { setModalType, setModalState } = useModalStore();

  const handleClickShare = () => {
    setModalType("invite");
    setModalState(true);
    console.log("share");
  };

  return (
    <div className="flex h-[4.8rem] w-full items-center justify-between border-b-[1px] border-light-gray-100 bg-white px-[3.2rem]">
      <Link href="/dashboard">
        <div className="flex h-full items-center">
          <LogoIcon />
          <span className="ml-[1.2rem] h-full text-[1.6rem] font-semibold leading-[5rem]">
            Sync-D
          </span>
        </div>
      </Link>
      <div className="flex items-center gap-[3.2rem]">
        <Link href="/dashboard">
          <div className="flex h-full w-fit cursor-pointer items-center">
            <span className="h-full text-[1.4rem]">Dashboard </span>
          </div>
        </Link>
        {/* <Link href="/projects">
          <div className="flex h-full w-fit cursor-pointer items-center">
            <span className="h-full text-[1.4rem]">Projects </span>
          </div>
        </Link> */}
        {pathname.includes("/board") && (
          <div
            onClick={handleClickShare}
            className="flex h-[3.2rem] w-fit cursor-pointer items-center rounded-2xl bg-primary px-[1.6rem] py-[0.6rem]"
          >
            <span className="h-[3rem] text-[1.4rem] font-normal  leading-[3.2rem] text-white">
              Share
            </span>
          </div>
        )}
        <div className="flex h-[3.2rem] w-[3.2rem] cursor-pointer items-center justify-center rounded-2xl bg-light-gray-100">
          <BellIcon />
        </div>
        <Image
          src={userInfo.avatar || "/default-avatar.png"}
          alt="userAvatar"
          width={32}
          height={32}
          className="cursor-pointer rounded-full"
        />
      </div>
    </div>
  );
};

export default TopNavBar;
