const ColorSelector = ({
  nodeBorderColor,
  setNodeBorderColor,
}: {
  nodeBorderColor: string;
  setNodeBorderColor: (color: string) => void;
}) => {
  return (
    <div
      className="absolute right-[30rem] top-[10rem] rounded-[0.4rem] border border-div-text bg-light-gray-100 px-[1.5rem] py-[1rem] text-[1.2rem] md:w-[20%] md:max-w-[25rem]
    "
    >
      <div>
        Pick a color 🎨 <strong>{nodeBorderColor}</strong>
      </div>
      <input
        className="nodrag"
        type="color"
        onChange={(e) => setNodeBorderColor(e.target.value)}
        defaultValue={nodeBorderColor}
      />
    </div>
  );
};

export default ColorSelector;
