import { MenuType, ProjectInfo } from "@/lib/types";
import SettingsIcon from "~/public/settings.svg";
import ShareIcon from "~/public/share.svg";
import TrashIcon from "~/public/trash.svg";
import { deleteProject } from "@/lib/data";
import useGetAuthToken from "@/hooks/useGetAuthToken";
import { cn } from "@/lib/utils";
import XMarkIcon from "~/public/Xmark";

type ProjectDetailBoxProps = {
  project: ProjectInfo;
  setIsDetailBoxOpen: () => void;
};

const ProjectDetailBox = ({
  project,
  setIsDetailBoxOpen,
}: ProjectDetailBoxProps) => {
  const authToken = useGetAuthToken();

  const Menus: MenuType[] = [
    {
      title: "Project settings",
      icon: SettingsIcon,
      onClick: () => console.log("Setting"),
    },
    {
      title: "Share",
      icon: ShareIcon,
      onClick: () => console.log("Share"),
    },
    {
      title: "Delete project",
      icon: TrashIcon,
      onClick: () => {
        if (!authToken) return console.error("authToken does not exist");
        deleteProject(authToken, project.id);
        window.location.reload();
      },
    },
  ];

  return (
    <div className="relative flex h-[16.8rem] w-[16.4rem] flex-col items-center justify-start rounded-[1.2rem] bg-white shadow-md shadow-light-gray-100">
      <div className="flex w-full flex-col items-start justify-center gap-[0.4rem] border-b-[1px] border-light-gray-100 p-[1.6rem]">
        <span className="text-[1.4rem] font-thin text-time">
          role:{" "}
          <span className="font-normal text-div-text">{project.role}</span>
        </span>
      </div>
      <div className="flex w-full flex-col items-start justify-center gap-[0.4rem] p-[1.6rem]">
        {Menus.map((menu) => (
          <div
            key={menu.title}
            className="flex w-full cursor-pointer items-center justify-start gap-[1.2rem]"
            onClick={menu.onClick}
          >
            <menu.icon />
            <div className="w-fit">
              <span
                className={cn(
                  "mt-[0.8rem] h-[2rem] text-[1.4rem] font-normal leading-[2rem] text-div-text",
                  {
                    "text-red-300": menu.title === "Delete project",
                  },
                )}
              >
                {menu.title}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button
        className="absolute right-6 top-8 cursor-pointer"
        onClick={() => setIsDetailBoxOpen()}
      >
        <XMarkIcon width={18} height={18} fill="lightgray" />
      </button>
    </div>
  );
};

export default ProjectDetailBox;
