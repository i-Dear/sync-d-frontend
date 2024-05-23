import { useMutation } from "~/liveblocks.config";
import { VoteLayer } from "@/lib/types";
import { useState } from "react";
import ContentEditable from "react-contenteditable";
import { cn } from "@/lib/utils";

type VoteProps = {
  id: string;
  layer: VoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export default function Persona({ layer, onPointerDown, id }: VoteProps) {
  const { x, y, width, height, value } = layer;
  const [isFocused, setFocused] = useState(false);

  const updateValue = useMutation(({ storage }, value) => {
    const liveLayers = storage.get("layers");
    const prevContent = liveLayers.get(id)?.get("value");
    liveLayers.get(id)?.set("value", value);
  }, []);
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
      width={width ? width : 300}
      height={height ? height : 250}
      style={{ background: "#E9F5FF" }}
      className={cn("h-[250] flex-col rounded-lg p-[2rem]", {
        "border border-2 border-primary": isFocused,
      })}
      onPointerDown={(e) => onPointerDown(e, id)}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <ContentEditable
        html={value || ""}
        onChange={(e) => {
          updateValue(e.target.value);
        }}
        className={`font-Manrope flex h-[30px] w-full items-center justify-normal text-3xl font-black text-primary-400 outline-none`}
      />
    </foreignObject>
  );
}
