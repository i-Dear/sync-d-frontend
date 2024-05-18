import React from "react";

interface svgProps {
  fill?: string;
  width?: number;
  height?: number;
}

const XMarkIcon = ({ fill, width, height }: svgProps) => (
  <svg
    width={width || "21"}
    height={height || "24"}
    viewBox="0 0 21 24"
    fill={fill || "white"} // Use the fill prop here
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14.0234 5.88281C14.5117 5.39453 14.5117 4.60156 14.0234 4.11328C13.5352 3.625 12.7422 3.625 12.2539 4.11328L8.14062 8.23047L4.02344 4.11719C3.53516 3.62891 2.74219 3.62891 2.25391 4.11719C1.76562 4.60547 1.76562 5.39844 2.25391 5.88672L6.37109 10L2.25781 14.1172C1.76953 14.6055 1.76953 15.3984 2.25781 15.8867C2.74609 16.375 3.53906 16.375 4.02734 15.8867L8.14062 11.7695L12.2578 15.8828C12.7461 16.3711 13.5391 16.3711 14.0273 15.8828C14.5156 15.3945 14.5156 14.6016 14.0273 14.1133L9.91016 10L14.0234 5.88281Z" />
  </svg>
);

export default XMarkIcon;
