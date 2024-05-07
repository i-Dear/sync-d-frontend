import { GuideTextBoxTemplate } from "@/lib/types";

export default function GuideTextBox(props: GuideTextBoxTemplate) {
  const { title, x, y, width, height, fill } = props;

  return (
    <g>
      <rect
        width={width}
        x={x}
        y={y}
        height={height}
        fill={fill}
        stroke={"transparent"}
      />
      {props.title && (
        <text
          x={x + 20}
          y={y + 40}
          fontFamily="Arial"
          fontSize="14"
          fill="#121417"
          fontWeight={"bold"}
        >
          {title}
        </text>
      )}
    </g>
  );
}
