import { GuideTextBoxTemplate } from "@/lib/types";

export default function GuideTextBox(props: GuideTextBoxTemplate) {
  const { title, x, y, width, height, fill, font, fontWeight } = props;
  return (
    <g>
      <rect
        width={width ? width : 800}
        x={x}
        y={y}
        height={height ? height : 50}
        fill={fill ? fill : "none"}
        stroke={"transparent"}
      />
      {props.title && (
        <text
          x={x + 20}
          y={y + 40}
          fontFamily="Arial"
          fontSize={font ? font : "14"}
          fill="#121417"
          fontWeight={fontWeight ? fontWeight : "bold"}
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
