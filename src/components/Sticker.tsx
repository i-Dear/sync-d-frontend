import { StickerLayer } from "@/lib/types";
import { colorToCss } from "@/lib/utils";
import Image from "next/image";
import stickerData from "@/lib/sticker.json";

type Props = {
  id: string;
  layer: StickerLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
};

export default function Sticker({
  layer,
  onPointerDown,
  id,
}: Props) {
  const { x, y, width, height, stickerSrc } = layer;

  return (
    <g>
      <foreignObject x={x} y={y} width={width} height={height}>
        <Image
          width={x}
          height={y}
          alt=""
          src={stickerSrc ? stickerSrc : stickerData[0].src}
          onPointerDown={e => onPointerDown(e, id)}
        />
      </foreignObject>
    </g>
  );
}
