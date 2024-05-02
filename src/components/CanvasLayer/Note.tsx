import { NoteLayer } from "@/lib/types";
import { colorToCss } from "@/lib/utils";

type Props = {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export default function Note({
  layer,
  onPointerDown,
  id,
  selectionColor,
}: Props) {
  const { x, y, width, height, fill } = layer;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill ? colorToCss(fill) : "#CCC"}
        strokeWidth={1}
        stroke={selectionColor || "transparent"}
        pointerEvents="none" // Prevent the rectangle from intercepting pointer events
      />
      <foreignObject x={x} y={y} width={width} height={height}>
        {/* HTML div with contenteditable attribute */}
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            resize: "none",
            background: "none",
            outline: "none",
            padding: "8px",
            boxSizing: "border-box",
            fontFamily: "Arial",
            fontSize: "14px",
            color: "#000",
            overflow: "auto", // Ensure scrollbars appear when content overflows
          }}
          contentEditable // Set contenteditable attribute to true
          onPointerDown={(e) => onPointerDown(e, id)}
        />
      </foreignObject>
    </g>
  );
}
