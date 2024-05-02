import SearchIcon from "~/public/search.svg";

const ProjectSearchBar = () => {
  return (
    <div className="flex h-[5.2rem] w-[61.2rem] items-center justify-start rounded-[1.2rem] bg-light-gray-100 px-[1.6rem] py-[1.4rem]">
      <SearchIcon />
      <input
        type="text"
        placeholder="Search..."
        className="ml-[1.2rem] bg-transparent text-[1.6rem] font-light leading-[1.6rem] text-time"
      />
    </div>
  );
};

export default ProjectSearchBar;
