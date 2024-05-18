import { memo } from "react";
import { Handle, Node, Position } from "reactflow";

const ContentNode = ({ data }: { data: Node["data"] }) => {
  return (
    <>
      <Handle
        position={Position.Left}
        className="invisible"
        style={{ background: data.color }}
        type="target"
      />
      <div className="flex h-[4.8rem] w-[12.8rem] items-center justify-center rounded-[1.2rem] bg-light-gray-100 text-[1.4rem] font-semibold text-white">
        {data?.label}
      </div>
    </>
  );
};

export default memo(ContentNode);
