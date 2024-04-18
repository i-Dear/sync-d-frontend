import { Color } from "@/lib/types";
import { colorToCss } from "@/lib/utils";

type Props = {
  onChange: (color: Color) => void;
};

export default function ColorPicker({ onChange }: Props) {
  return (
    <div className="mr-2 flex max-w-[121px] flex-wrap items-center border-r border-divider pr-2">
      <ColorButton color={{ r: 243, g: 82, b: 35 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 198, b: 38 }} onClick={onChange} />
      <ColorButton color={{ r: 68, g: 202, b: 99 }} onClick={onChange} />
      <ColorButton color={{ r: 39, g: 142, b: 237 }} onClick={onChange} />
      <ColorButton color={{ r: 155, g: 105, b: 245 }} onClick={onChange} />
      <ColorButton color={{ r: 252, g: 142, b: 42 }} onClick={onChange} />
      <ColorButton color={{ r: 82, g: 82, b: 82 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 255, b: 255 }} onClick={onChange} />
    </div>
  );
}

function ColorButton({
  onClick,
  color,
}: {
  onClick: (color: Color) => void;
  color: Color;
}) {
  return (
    <button
      className="flex h-7 w-7 items-center justify-center"
      onClick={() => onClick(color)}
    >
      <div
        className="h-5 w-5 rounded-2xl border border-black border-opacity-10"
        style={{ background: colorToCss(color) }}
      />
    </button>
  );
}
