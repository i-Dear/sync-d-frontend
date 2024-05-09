import { InputFormBoxTemplate } from "@/lib/types";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useMutation } from "~/liveblocks.config";
import React, { useState } from "react";

export default function InputFormBox(props: InputFormBoxTemplate) {
  const { id, x, y, width, height, font, value } = props;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveTemplates = storage.get("templates");
    const targetFormIdx = liveTemplates.findIndex(
      (template) => template.id === id,
    );
    liveTemplates.set(targetFormIdx, {
      ...props,
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
      width={width ? width : 800}
      height={height ? height : 200}
      style={{ borderBottom: "4px solid black" }}
    >
      <ContentEditable
        html={
          isPlaceholderVisible
            ? "<span class='placeholder' style='color: #999'>우리 팀의 목표는</span>"
            : value || ""
        }
        onChange={handleContentChange}
        onFocus={handleFocus}
        className="flex h-full w-full justify-normal p-[1rem] outline-none "
        style={{
          fontSize: font ? font : 12,
          color: "black",
          fontFamily: "Manrope, sans-serif",
        }}
      />
    </foreignObject>
  );
}
