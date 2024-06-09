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
  const { x, y, width, height, title, value, number } = layer;
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

  return (
    <g onPointerDown={(e) => onPointerDown(e, id)}>
      <rect
        x={x - 20}
        y={y - 20}
        rx={10}
        ry={10}
        width={width}
        height={height}
        fill="#FFF" // White background color
        stroke="#F0F2F5"
        strokeWidth="2"
        strokeDasharray="5,5" // Dashed line
        className="rounded-3xl"
      />
      <g>
        <ellipse
          style={{
            transform: `translate(${x}px, ${y}px)`,
          }}
          cx={75}
          cy={75}
          rx={75}
          ry={75}
          fill={"#FFF"}
          stroke="#D4EAFB"
          strokeWidth="4"
          className="cursor-pointer"
        />
        <g>
          <text
            x={x + 42}
            y={y + 116}
            fontFamily="Arial"
            fontSize="110"
            fill="#D4EAFB"
          >
            {number + 1}
          </text>
        </g>
      </g>
      <foreignObject
        x={x + 180}
        y={y}
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
        x={x + 180}
        y={y + 60}
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
