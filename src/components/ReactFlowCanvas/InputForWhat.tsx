import { nanoid } from "nanoid";
import { useState } from "react";
import { Node, Position } from "reactflow";

const COLORS = [
  "rgba(128, 140, 160, 1)", // Bright and saturated navy blue
  "rgba(100, 140, 190, 1)", // Bright and saturated cobalt blue
  "rgba(190, 100, 100, 1)", // Bright and saturated crimson
  "rgba(190, 190, 100, 1)", // Bright and saturated golden yellow
  "rgba(100, 190, 100, 1)", // Bright and saturated kelly green
  "rgba(100, 190, 190, 1)", // Bright and saturated turquoise
  "rgba(190, 100, 190, 1)", // Bright and saturated magenta
  "rgba(160, 160, 160, 1)", // Bright and saturated medium gray
];

const InputForWhat = ({
  addWhatNode,
}: {
  addWhatNode: (node: Node) => void;
}) => {
  const [label, setLabel] = useState("");

  const onChangeLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const handleClick = () => {
    const id = nanoid();

    const position = {
      x: Math.floor(Math.random() * 400),
      y: Math.floor(Math.random() * 450),
    };

    type Parent = "parent";

    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    const newNode = {
      id,
      position,
      type: "input",
      style: { borderColor: color },
      data: {
        label,
        color,
      },
      sourcePosition: "right" as Position,
      parentId: "WHAT",
      extent: "parent" as Parent,
    };

    addWhatNode(newNode);
    setLabel("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="z-100 absolute bottom-[8rem] left-[8rem] flex h-[8.4rem] w-[48.7rem] items-center justify-center gap-[1.6rem] rounded-[1.2rem] bg-white p-[1.6rem] shadow-lg shadow-light-gray-100">
      <input
        type="text"
        placeholder="근본적인 문제는 무엇일까요?"
        value={label}
        className=" h-[4.8rem] w-[40rem] rounded-[0.8rem] border border-light-gray-100 p-[1.2rem] text-[1.6rem] font-normal text-black focus:outline-none"
        onChange={onChangeLabel}
        onKeyPress={handleKeyPress}
      />
      <button
        className="bg-primary-100 h-[4.8rem] w-[8rem] rounded-[0.8rem] bg-primary-400 text-[1.6rem] font-semibold text-white"
        onClick={handleClick}
      >
        추가
      </button>
    </div>
  );
};

export default InputForWhat;
