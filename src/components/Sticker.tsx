import { StickerLayer } from "@/lib/types";
import { colorToCss } from "@/lib/utils";
import Image from "next/image";
import stickerData from "@/lib/sticker.json";

type Props = {
  id: string;
  layer: StickerLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export default function Sticker({ layer, onPointerDown, id, selectionColor }: Props) {
  const { x, y, width, height, fill, stickerSrc } = layer;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        strokeWidth={1}
        fill={"none"}
        stroke={selectionColor || "transparent"}
        pointerEvents="none" // Prevent the rectangle from intercepting pointer events
      />
      <foreignObject x={x} y={y} width={width} height={height}>
        <Image width={x} height={y} alt="" src={stickerSrc ? stickerSrc : stickerData[0].src} onPointerDown={(e) => onPointerDown(e, id)} />
      </foreignObject>
    </g>
  );
}
