"use client";

import useModalStore from "@/store/useModalStore";
import PlusIcon from "~/public/PlusMark";

const CreateProjectButton = () => {
  const { setModalType, setModalState } = useModalStore();

  const handleCreateProject = () => {
    setModalType("createProject");
    setModalState(true);
  };

  return (
    <div
      onClick={handleCreateProject}
      className="flex h-[7.6rem] w-[30.6rem] cursor-pointer items-center justify-center gap-[2.4rem] rounded-[1.2rem] bg-primary"
    >
      <PlusIcon />
      <span className="text-[2.4rem] text-white">New Project</span>
    </div>
  );
};

export default CreateProjectButton;
