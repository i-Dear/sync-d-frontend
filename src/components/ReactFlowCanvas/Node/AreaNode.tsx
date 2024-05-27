import { memo } from "react";
import { NodeProps } from "reactflow";

const AreaNode = ({ data }: NodeProps) => {
  return (
    <>
      <span className="absolute left-[1.4rem] top-[1.4rem] gap-[0.8rem] text-[1.6rem] font-semibold text-black">
        {data.label}
        {data.description.map((description: string, index: number) => (
          <span
            key={index}
            className="block text-[1.2rem] font-normal text-black"
          >
            {description}
          </span>
        ))}
      </span>
    </>
  );
};

export default memo(AreaNode);
