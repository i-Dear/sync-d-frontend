import React, { memo } from "react";
import { Template, TemplateType } from "@/lib/types";
import NoteBox from "../ProcessContent/NoteBox";
import GuideTextBox from "../ProcessContent/GuideTextBox";

const TemplateComponent = memo(({ template }: { template: Template }) => {
  if (!template) {
    return null;
  }

  console.log("TemplateComponent", template);

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
        />
      );

    default:
      console.warn("Unknown template type");
      return null;
  }
});

TemplateComponent.displayName = "TemplateComponent";

export default TemplateComponent;
