// type StickerProps = {
//   id: string;
//   onShapePointerDown: (e: PointerEvent<HTMLDivElement>, id: string) => void;
// };

// const Sticker = ({ id, onShapePointerDown }: StickerProps) => {
//   const { x, y, fill } = useStorage((root) => root.shapes.get(id)) ?? {};

//   const selectedByMe = useSelf((me) => me.presence.selectedShape === id);
//   const selectedByOthers = useOthers((others) => others.some((other) => other.presence.selectedShape === id));

//   return (
//     <div
//       onPointerDown={(e) => onShapePointerDown(e, id)}
//       className={styles.imageContainer}
//       style={{
//         transform: `translate(${x}px, ${y}px)`,
//         transition: !selectedByMe ? "transform 120ms linear" : "none",
//         borderStyle: "none",
//       }}>
//       <img src={fill || "defaultImage.png"} alt="shape" />
//     </div>
//   );
// };

// export default Sticker;

import { StickerLayer } from "@/lib/types";
import { colorToCss } from "@/lib/utils";

type Props = {
  id: string;
  layer: StickerLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export default function Note({ layer, onPointerDown, id, selectionColor }: Props) {
  const { x, y, width, height } = layer;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
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
