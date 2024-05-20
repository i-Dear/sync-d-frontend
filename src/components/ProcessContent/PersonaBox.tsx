import { PersonaBoxTemplate, PersonaContent } from "@/lib/types";
import { useMutation } from "~/liveblocks.config";
import { TemplateType } from "@/lib/types";
import { useStorage } from "~/liveblocks.config";
import PlusMarkIcon from "~/public/PlusMark";
import { useState } from "react";
import ContentEditable from "react-contenteditable";

export default function PersonaBox(props: PersonaBoxTemplate) {
  const { id, x, y, width, height, value } = props;

  const [isHovered, setIsHovered] = useState(false);

  // PersonaTemplate 추가 로직
  const templates = useStorage((root) => root.templates);

  const handleAdd = useMutation(
    ({ storage }) => {
      const templates = storage.get("templates");
      const PersonaList = templates.filter(
        (v) => v.type === TemplateType.PersonaBox,
      );
      const PersonaLength = PersonaList.length;

      if (PersonaLength >= 6 || id !== "401") return;

      const lastPersona = PersonaList[PersonaLength - 1] as PersonaBoxTemplate;

      templates.push({
        id: `${parseInt(lastPersona.id) + 1}`,
        type: TemplateType.PersonaBox,
        title: "Persona",
        x: PersonaLength === 3 ? 100 : lastPersona.x + 400,
        y: PersonaLength >= 3 ? 3500 : 3150,
        width: width,
        height: height,
        value: [
          {
            title: "info",
            value: "인적사항: ",
          },
          {
            title: "personality",
            value: "특징: ",
          },
          {
            title: "detail",
            value: "상세: ",
          },
        ],
      });
    },
    [templates],
  );

  const handleChange = (key: string, newValue: string) => {
    updateValue(key, newValue);
  };

  const updateValue = useMutation(
    ({ storage }, key, newValue) => {
      const liveTemplates = storage.get("templates");
      const targetFormIdx = liveTemplates.findIndex(
        (template) => template.id === id,
      );
      const updatedValue = value.map((item) =>
        item.title === key ? { ...item, value: newValue } : item,
      );

      liveTemplates.set(targetFormIdx, {
        ...props,
        value: updatedValue,
      });
    },
    [value],
  );
  return (
    <g>
      <rect
        width={width ? width : 800}
        x={x}
        y={y}
        rx={10}
        ry={10}
        height={height ? height : 200}
        fill={id === "401" ? (isHovered ? "#369EFF" : "#FFF") : "#E9F5FF"}
        stroke={id === "401" ? "#D4EAFB" : ""}
        strokeWidth="4"
        onClick={() => (id === "401" ? handleAdd() : "")}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        className="cursor-pointer"
      />
      {id === "401" ? (
        <foreignObject
          x={x + 100}
          y={y + 75}
          width={100}
          height={100}
          onClick={handleAdd}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="cursor-pointer"
        >
          <PlusMarkIcon fill="#D4EAFB" width={100} height={100} />
        </foreignObject>
      ) : (
        <foreignObject
          x={x}
          y={y}
          width={width ? width : 300}
          height={height ? height : 250}
          className="h-[250] flex-col  p-[2rem]"
        >
          <ContentEditable
            html={value[0].value}
            onChange={(e) => {
              handleChange("info", e.target.value);
            }}
            className={`font-Manrope flex h-[30px] w-full items-center justify-normal text-3xl font-black  text-primary-400 outline-none`}
          />
          <ContentEditable
            html={value[1].value}
            onChange={(e) => handleChange("personality", e.target.value)}
            className={`font-Manrope mb-[2rem] h-[50px] w-full items-start justify-normal rounded-lg bg-primary-300  p-[2px] text-2xl font-medium text-black outline-none`}
          />
          <ContentEditable
            html={value[2].value}
            className={`font-Manrope h-[116px] max-h-[116px] w-full justify-normal rounded-lg bg-primary-300  p-[3px] text-2xl text-black outline-none`}
            onChange={(e) => {
              handleChange("detail", e.target.value);
            }}
          />
        </foreignObject>
      )}
    </g>
  );
}
