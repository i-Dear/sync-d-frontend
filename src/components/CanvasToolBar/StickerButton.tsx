import React from "react";
import IconButton from "../IconButton";
import StickerPicker from "../Canvas/StickerPicker";

type Props = {
  isActive: boolean;
  onClick: () => void;
};

export default function StickerButton({ isActive, onClick }: Props) {
  return (
    <>
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
          <path d="M22 11v1a10 10 0 1 1-9-10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" x2="9.01" y1="9" y2="9" />
          <line x1="15" x2="15.01" y1="9" y2="9" />
          <path d="M16 5h6" />
          <path d="M19 2v6" />
        </svg>
      </IconButton>
      <div>{isActive && <StickerPicker />}</div>
    </>
  );
}
