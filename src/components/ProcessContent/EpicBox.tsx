import { EpicBoxTemplate } from "@/lib/types";

export default function EpicBox(props: EpicBoxTemplate) {
  const { id, title, x, y, width, height, length, font, value, fill } = props;

  return (
    <g>
      <rect
        width={width ? width : 200}
        x={x}
        y={y}
        height={height ? height : length * 100}
        stroke={"transparent"}
        fill={fill}
      />
      {props.title && (
        <text
          x={x + 20}
          y={y + 40}
          fontFamily="Arial"
          fontSize="12"
          fill="#121417"
        >
          {title}
        </text>
      )}
    </g>
  );
}
