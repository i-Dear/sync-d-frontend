import { PersonaBoxTemplate, PersonaContent } from "@/lib/types";
import { useMutation } from "~/liveblocks.config";
import { UserStory, LayerType } from "@/lib/types";
import { useStorage } from "~/liveblocks.config";
import PlusMarkIcon from "~/public/PlusMark";
import XMarkIcon from "~/public/Xmark";
import { useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { EpicLayer } from "@/lib/types";

type EpicProps = {
  id: string;
  layer: EpicLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};

export default function Epic({
  layer,
  onPointerDown,
  id,
  selectionColor,
}: EpicProps) {
  const { x, y, width, length, height, title, value } = layer;

  const handleChangeTitle = (key: string, value: string) => {
    if (key === "title") {
      updateTitle(value);
    }
    const newValue = value;
    updateTitle(newValue);
  };

  const updateTitle = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("title", newValue);
    const data = liveLayers.get(id)?.get("value");
    console.log(data);
  }, []);

  const [isPlaceholderVisible, setPlaceholderVisible] = useState(!value);

  const handleChangeValue = (index: number, value: string) => {
    updateValue(index, value);
  };

  const updateValue = useMutation(
    ({ storage }, index: number, newValue: string) => {
      const liveLayers = storage.get("layers");
      const prevStory = liveLayers.get(id)?.get("value") as UserStory[];
      const newStory = prevStory?.map((item, i) =>
        i === index ? { ...item, name: newValue } : item,
      );
      liveLayers.get(id)?.set("value", newStory);
    },
    [],
  );

  const handleAdd = useMutation(({ storage }) => {
    const liveLayers = storage.get("layers");
    const prevStory = liveLayers.get(id)?.get("value") as UserStory[];
    prevStory.push({ id: prevStory.length, name: "" });
    const newStory = prevStory;
    liveLayers.get(id)?.set("value", newStory);
    const newHeight = newStory.length * 70 + 160;
    liveLayers.get(id)?.set("height", newHeight);
  }, []);

  const handleDeleteValue = (index: number) => {
    updateDelete(index);
  };

  const updateDelete = useMutation(({ storage }, index: number) => {
    const liveLayers = storage.get("layers");
    const prevStory = liveLayers.get(id)?.get("value") as UserStory[];
    const newStory = prevStory.filter((_, i) => i !== index);
    liveLayers.get(id)?.set("value", newStory);
    const newHeight = newStory.length * 70 + 160;
    liveLayers.get(id)?.set("height", newHeight);
  }, []);

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height === 0 ? length * 70 + 160 : height}
      style={{ background: "#E9F5FF" }}
      onPointerDown={(e) => onPointerDown(e, id)}
      className=" shadow-grey-950  rounded-lg p-[2rem] shadow-lg drop-shadow-lg"
    >
      <ContentEditable
        html={title || " "}
        onChange={(e) => {
          handleChangeTitle("title", e.target.value);
        }}
        className=" flex h-[5rem] w-full items-center justify-center rounded-lg bg-primary-400 p-[1rem] text-3xl font-medium outline-none "
        style={{
          fontSize: 16,
          color: "white",
        }}
      />
      <div className="my-[2rem] flex flex-col gap-[2rem]">
        {value &&
          value.map((item, index) => (
            <div className="relative" key={item.id}>
              <ContentEditable
                html={item.name || " "}
                onChange={(e) => handleChangeValue(index, e.target.value)}
                className="flex h-[5rem] w-full items-center justify-center rounded-lg bg-primary-200 p-[1rem] text-3xl font-medium outline-none "
                style={{
                  fontSize: 14,
                  color: "black",
                }}
              />
              <div
                className="absolute right-[-2.2rem] top-[1.5rem] cursor-pointer rounded-full p-1"
                onClick={() => handleDeleteValue(index)}
              >
                <XMarkIcon fill="grey" width={15} height={15} />
              </div>
            </div>
          ))}
      </div>
      <div
        onClick={handleAdd}
        className="flex h-[5rem] w-full items-center justify-center rounded-lg bg-primary-200 p-[1rem] text-3xl font-medium outline-none"
      >
        <PlusMarkIcon fill="black" />
      </div>
    </foreignObject>
  );
}
