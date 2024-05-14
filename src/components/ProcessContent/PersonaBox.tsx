import { PersonaBoxTemplate, PersonaContent } from "@/lib/types";
import { useMutation } from "~/liveblocks.config";
import { TemplateType } from "@/lib/types";
import { useStorage } from "~/liveblocks.config";
import PlusMarkIcon from "~/public/plus-mark.svg";
import { useState } from "react";
import ContentEditable from "react-contenteditable";

export default function PersonaBox(props: PersonaBoxTemplate) {
  const { id, x, y, width, height, value } = props;
  //personaBox는 value가 add면 추가버튼 역할을 하고 그 외에는 value가 PersonaContent[] 형태로 들어온다
  const [personaContent, setContent] = useState<PersonaContent[]>([
    { title: "info", value: typeof value === "string" ? "" : value[0].value },
    {
      title: "personality",
      value: typeof value === "string" ? "" : value[1].value,
    },
    { title: "detail", value: typeof value === "string" ? "" : value[2].value },
  ]);
  const [isFocused, setIsFocused] = useState(false); // 포커스 상태 추가
  //personaTemplate 추가 로직
  const templates = useStorage((root) => root.templates);
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

  //personaContent 변경 로직
  const handleChange = (key: string, newValue: string) => {
    setContent((prev) => {
      return prev.map((personaContent) => {
        if (personaContent.title === key) {
          return { ...personaContent, value: newValue };
        }
        return personaContent;
      });
    });
    updateValue(personaContent);
  };

  //liveStore변경 로직
  const updateValue = useMutation(
    ({ storage }, personaContent: PersonaContent[]) => {
      const liveTemplates = storage.get("templates");
      const targetFormIdx = liveTemplates.findIndex(
        (template) => template.id === id,
      );

      liveTemplates.set(targetFormIdx, {
        ...props,
        value: personaContent,
      });
    },
    [],
  );

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <g>
      <rect
        width={width ? width : 800}
        x={x}
        y={y}
        rx={10}
        ry={10}
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
              //초기값 세팅 이후엔 state내의 value로 세팅
              isFocused
                ? personaContent[0].value
                : typeof value === "string"
                  ? "이름/나이/성별"
                  : value[0].value
            }
            onChange={(e) => {
              handleChange("info", e.target.value);
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`font-Manrope flex h-[30px] w-full items-center justify-normal text-3xl font-black  text-primary-400 outline-none`}
          />
          <ContentEditable
            //포커스 상태 따라 value를 스토어에서 가져올지, state에서 가져올지 결정
            html={
              isFocused
                ? personaContent[1].value
                : typeof value === "string"
                  ? "이름/나이/성별"
                  : value[1].value
            }
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => handleChange("personality", e.target.value)}
            className={`font-Manrope mb-[2rem] h-[50px] w-full items-start justify-normal rounded-lg bg-primary-300  p-[2px] text-2xl font-medium text-black outline-none`}
          />
          <ContentEditable
            html={
              isFocused
                ? personaContent[2].value
                : typeof value === "string"
                  ? "이름/나이/성별"
                  : value[2].value
            }
            className={`font-Manrope h-[116px] max-h-[116px] w-full justify-normal rounded-lg bg-primary-300  p-[3px] text-2xl text-black outline-none`}
            onChange={(e) => {
              handleChange("detail", e.target.value);
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </foreignObject>
      )}
    </g>
  );
}
