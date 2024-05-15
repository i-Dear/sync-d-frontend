const SideBar = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: any,
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="absolute bottom-[10rem] left-[10rem]  bg-light-gray-100 px-[1.5rem] py-[1rem] text-[1.2rem] md:w-[20%] md:max-w-[25rem]">
      <div className="bg-[1rem]">색상을 선택하고, 캔버스에 올려놓으세요 !</div>
      <div
        className="mb-[1rem] flex h-[2rem] cursor-grab items-center justify-center rounded-[0.4rem] border border-div-text p-[0.4rem]"
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        Default Node
      </div>
    </aside>
  );
};

export default SideBar;
