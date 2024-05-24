import { useMutation, useStorage } from "~/liveblocks.config";
import { VoteLayer } from "@/lib/types";
import { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { cn } from "@/lib/utils";
import DoubleQuoteOpenIcon from "~/public/DoubleQuoteOpen";
import DoubleQuoteCloseIcon from "~/public/DoubleQouteClose";

type VoteProps = {
  id: string;
  layer: VoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export default function Persona({ layer, onPointerDown, id }: VoteProps) {
  const { x, y, width, height, title, value, length } = layer;
  const [isFocused, setFocused] = useState(false);

  const updateTitle = useMutation(({ storage }, value) => {
    const liveLayers = storage.get("layers");
    const prevContent = liveLayers.get(id)?.get("value");
    liveLayers.get(id)?.set("title", value);
  }, []);

  const updateValue = useMutation(({ storage }, value) => {
    const liveLayers = storage.get("layers");
    const prevContent = liveLayers.get(id)?.get("value");
    liveLayers.get(id)?.set("value", value);
  }, []);

  const layerIds = useStorage((root) => root.layerIds);
  const layers = useStorage((root) => root.layers);
  const voteCounts = layerIds
    .map((id) => layers.get(id))
    .filter((v) => v?.type === 8).length;

  const number = voteCounts;

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };
  return (
    // <foreignObject
    //   x={x}
    //   y={y}
    //   width={width ? width : 300}
    //   height={height ? height : 250}
    //   style={{ background: "#E9F5FF" }}
    //   className={cn("h-[250] flex-col rounded-lg p-[2rem]", {
    //     "border border-2 border-primary": isFocused,
    //   })}
    //   onPointerDown={(e) => onPointerDown(e, id)}
    //   onFocus={handleFocus}
    //   onBlur={handleBlur}
    // >
    //   <ContentEditable
    //     html={value || ""}
    //     onChange={(e) => {
    //       updateValue(e.target.value);
    //     }}
    //     className={`font-Manrope flex h-[30px] w-full items-center justify-normal text-3xl font-black text-primary-400 outline-none`}
    //   />
    // </foreignObject>
    <g
      className="flex items-center justify-center"
      onPointerDown={(e) => onPointerDown(e, id)}
    >
      <g>
        <ellipse
          style={{
            transform: `translate(${x}px, ${y}px)`,
          }}
          cx={100}
          cy={100}
          rx={100}
          ry={100}
          fill={"#FFF"}
          stroke="#D4EAFB"
          strokeWidth="4"
          className="cursor-pointer"
        />
        <g>
          <text
            x={x + 70}
            y={y + 135}
            fontFamily="Arial"
            fontSize="110"
            fill="#D4EAFB"
          >
            {length}
          </text>
          {/* <foreignObject
            x={x + 50}
            y={y + 50}
            width={200}
            height={100}
            className="cursor-pointer"
          >
            {length}
          </foreignObject> */}
        </g>
      </g>

      <foreignObject
        x={x + 225}
        y={y + 25}
        width={300}
        height={50}
        style={{
          borderBottom: "4px solid #61788A",
        }}
        className="rounded-md"
      >
        <div className="flex">
          <DoubleQuoteOpenIcon fill="#61788A" width={20} height={20} />
          <ContentEditable
            html={title || ""}
            onChange={(e) => {
              updateTitle(e.target.value);
            }}
            className={`font-Manrope text-bold flex h-full w-full justify-center p-[1rem]  text-3xl text-zinc-600 outline-none`}
          />
          <DoubleQuoteCloseIcon fill="#61788A" width={20} height={20} />
        </div>
      </foreignObject>
      <foreignObject
        x={x + 225}
        y={y + 100}
        width={300}
        height={100}
        style={{ backgroundColor: "#F0F2F5" }}
        className="rounded-xl"
      >
        <ContentEditable
          html={value || ""}
          onChange={(e) => {
            updateValue(e.target.value);
          }}
          className={`font-Manrope text-bold flex h-full w-full justify-normal  p-[2rem]  text-3xl text-zinc-600 outline-none`}
        />
      </foreignObject>
    </g>
  );
}
