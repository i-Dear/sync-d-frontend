const NodeCreator = ({
  nodeColor,
  setNodeColor,
}: {
  nodeColor: string;
  setNodeColor: (color: string) => void;
}) => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: any,
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="absolute bottom-[10rem] left-[13rem] h-fit w-fit rounded-[1.2rem] border border-light-gray-100 bg-white p-[1.5rem] text-[1.4rem] shadow-lg">
      <div className="flex w-full items-center gap-[1.6rem]">
        <div className="flex h-full w-[2.4rem] flex-col items-center justify-between gap-[0.8rem]">
          <input
            type="color"
            className=" m-0 h-[5.6rem] w-[2.4rem] cursor-pointer bg-white p-0 outline-none"
            onChange={(e) => setNodeColor(e.target.value)}
            defaultValue={nodeColor}
          />
          <div className="text-center text-[1.4rem]">🎨</div>
        </div>
        <div className="flex h-full w-[15.2rem] flex-col items-center justify-between gap-[0.8rem]">
          <div
            className="relative flex h-[5.6rem] w-[15.2rem] cursor-grab items-center justify-center overflow-hidden rounded-[1.2rem] border-[0.1rem] bg-white font-semibold shadow-md"
            style={{
              borderColor: nodeColor,
            }}
            onDragStart={(event) => onDragStart(event, "stakeholderNode")}
            draggable
          >
            <div className="customHandle" style={{ background: nodeColor }} />

            <div className="absolute left-[1rem] top-[1rem] flex w-[8rem] items-center gap-[0.4rem]">
              <span
                style={{ background: nodeColor }}
                className="dragHandle h-[1.25rem] w-[1.25rem] rounded-full "
              />
              <span
                style={{ color: nodeColor }}
                className="w-[full] text-[0.8rem] font-normal opacity-50"
              >
                ← Grab here
              </span>
            </div>

            <span
              style={{ color: nodeColor }}
              className="absolute right-[1.3rem] top-[0.4rem] text-[0.8rem] font-normal opacity-50"
            >
              Connect here →
            </span>
          </div>

          <div className="text-center text-[1.4rem] font-semibold">
            Drag & Drop !
          </div>
        </div>
      </div>
    </aside>
  );
};

export default NodeCreator;
