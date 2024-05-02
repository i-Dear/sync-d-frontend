"use client";

import useUserInfoStore from "@/hooks/useUserInfoStore";
import useAuth from "@/hooks/useAuth";
import ProjectCard from "@/components/ProjectCard";
import ProjectSearchBar from "@/components/ProjectSearchBar";
import Image from "next/image";

const DashboardPage = () => {
  const userInfo = useUserInfoStore();
  useAuth();

  const allRooms = [...userInfo.hostingRooms, ...userInfo.joinedRooms];

  return (
    <div className="flex w-full flex-col gap-[2.4rem] px-[3.6rem] pt-[3.6rem]">
      <div className="flex h-[7.6rem] w-[30.6rem] items-center justify-center gap-[2.4rem] rounded-[1.2rem] bg-primary">
        <Image src="/plus.svg" alt="plus" width={24} height={24} />
        <span className="text-[2.4rem] text-white">New Project</span>
      </div>

      <h1 className="m-0 text-[3.6rem] font-bold tracking-[-0.08rem]">
        Recent Projects
      </h1>

      <ProjectSearchBar />

      <div className="flex w-full items-center justify-start gap-[3.2rem] overflow-x-scroll">
        {allRooms.map((room) => (
          <ProjectCard key={room} projectId={room} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
