import { useState, useEffect } from "react";
import { ProjectInfo } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import EllipsisVertical from "~/public/ellipsis-vertical.svg";
import ProjectDetailBox from "./ProjectDetailBox";
import { useToggle } from "@/hooks/useToggle";

const ProjectCard = ({ project }: { project: ProjectInfo }) => {
  const [detailBoxPosition, setDetailBoxPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isDetailBoxOpen, setIsDetailBoxOpen] = useToggle();

  const handleEllipsisClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const boundingRect = event.currentTarget.getBoundingClientRect();
    setDetailBoxPosition({
      x: boundingRect.left,
      y: boundingRect.top - boundingRect.height, // Position above the button
    });
    setIsDetailBoxOpen();
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
    <div className="flex h-[30rem] w-[30.6rem] flex-col items-center justify-start">
      <Link href={`/board/${project.id}`}>
        <div className="w-[30.6rem]">
          <Image
            src="/default-thumbnail.png"
            alt="projectThumbnail"
            width={306}
            height={186}
          />
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
          <p className="w-full text-[1.4rem] font-thin text-time">5 members</p>
          {isDetailBoxOpen && detailBoxPosition && (
            <div
              className="fixed z-10"
              style={{
                top: `${detailBoxPosition.y}px`,
                left: `${detailBoxPosition.x}px`,
              }}
            >
              <ProjectDetailBox project={project} />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
