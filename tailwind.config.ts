import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-blue-white":
          "linear-gradient(to top right, #123F82 0%, #369EFF 61%,  #FFFFFF 100%)",
      },
      colors: {
        "surface-canvas": "#eee",
        "surface-panel": "#fff",
        "surface-subtle": "#f3f3f3",
        "waveform-gray": "#A8A8A8",
        divider: "#eee",
        "foreground-600": "#333",
        "foreground-500": "#444",
        "foreground-400": "#555",
        "foreground-300": "#666",
        "foreground-200": "#888",
        "foreground-100": "#999",
        "light-gray-100": "#F0F2F5",
        "light-gray-200": "#3D4D5C",
        "primary-300": "#A5D0F9",
        "primary-400": "#369EFF",
        "primary-500": "#4569A1",
        "gray-700": "#61788A",
        "gray-800": "#3D4D5C",
        primary: "#369EFF",
        "background-100": "#ffffff",
        "background-200": "#f0f2f5",
        "div-text": "#121417",
        time: "#4569A1",
      },
      boxShadow: {
        popup:
          "0px 2px 4px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(0, 0, 0, 0.05)",
        avatar: "0 0 0 2px white",
      },
      animation: {
        "spin-slow": "spin 10s linear infinite",
      },
      transitionTimingFunction: {
        "out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
