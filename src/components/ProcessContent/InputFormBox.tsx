import { InputFormBoxTemplate } from "@/lib/types";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useMutation } from "~/liveblocks.config";
import React, { useState } from "react";
import { TemplateType } from "@/lib/types";

export default function InputFormBox(props: InputFormBoxTemplate) {
  const { id, title, x, y, width, height, fontWeight, font, value } = props;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveTemplates = storage.get("templates");
    const targetFormIdx = liveTemplates.findIndex(
      (template) => template.id === id,
    );
    liveTemplates.set(targetFormIdx, {
      id: id,
      type: TemplateType.InputFormBox,
      title: title,
      x: x,
      y: y,
      width: width,
      height: height,
      font: font,
      fontWeight: fontWeight,
      value: newValue,
    });
  }, []);

  const [isPlaceholderVisible, setPlaceholderVisible] = useState(!value);

  const handleContentChange = (e: ContentEditableEvent) => {
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
      height={height}
      style={{ border: "4px solid black" }}
      className="shadow-grey-950 shadow-lg drop-shadow-lg"
    >
      <ContentEditable
        html={
          isPlaceholderVisible
            ? "<span class='placeholder' style='color: #999'>type your own text</span>"
            : value || ""
        }
        onChange={handleContentChange}
        onFocus={handleFocus}
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
