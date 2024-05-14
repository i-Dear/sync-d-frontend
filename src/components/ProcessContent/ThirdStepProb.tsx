import { ThirdStepProbTemplate } from "@/lib/types";
import { useMutation } from "~/liveblocks.config";
import { TemplateType } from "@/lib/types";
import { useStorage } from "~/liveblocks.config";
import PlusMarkIcon from "~/public/plus-mark.svg";
import { useState } from "react";
import Image from "next/image";

export default function ThirdStepProb(props: ThirdStepProbTemplate) {
  const { id, title, x, y, width, height, value } = props;

  const templates = useStorage((root) => root.templates);

  const handleAdd = useMutation(
    ({ storage }) => {
      const templates = storage.get("templates");
      const ThirdStepList = templates.filter(
        (v) => v.type === TemplateType.ThirdStepProb,
      );
      const ThirdStepLength = ThirdStepList.length;

      if (ThirdStepLength >= 6) return;

      const lastThirdStep = ThirdStepList[
        ThirdStepLength - 1
      ] as ThirdStepProbTemplate;

      templates.push({
        id: `${parseInt(lastThirdStep.id) + 1}`,
        type: TemplateType.ThirdStepProb,
        title: "문제템플릿",
        x: ThirdStepLength === 3 ? 200 : lastThirdStep.x + 250,
        y: ThirdStepLength >= 3 ? 2450 : 2050,
        width: width,
        height: height,
        fill: "#D4EAFB",
        value: lastThirdStep.value + 1,
      });
    },
    [templates],
  );

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
        fill="#FFF"
        stroke="#D4EAFB"
        strokeWidth="4"
        onClick={() => (value === 0 ? handleAdd() : "")}
      />
      {value === 0 ? (
        <g>
          <foreignObject x={x + 50} y={y + 50} width={200} height={100}>
            <PlusMarkIcon fill="#D4EAFB " />
          </foreignObject>
        </g>
      ) : (
        <text
          x={x + 70}
          y={y + 135}
          fontFamily="Arial"
          fontSize="110"
          fill="#F0F2F5"
        >
          {value}
        </text>
      )}
    </g>
  );
}
