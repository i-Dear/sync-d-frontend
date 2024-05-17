import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

const EdgeLabel = ({
  transform,
  label,
  handleLabelChange,
}: {
  transform: string;
  label: string;
  handleLabelChange: (e: ContentEditableEvent) => void;
}) => {
  return (
    <div
      className="z-500 absolute bg-transparent p-[1rem] text-[1.4rem] font-semibold  "
      style={{ transform }}
    >
      <div className="flex h-[3.6rem] min-w-[4rem] items-center justify-center rounded-[1.2rem] bg-light-gray-100 p-[0.4rem] shadow-sm">
        <ContentEditable
          className=" flex h-full w-full items-center justify-center p-[1rem] text-[1.4rem] text-black outline-none"
          html={label || ""}
          onChange={handleLabelChange}
          style={{ pointerEvents: "all" }}
        />
      </div>
    </div>
  );
};

export default EdgeLabel;
