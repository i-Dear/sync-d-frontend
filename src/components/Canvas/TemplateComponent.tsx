import React, { memo } from "react";
import { Template, TemplateType } from "@/lib/types";
import NoteBox from "../ProcessContent/NoteBox";
import GuideTextBox from "../ProcessContent/GuideTextBox";
import InputFormBox from "../ProcessContent/InputFormBox";
const TemplateComponent = memo(({ template }: { template: Template }) => {
  if (!template) {
    return null;
  }

  switch (template.type) {
    case TemplateType.NoteBox:
      return (
        <NoteBox
          id={template.id}
          type={template.type}
          x={template.x}
          y={template.y}
          width={template.width}
          height={template.height}
          title={template.title}
          fill={template.fill}
        />
      );
    case TemplateType.GuideTextBox:
      return (
        <GuideTextBox
          id={template.id}
          type={template.type}
          x={template.x}
          y={template.y}
          width={template.width}
          height={template.height}
          title={template.title}
          fill={template.fill}
          font={template.font}
          fontWeight={template.fontWeight}
        />
      );
    case TemplateType.InputFormBox:
      return (
        <InputFormBox
          id={template.id}
          type={template.type}
          x={template.x}
          y={template.y}
          width={template.width}
          height={template.height}
          title={template.title}
          font={template.font}
          fontWeight={template.fontWeight}
          value={template.value}
        />
      );

    default:
      console.warn("Unknown template type");
      return null;
  }
});

TemplateComponent.displayName = "TemplateComponent";

export default TemplateComponent;
