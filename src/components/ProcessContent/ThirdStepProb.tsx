import { ThirdStepProbTemplate } from "@/lib/types";

export default function ThirdStepProb(props: ThirdStepProbTemplate) {
  const { title, x, y, width, height, fill } = props;

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
      />
      {props.title && (
        <text
          x={x + 70}
          y={y + 135}
          fontFamily="Arial"
          fontSize="110"
          fill="#F0F2F5"
        >
          {title}
        </text>
      )}
    </g>
  );
}
