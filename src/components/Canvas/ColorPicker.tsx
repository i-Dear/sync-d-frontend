import { Color } from "@/lib/types";
import { colorToCss } from "@/lib/utils";

type Props = {
  onChange: (color: Color) => void;
};

export default function ColorPicker({ onChange }: Props) {
  return (
    <div className="mr-2 flex max-w-[121px] flex-wrap items-center border-r border-divider pr-2">
      <ColorButton color={{ r: 229, g: 115, b: 115 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 183, b: 77 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 241, b: 118 }} onClick={onChange} />
      <ColorButton color={{ r: 129, g: 199, b: 132 }} onClick={onChange} />
      <ColorButton color={{ r: 228, g: 245, b: 255 }} onClick={onChange} />
      <ColorButton color={{ r: 69, g: 106, b: 161 }} onClick={onChange} />
      <ColorButton color={{ r: 186, g: 104, b: 200 }} onClick={onChange} />
      <ColorButton color={{ r: 244, g: 143, b: 177 }} onClick={onChange} />
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
