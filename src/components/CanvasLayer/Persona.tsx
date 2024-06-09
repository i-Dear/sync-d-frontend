import { useMutation } from "~/liveblocks.config";
import { PersonaLayer, PersonaContent } from "@/lib/types";
import { useState } from "react";
import ContentEditable from "react-contenteditable";
import { cn } from "@/lib/utils";
type PersonaProps = {
  id: string;
  layer: PersonaLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export default function Persona({ layer, onPointerDown, id }: PersonaProps) {
  const { x, y, width, height, title, value } = layer;
  const [isFocused, setFocused] = useState(false);
  const handleChangeValue = (key: string, value: string) => {
    updateValue(key, value);
  };

  const updateValue = useMutation(
    ({ storage }, key, newValue) => {
      const liveLayers = storage.get("layers");
      const prevContent = liveLayers.get(id)?.get("value") as PersonaContent[];
      const newContent = prevContent.map((item) =>
        item.title === key ? { ...item, value: newValue } : item,
      );
      liveLayers.get(id)?.set("value", newContent);
    },
    [value],
  );
  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };
  return (
    <foreignObject
      x={x}
      y={y}
      width={width ? width : 250}
      height={height ? height : 250}
      style={{ background: "#E9F5FF" }}
      className={cn("h-[250] flex-col rounded-[1.2rem] p-[2rem]", {
        "border-2 border-primary": isFocused,
      })}
      onPointerDown={(e) => onPointerDown(e, id)}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <ContentEditable
        html={value[0].value || ""}
        onChange={(e) => {
          handleChangeValue("info", e.target.value);
        }}
        className={` mb-[1rem] flex w-full items-center justify-start text-3xl font-bold text-primary-400 outline-none`}
      />
      <ContentEditable
        html={value[1].value}
        onChange={(e) => handleChangeValue("personality", e.target.value)}
        className={` mb-[2rem] h-[50px] w-full items-start justify-normal rounded-[0.8rem] bg-primary-300  p-[1rem] text-2xl font-normal text-black outline-none`}
      />
      <ContentEditable
        html={value[2].value}
        className={` h-[116px] max-h-[116px] w-full justify-normal rounded-[0.8rem] bg-primary-300 p-[1rem]  text-2xl font-normal text-black outline-none`}
        onChange={(e) => {
          handleChangeValue("detail", e.target.value);
        }}
      />
    </foreignObject>
  );
}
