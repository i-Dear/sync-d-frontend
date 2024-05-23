import { memo } from "react";
import { Node } from "reactflow";

const AnnotationNode = ({ data }: { data: Node["data"] }) => {
  return (
    <div className="flex flex-col items-start justify-center">
      <div className="flex items-center gap-[0.4rem] p-[1rem]">
        <div className={`flex flex-col text-3xl text-[1.4rem] font-normal`}>
          {data.label
            ?.split("\n")
            .map((label: string, index: number) => (
              <span key={index}>{label}</span>
            ))}
        </div>
      </div>
      {data.arrowStyle && <div style={data.arrowStyle}>⤹</div>}
    </div>
  );
};

export default memo(AnnotationNode);
