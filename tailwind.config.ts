import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "surface-canvas": "#eee",
        "surface-panel": "#fff",
        "surface-subtle": "#f3f3f3",
        divider: "#eee",
        "foreground-600": "#333",
        "foreground-500": "#444",
        "foreground-400": "#555",
        "foreground-300": "#666",
        "foreground-200": "#888",
        "foreground-100": "#999",
        primary: "#0044ff",
        white: "#fff",
      },
      boxShadow: {
        popup:
          "0px 2px 4px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(0, 0, 0, 0.05)",
        avatar: "0 0 0 2px white",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
