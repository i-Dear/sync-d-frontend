import { NoteLayer } from "@/lib/types";
import { cn, colorToCss } from "@/lib/utils";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useMutation } from "~/liveblocks.config";
import { TextLayer } from "@/lib/types";
import React, { useState } from "react";

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

  const [isPlaceholderVisible, setPlaceholderVisible] = useState(!value);

  const handleContentChange = (e: ContentEditableEvent) => {
    // updateValue(e.target.value);
    const newValue = e.target.value;
    updateValue(newValue);
    setPlaceholderVisible(newValue === "");
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
      height={height}
      style={{ background: fill ? colorToCss(fill) : "#fff" }}
      onPointerDown={(e) => onPointerDown(e, id)}
      className="shadow-grey-950 shadow-lg drop-shadow-lg"
    >
      <ContentEditable
        html={
          isPlaceholderVisible
            ? "<span class='placeholder' style='color: #999'>input text</span>"
            : value || ""
        }
        onChange={handleContentChange}
        onFocus={handleFocus}
        className="flex h-full w-full justify-normal p-[1rem] text-center outline-none "
        style={{
          fontSize: 8,
          color: "black",
          fontFamily: "Manrope, sans-serif",
        }}
      />
    </foreignObject>
  );
}
