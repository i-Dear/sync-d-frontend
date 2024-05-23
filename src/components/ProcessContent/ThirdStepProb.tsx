import {
  Layer,
  LayerType,
  ThirdStepProbTemplate,
  TemplateType,
} from "@/lib/types";
import { LiveObject } from "@liveblocks/client";
import { useStorage, useMutation } from "~/liveblocks.config";
import PlusMarkIcon from "~/public/PlusMark";
import { useState } from "react";
import { nanoid } from "nanoid";

export default function ThirdStepProb(props: ThirdStepProbTemplate) {
  const { id, title, x, y, width, height, value } = props;
  const [isHovered, setIsHovered] = useState(false);
  const templates = useStorage((root) => root.templates);

  // const handleAdd = useMutation(
  //   ({ storage }) => {
  //     const templates = storage.get("templates");
  //     const ThirdStepList = templates.filter(
  //       (v) => v.type === TemplateType.ThirdStepProb,
  //     );
  //     const ThirdStepLength = ThirdStepList.length;

  //     if (ThirdStepLength >= 6) return;

  //     const lastThirdStep = ThirdStepList[
  //       ThirdStepLength - 1
  //     ] as ThirdStepProbTemplate;

  //     templates.push({
  //       id: `${parseInt(lastThirdStep.id) + 1}`,
  //       type: TemplateType.ThirdStepProb,
  //       title: "문제템플릿",
  //       x: ThirdStepLength === 3 ? 200 : lastThirdStep.x + 250,
  //       y: ThirdStepLength >= 3 ? 2450 : 2050,
  //       width: width,
  //       height: height,
  //       fill: "#D4EAFB",
  //       value: lastThirdStep.value + 1,
  //     });
  //   },
  //   [templates],
  // );
  const handleAdd = useMutation(({ storage }) => {
    const layers = storage.get("layers");
    const liveLayerIds = storage.get("layerIds");

    const layerId = nanoid();
    const voteLayer = new LiveObject<Layer>({
      type: LayerType.Vote,
      value: "주제",
      width: 380,
      height: 250,
      x: 450,
      y: 2050,
    });
    liveLayerIds.push(layerId);
    layers.set(layerId, voteLayer);
  }, []);

  return (
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
  );
}
