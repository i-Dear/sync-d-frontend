import { InputFormBoxTemplate } from "@/lib/types";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useMutation } from "~/liveblocks.config";
import React, { useState } from "react";
import DoubleQuoteOpenIcon from "~/public/DoubleQuoteOpen";
import DoubleQuoteCloseIcon from "~/public/DoubleQouteClose";
export default function InputFormBox(props: InputFormBoxTemplate) {
  const { id, title, x, y, width, height, font, value } = props;

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

  const handleContentChange = (e: ContentEditableEvent) => {
    const newValue = e.target.value;
    updateValue(newValue);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width ? width : 800}
      height={height ? height : 200}
      style={{ borderBottom: "4px solid black", display: "flex" }}
    >
      <div className="flex">
        <DoubleQuoteOpenIcon fill="black" width={20} height={20} />
        <ContentEditable
          html={value ? value : ""}
          onChange={handleContentChange}
          className={`flex h-full w-full justify-normal p-[1rem] outline-none ${font ? font : "text-base"} font-Manrope text-black`}
        />
        <DoubleQuoteCloseIcon fill="black" width={20} height={20} />
      </div>
    </foreignObject>
  );
}
