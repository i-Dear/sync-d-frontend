import { ThirdStepAddTemplate } from "@/lib/types";
import { useMutation } from "~/liveblocks.config";
import { TemplateType } from "@/lib/types";
import { syncTemplates } from "@/lib/templates";
import { useStorage } from "~/liveblocks.config";
import { use, useEffect, useState } from "react";

export default function ThirdStepAdd(props: ThirdStepAddTemplate) {
  const [count, setCount] = useState(0);
  const { id, title, x, y, width, height, value } = props;

  const templates = useStorage((root) => root.templates);

  const handleAdd = useMutation(
    ({ storage }) => {
      const templates = storage.get("templates");
      const ExistingThirdStepProb = templates.filter(
        (v) => v.type === TemplateType.ThirdStepAdd,
      );
      const len = ExistingThirdStepProb.length;
      if (len >= 6) return;

      const prevTemplate = ExistingThirdStepProb[
        len - 1
      ] as ThirdStepAddTemplate;

      templates.push({
        id: `${parseInt(prevTemplate.id) + 1}`,
        type: TemplateType.ThirdStepAdd,
        title: "문제템플릿",
        x: len === 3 ? 200 : prevTemplate.x + 250,
        y: len >= 3 ? 2450 : 2050,
        width: width,
        height: height,
        fill: "#F5F5F5",
        value: prevTemplate.value + 1,
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
        stroke="#F0F2F5"
        strokeWidth="4"
        onClick={() => (value === 0 ? handleAdd() : "")}
      />
      {props.title && (
        <text
          x={x + 70}
          y={y + 135}
          fontFamily="Arial"
          fontSize="110"
          fill="#F0F2F5"
        >
          {value === 0 ? "+" : value}
        </text>
      )}
    </g>
  );
}
