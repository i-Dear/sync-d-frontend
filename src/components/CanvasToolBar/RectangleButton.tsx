import React from "react";
import IconButton from "../IconButton";

type Props = {
  isActive: boolean;
  onClick: () => void;
};

export default function RectangleButton({ isActive, onClick }: Props) {
  return (
    <IconButton isActive={isActive} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="-7 -7 38 38"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
      </svg>
    </IconButton>
  );
}
