import { PersonaBoxTemplate, PersonaContent } from "@/lib/types";
import { useMutation } from "~/liveblocks.config";
import { LayerType } from "@/lib/types";
import { useStorage } from "~/liveblocks.config";
import PlusMarkIcon from "~/public/plus-mark.svg";
import { useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { EpicLayer } from "@/lib/types";

type EpicLayerProps = {
  id: string;
  layer: EpicLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export default function Epic({
  layer,
  onPointerDown,
  id,
  selectionColor,
}: EpicLayerProps) {
  const { x, y, width, length, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const [isPlaceholderVisible, setPlaceholderVisible] = useState(!value);

  const handleContentChange = (e: ContentEditableEvent) => {
    // updateValue(e.target.value);
    const newValue = e.target.value;
    updateValue(newValue);
  };

  const handleFocus = () => {
    if (isPlaceholderVisible) {
      setPlaceholderVisible(false);
    }
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={length * 100}
      style={{ background: "#369EFF" }}
      onPointerDown={(e) => onPointerDown(e, id)}
      className="shadow-grey-950 shadow-lg drop-shadow-lg"
    >
      <ContentEditable
        html={value || " "}
        onChange={handleContentChange}
        className="flex h-full w-full justify-normal p-[1rem] outline-none "
        style={{
          fontSize: 12,
          color: "black",
          fontFamily: "Manrope, sans-serif",
        }}
      />
    </foreignObject>
  );
}
