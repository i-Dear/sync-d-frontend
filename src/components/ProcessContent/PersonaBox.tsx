import { PersonaBoxTemplate, PersonaContent } from "@/lib/types";
import { useMutation } from "~/liveblocks.config";
import { TemplateType } from "@/lib/types";
import { useStorage } from "~/liveblocks.config";
import PlusMarkIcon from "~/public/plus-mark.svg";
import { useState } from "react";
import Image from "next/image";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { set } from "react-hook-form";

export default function PersonaBox(props: PersonaBoxTemplate) {
  const { id, title, x, y, width, height, value } = props;
  const [content, setContent] = useState<PersonaContent[]>([
    { title: "info", value: typeof value === "string" ? "" : value[0].value },
    {
      title: "personality",
      value: typeof value === "string" ? "" : value[1].value,
    },
    { title: "detail", value: typeof value === "string" ? "" : value[2].value },
  ]); // ContentEditable의 내용을 관리하는 상태
  const templates = useStorage((root) => root.templates);
  const see = templates.filter((v) => v.type === TemplateType.PersonaBox);
  console.log("see", see);
  const handleAdd = useMutation(
    ({ storage }) => {
      const templates = storage.get("templates");
      const PersonaList = templates.filter(
        (v) => v.type === TemplateType.PersonaBox,
      );
      const PersonaLength = PersonaList.length;

      if (PersonaLength >= 6) return;

      const lastPersona = PersonaList[PersonaLength - 1] as PersonaBoxTemplate;

      templates.push({
        id: `${parseInt(lastPersona.id) + 1}`,
        type: TemplateType.PersonaBox,
        title: "Persona",
        x: PersonaLength === 3 ? 100 : lastPersona.x + 400,
        y: PersonaLength >= 3 ? 3500 : 3150,
        width: width,
        height: height,
        value: "",
      });
    },
    [templates],
  );

  const handleChangeInfo = (value: string) => {
    setContent((prev) => {
      return prev.map((item) => {
        if (item.title === "info") {
          return { ...item, value };
        }
        return item;
      });
    });
    updateValue(content);
  };
  const handleChangePersonality = (value: string) => {
    setContent((prev) => {
      return prev.map((item) => {
        if (item.title === "personality") {
          return { ...item, value };
        }
        return item;
      });
    });
    updateValue(content);
  };
  const handleChangeDetail = (value: string) => {
    setContent((prev) => {
      return prev.map((item) => {
        if (item.title === "detail") {
          return { ...item, value };
        }
        return item;
      });
    });
    updateValue(content);
  };

  const updateValue = useMutation(({ storage }, content: PersonaContent[]) => {
    const liveTemplates = storage.get("templates");
    const targetFormIdx = liveTemplates.findIndex(
      (template) => template.id === id,
    );

    liveTemplates.set(targetFormIdx, {
      ...props,
      value: content,
    });
  }, []);

  return (
    <g>
      <rect
        width={width ? width : 800}
        x={x}
        y={y}
        rx={10} // 가로 방향의 모서리 반경
        ry={10} // 세로 방향의 모서리 반경
        height={height ? height : 200}
        fill={value === "add" ? "#FFF" : "#E9F5FF"}
        stroke={value === "add" ? "#D4EAFB" : ""}
        strokeWidth="4"
        onClick={() => (value === "add" ? handleAdd() : "")}
      />
      {value === "add" ? (
        <g>
          <foreignObject x={x + 100} y={y + 75} width={100} height={100}>
            <PlusMarkIcon fill="#D4EAFB " />
          </foreignObject>
        </g>
      ) : (
        <foreignObject
          x={x}
          y={y}
          width={width ? width : 300}
          height={height ? height : 250}
          className="h-[250] flex-col  p-[2rem]"
        >
          <ContentEditable
            html={
              typeof value === "string" ? "이름/나이/성별" : content[0].value
            }
            onChange={(e) => {
              handleChangeInfo(e.target.value);
            }}
            className={`font-Manrope flex h-[30px] w-full items-center justify-normal text-3xl font-black  text-primary-400 outline-none`}
          />
          <ContentEditable
            html={typeof value === "string" ? "특징" : content[1].value}
            onChange={(e) => handleChangePersonality(e.target.value)}
            // onKeyDown={handleKeyDown}
            className={`font-Manrope mb-[2rem] h-[50px] w-full items-start justify-normal rounded-lg bg-primary-300  p-[2px] text-2xl font-medium text-black outline-none`}
          />
          <ContentEditable
            html={typeof value === "string" ? "설명" : content[2].value}
            className={`font-Manrope h-[116px] max-h-[116px] w-full justify-normal rounded-lg bg-primary-300  p-[3px] text-2xl text-black outline-none`}
            onChange={(e) => {
              handleChangeDetail(e.target.value);
            }}
          />
        </foreignObject>
      )}
    </g>
  );
}
