"use client";

import { useEffect, useState } from "react";
import TopNavBar from "./TopNavBar";

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
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
    <div
      style={{
        height: `calc(var(--vh, 1vh) * 100)`,
      }}
      className="relative mx-auto flex w-screen flex-col items-center"
    >
      <TopNavBar />
      <main
        style={{ height: `calc(var(--vh, 1vh) * 100 - 48px)` }}
        className="flex flex-col items-center justify-center"
      >
        {children}
      </main>
    </div>
  );
};

export default CustomLayout;
