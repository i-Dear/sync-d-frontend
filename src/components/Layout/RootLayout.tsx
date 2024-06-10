"use client";

import { useEffect, useState } from "react";

const CustomRootLayout = ({ children }: { children: React.ReactNode }) => {
  const [vh, setVh] = useState("100vh");

  useEffect(() => {
    const setVhToWindowHeight = () => {
      let vh = window.innerHeight * 0.01;
      setVh(`${vh}px`);
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVhToWindowHeight();
    window.addEventListener("resize", setVhToWindowHeight);
    return () => window.removeEventListener("resize", setVhToWindowHeight);
  }, []);

  return (
    <html lang="ko">
      <body
        style={{
          height: `calc(var(--vh, 1vh) * 100)`,
        }}
        className="relative mx-auto flex w-screen flex-col items-center"
      >
        <main
          style={{ height: `calc(var(--vh, 1vh) * 100)` }}
          className="flex flex-col items-center justify-center"
        >
          {children}
        </main>
      </body>
    </html>
  );
};

export default CustomRootLayout;
