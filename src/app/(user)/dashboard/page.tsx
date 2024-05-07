"use client";

import ProjectCard from "@/components/ProjectCard";
import ProjectSearchBar from "@/components/ProjectSearchBar";
import Image from "next/image";
import useGetAuthToken from "@/hooks/useGetAuthToken";
import { Suspense, useEffect } from "react";
import useUserInfoStore from "@/store/useUserInfoStore";

const DashboardContent = () => {
  const authToken = useGetAuthToken();
  const { projects, setUserInfo, setProjectsInfo } = useUserInfoStore();

  const handleGetRequest = async (token: string) => {
    try {
      const res = await fetch(
        "https://syncd-backend.i-dear.org/v1/user/userinfo",
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      console.log("data: ", JSON.stringify(data, null, 2));
      setUserInfo({
        id: data.userId,
        avatar: data.img,
        email: data.email,
        name: data.name,
      });
      setProjectsInfo(data.projects);
    } catch (error) {
      console.log("error: ", JSON.stringify(error, null, 2));
    }
  };

  useEffect(() => {
    if (authToken) {
      handleGetRequest(authToken);
    }
  }, [authToken]);

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
        {projects.length ? (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <span>No projects found</span>
        )}
      </div>
    </div>
  );
};

const DashboardPage = () => (
  <Suspense fallback={<div>Loading dashboard...</div>}>
    <DashboardContent />
  </Suspense>
);

export default DashboardPage;
