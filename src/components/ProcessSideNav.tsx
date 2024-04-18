"use client";

import Link from "next/link";
import { steps } from "@/lib/data";
import type { UserInfoStoreType } from "@/hooks/useUserInfoStore";
import { SetStateAction, useEffect } from "react";
import { Camera } from "@/lib/types";
import { useUpdateMyPresence } from "~/liveblocks.config";
import ProcessAvatars from "./ProcessAvatars";
import { useState } from "react";
import Timer from "./Timer";

const ProcessSideNav = ({
  userInfo,
  setCamera,
}: {
  userInfo: UserInfoStoreType;
  setCamera: React.Dispatch<SetStateAction<Camera>>;
}) => {
  const updateMyPresence = useUpdateMyPresence();

  const updateCurrentProcess = (step: number) => {
    updateMyPresence({
      currentProcess: step,
    });
  };

  const [timerToggle, setTimerToggle] = useState<boolean>(false);

  return (
    <nav className="absolute left-0 z-10 h-full w-40 overflow-y-scroll bg-gray-900 scrollbar-hide">
      <ul className="flex flex-col items-start justify-center ">
        <li className="p-4 text-white">
          <Link href="/">홈</Link>
        </li>
        <li className="p-4 text-white">
          <Link href={`/dashboard/${userInfo._id}`}>대시보드</Link>
        </li>
        {steps.map((step) => (
          <li key={step.step} className="p-4 text-white">
            <div
              className="flex cursor-pointer"
              onClick={() => {
                setCamera(() => ({
                  x: step.camera.x,
                  y: step.camera.y,
                }));
                updateCurrentProcess(step.step);
              }}
            >
              {`${step.step}단계`}
              <ProcessAvatars step={step.step} />
            </div>
          </li>
        ))}
      </ul>
      <div className="bg-white" onClick={() => setTimerToggle(!timerToggle)}>
        타이머
      </div>
      <Timer timerToggle={timerToggle} />
    </nav>
  );
};

export default ProcessSideNav;
