import React from "react";

interface svgProps {
  fill?: string;
  width?: number;
  height?: number;
}

const PlusMarkIcon = ({ fill, width, height }: svgProps) => (
  <svg
    width={width || "21"}
    height={height || "24"}
    viewBox="0 0 21 24"
    fill={fill || "white"} // Use the fill prop here
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.9286 4.14287C11.9286 3.35269 11.2902 2.71429 10.5 2.71429C9.70983 2.71429 9.07144 3.35269 9.07144 4.14287V10.5714H2.64287C1.85269 10.5714 1.21429 11.2098 1.21429 12C1.21429 12.7902 1.85269 13.4286 2.64287 13.4286H9.07144V19.8572C9.07144 20.6473 9.70983 21.2857 10.5 21.2857C11.2902 21.2857 11.9286 20.6473 11.9286 19.8572V13.4286H18.3572C19.1473 13.4286 19.7857 12.7902 19.7857 12C19.7857 11.2098 19.1473 10.5714 18.3572 10.5714H11.9286V4.14287Z" />
  </svg>
);

export default PlusMarkIcon;
