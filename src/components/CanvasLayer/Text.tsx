import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { TextLayer } from "@/lib/types";

import { useMutation } from "~/liveblocks.config";
import { colorToCss } from "@/lib/utils";

interface TextProps {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const Text = ({ layer, onPointerDown, id, selectionColor }: TextProps) => {
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
      onPointerDown={(e) => onPointerDown(e, id)}
    >
      <ContentEditable
        html={value || " "}
        onChange={handleContentChange}
        className="h-full w-full outline-none drop-shadow-md"
        style={{
          fontSize: 14,
          color: colorToCss(fill) || "black",
        }}
      />
    </foreignObject>
  );
};

export default Text;
