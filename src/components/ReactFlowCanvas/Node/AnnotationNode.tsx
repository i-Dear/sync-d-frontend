import { memo } from "react";
import { Node } from "reactflow";

const AnnotationNode = ({ data }: { data: Node["data"] }) => {
  return (
    <div className="flex flex-col items-start justify-center">
      <div className="flex items-center gap-[0.4rem] p-[1rem]">
        <span className="text-[1.4rem] font-semibold ">{data.level}.</span>
        <span className="text-[1.4rem] font-normal">{data.label}</span>
      </div>
      {data.arrowStyle && <div style={data.arrowStyle}>⤹</div>}
    </div>
  );
};

export default memo(AnnotationNode);
