import { NoteLayer } from "@/lib/types";
import { cn, colorToCss } from "@/lib/utils";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useMutation } from "~/liveblocks.config";
import { TextLayer } from "@/lib/types";

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
  const { x, y, width, height, fill, value } = layer;

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
    >
      <ContentEditable
        html={"Note"}
        onChange={() => {}}
        className="flex h-full w-full items-center justify-center text-center outline-none drop-shadow-md"
        style={{
          fontSize: 24,
          color: fill ? colorToCss(fill) : "black",
        }}
      />
    </foreignObject>
  );
}
