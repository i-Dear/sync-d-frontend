import { ProjectInfo } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import EllipsisVertical from "~/public/ellipsis-vertical.svg";

const ProjectCard = ({ project }: { project: ProjectInfo }) => {
  return (
    <div className="flex h-[30rem] w-[30.6rem] cursor-pointer flex-col items-center justify-start">
      <Link href={`/board/${project.id}`}>
        <div className="w-[30.6rem]">
          <Image
            src="/default-thumbnail.png"
            alt="projectThumbnail"
            width={306}
            height={186}
          />
        </div>
        <div className="flex w-full flex-col items-start justify-start p-[1.2rem]">
          <div className="flex w-full items-center justify-between ">
            <span className="text-[1.6rem] font-normal">{project.name}</span>
            <EllipsisVertical />
          </div>
          <p className="w-full text-[1.4rem] font-thin text-time">
            {project.description}
          </p>
          <p className="w-full text-[1.4rem] font-thin text-time">5 members</p>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
