import React, { useMemo } from "react";
import Image from "next/image";
import { getContrastingColor } from "../utils/getContrastingColor";
import { cn } from "@/lib/utils";

type BothProps = {
  variant?: "avatar" | "more";
  size?: number;
  outlineColor?: string;
  outlineWidth?: number;
  borderRadius?: number;
  className?: string;
  style?: Record<string, string>;
};

type PictureProps = BothProps & {
  variant?: "avatar";
  name?: string;
  src?: string;
  color: [string, string];
  statusColor?: string;
  count?: never;
};

type MoreProps = BothProps & {
  variant: "more";
  count: number;
  src?: never;
  name?: never;
  statusColor?: never;
  color?: never;
};

type AvatarProps = PictureProps | MoreProps;

export function Avatar({
  variant = "avatar",
  src = "",
  name = "",
  color = ["", ""],
  size = 40,
  statusColor = "",
  outlineColor = "",
  outlineWidth = 2,
  borderRadius = 9999,
  className = "",
  style = {},
  count = 0,
}: AvatarProps) {
  const innerVariant = variant === "avatar" && !src ? "letter" : variant;
  const realSize = size - outlineWidth * 2;

  return (
    <div
      style={{
        height: realSize,
        width: realSize,
        boxShadow: `${outlineColor} 0 0 0 ${outlineWidth}px`,
        margin: outlineWidth,
        borderRadius,
        ...style,
      }}
      className={cn(
        "relative flex place-content-center shadow-avatar",
        className,
      )}
      data-tooltip={name}
      onClick={() => console.log("Clicked avatar", name)}
    >
      {innerVariant === "more" ? (
        <MoreCircle count={count} borderRadius={borderRadius} />
      ) : null}

      {innerVariant === "avatar" ? (
        <PictureCircle
          name={name}
          src={src}
          size={realSize}
          borderRadius={borderRadius}
        />
      ) : null}

      {innerVariant === "letter" ? (
        <LetterCircle name={name} color={color} borderRadius={borderRadius} />
      ) : null}

      {statusColor ? (
        <span
          style={{ backgroundColor: statusColor }}
          className="absolute bottom-0 right-0 block h-3 w-3 rounded-full shadow-avatar"
        />
      ) : null}
    </div>
  );
}

function LetterCircle({
  name,
  color,
  borderRadius,
}: Pick<PictureProps, "name" | "color" | "borderRadius">) {
  const textColor = useMemo(
    () => (color ? getContrastingColor(color[1]) : undefined),
    [color],
  );
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${color[0]}, ${color[1]})`,
        borderRadius,
      }}
      className="absolute inset-0 isolate flex items-center justify-center overflow-hidden rounded-full"
    >
      <div
        className="z-10 text-sm font-semibold text-white"
        style={{ color: textColor }}
      >
        {name ? name.charAt(0) : null}
      </div>
    </div>
  );
}

function PictureCircle({
  name,
  src = "",
  size,
  borderRadius,
}: Pick<PictureProps, "name" | "src" | "size" | "borderRadius">) {
  return (
    <Image
      alt={name ?? ""}
      src={src}
      height={size}
      width={size}
      style={{ borderRadius }}
    />
  );
}

function MoreCircle({
  count,
  borderRadius,
}: Pick<MoreProps, "count" | "borderRadius">) {
  return (
    <div
      style={{ borderRadius }}
      className="absolute inset-0 flex items-center justify-center bg-slate-500 pr-1 text-sm font-semibold text-white"
    >
      +{count}
    </div>
  );
}
