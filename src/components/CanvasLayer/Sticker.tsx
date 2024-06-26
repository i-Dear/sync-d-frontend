import { StickerLayer } from "@/lib/types";
import Image from "next/image";
import stickerData from "@/lib/sticker.json";

type Props = {
  id: string;
  layer: StickerLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export default function Sticker({
  layer,
  onPointerDown,
  id,
  selectionColor,
}: Props) {
  const { x, y, width, height, stickerSrc } = layer;

  return (
    <g>
      <foreignObject
        x={x}
        y={y}
        stroke={selectionColor || "transparent"}
        strokeWidth={1}
        width={width}
        height={height}
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
        }}
      >
        <Image
          draggable={false}
          width={width}
          height={height}
          alt=""
          src={stickerSrc ? stickerSrc : stickerData[0].src}
          onPointerDown={(e) => onPointerDown(e, id)}
        />
      </foreignObject>
    </g>
  );
}
