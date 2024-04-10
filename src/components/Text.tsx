import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { TextLayer } from "@/lib/types";
import { cn, colorToCss } from "@/lib/utils";
import { useMutation } from "~/liveblocks.config";

interface TextProps {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.5;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

const Text = ({ layer, onPointerDown, id, selectionColor }: TextProps) => {
  const { x, y, width, height, fill, value } = layer;

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}
    >
      <ContentEditable
        html={"Text"}
        onChange={() => {}}
        className="h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none"
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? colorToCss(fill) : "black",
        }}
      />
    </foreignObject>
  );
};

export default Text;
