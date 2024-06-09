import { useState, useEffect } from "react";
import { ProjectInfo } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import EllipsisVertical from "~/public/ellipsis-vertical.svg";
import ProjectDetailBox from "./ProjectDetailBox";
import { useToggle } from "@/hooks/useToggle";
import { Progress } from "./Common/Progress";
import { getResult } from "@/lib/data";
import useGetAuthToken from "@/hooks/useGetAuthToken";

const ProjectCard = ({ project }: { project: ProjectInfo }) => {
  const [detailBoxPosition, setDetailBoxPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isDetailBoxOpen, setIsDetailBoxOpen] = useToggle();
  const authToken = useGetAuthToken();

  const handleEllipsisClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const boundingRect = event.currentTarget.getBoundingClientRect();
    setDetailBoxPosition({
      x: boundingRect.left,
      y: boundingRect.top - boundingRect.height, // Position above the button
    });
    setIsDetailBoxOpen();
  };

  const handleResultButtonClick = () => {
    if (!authToken) return;
    getResult(authToken, project.id).then((data) => {
      window.location.href = `${data.pdfUrl}`;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (detailBoxPosition) {
        const element = document.querySelector(
          ".ellipsis-button",
        ) as HTMLElement;
        if (element) {
          const boundingRect = element.getBoundingClientRect();
          setDetailBoxPosition({
            x: boundingRect.left,
            y: boundingRect.top - boundingRect.height,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [detailBoxPosition]);

  return (
    <div className="relative flex h-[30rem] w-[30.6rem] flex-col items-center justify-start">
      <Link href={`/board/${project.id}`}>
        <div className="relative h-[18.6rem] w-[30.6rem] overflow-hidden rounded-[1.2rem]">
          {project.progress === 12 && (
            <Image
              src="/confetti.png"
              alt="confetti"
              fill={true}
              className="absolute left-0 top-0 z-10 h-full w-full"
              priority
            />
          )}
          <Image
            src={project.projectImg || "/default-thumbnail.png"}
            alt="projectThumbnail"
            style={{
              objectFit: "cover",
            }}
            fill={true}
            priority
          />
          <div className="absolute bottom-0 h-[6px] w-full bg-slate-100">
            <Progress value={(project.progress / 12) * 100} />
          </div>
        </div>
        <div className="relative flex w-full flex-col items-start justify-start p-[1.2rem]">
          <div className="flex w-full items-center justify-between">
            <span className="text-[1.6rem] font-normal">{project.name}</span>
            <div
              className="ellipsis-button flex h-[2.4rem] w-[2.4rem] cursor-pointer items-center justify-center"
              onClick={handleEllipsisClick}
            >
              <EllipsisVertical />
            </div>
          </div>
          <p className="w-full text-[1.4rem] font-thin text-time">
            {project.description}
          </p>
          <p className="w-full text-[1.4rem] font-thin text-time">
            {project.userEmails.length} members
          </p>
        </div>
      </Link>
      {project.progress === 12 && (
        <button
          onClick={handleResultButtonClick}
          className="absolute bottom-[3.6rem] right-[1rem] h-[3.2rem] w-[6.6rem] rounded-[0.8rem] bg-primary text-[1.4rem] font-semibold text-white"
        >
          결과 &gt;
        </button>
      )}
      {isDetailBoxOpen && detailBoxPosition && (
        <div
          className="fixed z-10"
          style={{
            top: `${detailBoxPosition.y}px`,
            left: `${detailBoxPosition.x}px`,
          }}
        >
          <ProjectDetailBox
            project={project}
            setIsDetailBoxOpen={setIsDetailBoxOpen}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
