import { EpicBoxTemplate } from "@/lib/types";
import { useMutation } from "~/liveblocks.config";
import PlusMarkIcon from "~/public/PlusMark";
import { useState } from "react";
import { Layer, LayerType } from "@/lib/types";
import { LiveObject } from "@liveblocks/client";
import { nanoid } from "nanoid";

export default function EpicBox(props: EpicBoxTemplate) {
  const { id, x, y, width, height } = props;

  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = useMutation(({ storage }) => {
    const layers = storage.get("layers");
    const liveLayerIds = storage.get("layerIds");

    const layerId = nanoid();
    const EpicLayer = new LiveObject<Layer>({
      type: LayerType.Epic,
      title: "주체",
      length: 3,
      width: 300,
      height: 0,
      value: [
        {
          id: 1,
          name: "유저스토리",
        },
        {
          id: 2,
          name: "유저스토리",
        },
        {
          id: 3,
          name: "유저스토리",
        },
      ],
      x: 110,
      y: 10100,
    });
    liveLayerIds.push(layerId);
    layers.set(layerId, EpicLayer);
  }, []);

  return (
    <g>
      <rect
        width={width ? width : 340}
        x={x}
        y={y}
        rx={10}
        ry={10}
        height={height ? height : 300}
        fill={isHovered ? "#369EFF" : "#FFF"}
        stroke={"#D4EAFB"}
        strokeWidth="2"
        onClick={() => handleAdd()}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        className="cursor-pointer overflow-hidden rounded-[1.2rem]"
      />

      <foreignObject
        x={x + 90}
        y={y + 70}
        width={100}
        height={100}
        onClick={() => handleAdd()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="cursor-pointer"
      >
        <PlusMarkIcon fill="#D4EAFB" width={100} height={100} />
      </foreignObject>
    </g>
  );
}
