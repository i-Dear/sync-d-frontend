import React from "react";
import IconButton from "../IconButton";

type Props = {
  isActive: boolean;
  onClick: () => void;
};

export default function NoteButton({ isActive, onClick }: Props) {
  return (
    <IconButton isActive={isActive} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="-8 -7 38 38"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" />
        <path d="M15 3v4a2 2 0 0 0 2 2h4" />
      </svg>
    </IconButton>
  );
}
