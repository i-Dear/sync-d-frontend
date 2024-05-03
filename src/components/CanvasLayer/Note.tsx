import { NoteLayer } from "@/lib/types";
import { cn, colorToCss } from "@/lib/utils";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useMutation } from "~/liveblocks.config";
import { TextLayer } from "@/lib/types";

type NoteProps = {
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
}: NoteProps) {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      style={{ background: fill ? colorToCss(fill) : "#fff" }}
      onPointerDown={(e) => onPointerDown(e, id)}
    >
      <ContentEditable
        html={value || " "}
        onChange={handleContentChange}
        className="flex h-full w-full justify-normal text-center outline-none "
        style={{
          fontSize: 18,
          color: "black",
        }}
      />
    </foreignObject>
  );
}
