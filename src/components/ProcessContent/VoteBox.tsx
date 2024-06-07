import { Layer, LayerType, VoteBoxTemplate, TemplateType } from "@/lib/types";
import { LiveObject } from "@liveblocks/client";
import { useStorage, useMutation } from "~/liveblocks.config";
import PlusMarkIcon from "~/public/PlusMark";
import { useState } from "react";
import { nanoid } from "nanoid";
import DoubleQuoteOpenIcon from "~/public/DoubleQuoteOpen";
import DoubleQuoteCloseIcon from "~/public/DoubleQouteClose";

export default function VoteBox(props: VoteBoxTemplate) {
  const { id, title, x, y, width, height, value } = props;
  const [isHovered, setIsHovered] = useState(false);
  const templates = useStorage((root) => root.templates);

  const handleAdd = useMutation(({ storage }) => {
    const layers = storage.get("layers");
    const liveLayerIds = storage.get("layerIds");
    const voteMap = storage.get("voteList").get("voteMap");
    const voteCounts = liveLayerIds
      .map((id) => layers.get(id))
      .filter((v) => v?.get("type") === 8).length;
    if (voteCounts >= 5) return;
    const length = voteMap.findIndex((v) => !v);
    storage.get("voteList").get("voteMap").set(length, true);
    const layerId = nanoid();
    const voteLayer = new LiveObject<Layer>({
      type: LayerType.Vote,
      title: "",
      value: "",
      width: 560,
      height: 220,
      x: 650,
      y: 2125,
      length: length,
    });
    liveLayerIds.push(layerId);
    layers.set(layerId, voteLayer);
  }, []);

  return (
    <g
      className="flex items-center justify-center"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <g>
        <ellipse
          style={{
            transform: `translate(${x}px, ${y}px)`,
          }}
          cx={width / 2}
          cy={height / 2}
          rx={width / 2}
          ry={height / 2}
          fill={isHovered ? "#369EFF" : "#FFF"}
          stroke="#D4EAFB"
          strokeWidth="4"
          onClick={() => handleAdd()}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => setIsHovered(false)}
          className="cursor-pointer"
        />
        <g>
          <foreignObject
            x={x + 50}
            y={y + 50}
            width={200}
            height={100}
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onClick={handleAdd}
            onMouseLeave={() => setIsHovered(false)}
            className="cursor-pointer"
          >
            <PlusMarkIcon fill="#D4EAFB " width={100} height={100} />
          </foreignObject>
        </g>
      </g>

      <foreignObject
        x={x + 225}
        y={y + 25}
        width={300}
        height={50}
        style={{
          borderBottom: "4px solid #61788A",
          backgroundColor: isHovered ? "#F0F2F5" : "",
        }}
        className="cursor-pointer rounded-md"
      >
        <div className="flex">
          <DoubleQuoteOpenIcon fill="#61788A" width={20} height={20} />
          <div
            className={`font-Manrope text-bold flex h-full w-full select-none justify-center  p-[1rem] text-3xl text-zinc-600 outline-none`}
          >
            문제 정의
          </div>
          <DoubleQuoteCloseIcon fill="#61788A" width={20} height={20} />
        </div>
      </foreignObject>
      <foreignObject
        x={x + 225}
        y={y + 100}
        width={300}
        height={100}
        style={{ backgroundColor: isHovered ? "#D5D6D6" : "#F0F2F5" }}
        className="cursor-pointer rounded-xl"
      >
        <div
          className={`font-Manrope text-bold flex h-full w-full select-none  justify-normal  p-[2rem] text-3xl text-zinc-600 outline-none`}
        >
          문제를 설명해주세요!
        </div>
      </foreignObject>
    </g>
  );
}
