import { PersonaBoxTemplate } from "@/lib/types";
import { useMutation } from "~/liveblocks.config";
import PlusMarkIcon from "~/public/PlusMark";
import { useState } from "react";
import { Layer, LayerType } from "@/lib/types";
import { LiveObject } from "@liveblocks/client";
import { nanoid } from "nanoid";

export default function PersonaBox(props: PersonaBoxTemplate) {
  const { id, x, y, width, height, value } = props;

  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = useMutation(({ storage }) => {
    const layers = storage.get("layers");
    const liveLayerIds = storage.get("layerIds");

    const layerId = nanoid();
    const personaLayer = new LiveObject<Layer>({
      type: LayerType.Persona,
      title: "persona",
      value: [
        { title: "info", value: "인적사항" },
        { title: "personality", value: "특징" },
        { title: "detail", value: "상세정보" },
      ],
      width: 380,
      height: 250,
      x: 450,
      y: 3150,
    });
    liveLayerIds.push(layerId);
    layers.set(layerId, personaLayer);
    console.log("addPersonaLayer");
  }, []);

  return (
    <g>
      <rect
        width={width ? width : 800}
        x={x}
        y={y}
        rx={10}
        ry={10}
        height={height ? height : 200}
        fill={isHovered ? "#369EFF" : "#FFF"}
        stroke={"#D4EAFB"}
        strokeWidth="4"
        onClick={() => handleAdd()}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        className="cursor-pointer"
      />

      <foreignObject
        x={x + 100}
        y={y + 75}
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
