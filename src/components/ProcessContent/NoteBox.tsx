import { NoteBoxTemplate } from "@/lib/types";

export default function NoteBox(props: NoteBoxTemplate) {
  const { title, x, y, width, height, fill } = props;

  return (
    <g>
      <rect
        width={width ? width : 800}
        x={x}
        y={y}
        height={height ? height : 200}
        fill={fill}
        stroke={"transparent"}
      />
      {props.title && (
        <text
          x={x + 20}
          y={y + 30}
          fontFamily="Arial"
          fontSize="14"
          fill="#121417"
        >
          {title?.split("\n").map((line, index) => (
            <tspan x={x + 20} dy={index > 0 ? "1.2em" : 0} key={index}>
              {line}
            </tspan>
          ))}
        </text>
      )}
    </g>
  );
}
