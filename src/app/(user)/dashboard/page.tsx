import ProjectSearchBar from "@/components/ProjectSearchBar";
import Modal from "@/components/Modals";
import CreateProjectButton from "@/components/CreateProjectButton";
import ProjectCards from "@/components/ProjectCards";

const DashboardPage = () => {
  return (
    <div className="flex w-full flex-col gap-[2.4rem] px-[3.6rem] pt-[3.6rem]">
      <CreateProjectButton />
      <h1 className="m-0 text-[3.6rem] font-bold tracking-[-0.08rem]">
        Recent Projects
      </h1>
      <ProjectSearchBar />
      <ProjectCards />
      <Modal />
    </div>
  );
};

export default DashboardPage;
