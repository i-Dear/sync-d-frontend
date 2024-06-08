"use client";

import useGetAuthToken from "@/hooks/useGetAuthToken";
import useUserInfoStore from "@/store/useUserInfoStore";
import ProjectCard from "./ProjectCard";
import { useEffect } from "react";
import { getUserInfo } from "@/lib/data";

const ProjectCards = () => {
  const authToken = useGetAuthToken();
  const { projects, setUserInfo, setProjectsInfo } = useUserInfoStore();

  const recentProjects = projects.sort(
    (a, b) =>
      new Date(b.lastModifiedDate).getTime() -
      new Date(a.lastModifiedDate).getTime(),
  );

  useEffect(() => {
    if (authToken) {
      getUserInfo(authToken).then((data) => {
        if (data) {
          setUserInfo({
            id: data.userId,
            avatar: data.img,
            email: data.email,
            name: data.name,
          });
          setProjectsInfo(data.projects);
        }
      });
    }
  }, [authToken, getUserInfo]);

  return (
    <div className="flex w-[98.2rem] items-center justify-start gap-[3.2rem] overflow-x-auto scrollbar-hide">
      {recentProjects.length ? (
        recentProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))
      ) : (
        <span>No projects found</span>
      )}
    </div>
  );
};

export default ProjectCards;
