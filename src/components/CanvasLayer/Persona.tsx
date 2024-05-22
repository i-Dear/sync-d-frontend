import { useMutation } from "~/liveblocks.config";
import { PersonaLayer, PersonaContent } from "@/lib/types";
import ContentEditable from "react-contenteditable";
type PersonaProps = {
  id: string;
  layer: PersonaLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export default function Persona({ layer, onPointerDown, id }: PersonaProps) {
  const { x, y, width, height, title, value } = layer;

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

  return (
    <foreignObject
      x={x}
      y={y}
      width={width ? width : 300}
      height={height ? height : 250}
      style={{ background: "#E9F5FF" }}
      className="h-[250] flex-col rounded-lg p-[2rem]"
      onPointerDown={(e) => onPointerDown(e, id)}
    >
      <ContentEditable
        html={value[0].value || ""}
        onChange={(e) => {
          handleChangeValue("info", e.target.value);
        }}
        className={`font-Manrope flex h-[30px] w-full items-center justify-normal text-3xl font-black text-primary-400 outline-none`}
      />
      <ContentEditable
        html={value[1].value}
        onChange={(e) => handleChangeValue("personality", e.target.value)}
        className={`font-Manrope mb-[2rem] h-[50px] w-full items-start justify-normal rounded-lg bg-primary-300  p-[2px] text-2xl font-medium text-black outline-none`}
      />
      <ContentEditable
        html={value[2].value}
        className={`font-Manrope h-[116px] max-h-[116px] w-full justify-normal rounded-lg bg-primary-300  p-[3px] text-2xl text-black outline-none`}
        onChange={(e) => {
          handleChangeValue("detail", e.target.value);
        }}
      />
    </foreignObject>
  );
}
