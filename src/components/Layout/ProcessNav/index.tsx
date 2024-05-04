"use client";

import type { UserInfoStoreType } from "@/hooks/useUserInfoStore";
import { SetStateAction, useState } from "react";
import { Camera } from "@/lib/types";
import {
  useMutation,
  useStorage,
  useUpdateMyPresence,
} from "~/liveblocks.config";
import ProcessAvatars from "./ProcessAvatars";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

import useModalStore from "@/store/useModalStore";

const ProcessNav = ({
  userInfo,
  setCamera,
}: {
  userInfo: UserInfoStoreType;
  setCamera: React.Dispatch<SetStateAction<Camera>>;
}) => {
  const updateMyPresence = useUpdateMyPresence();
  const processes = useStorage((storage) => storage.process);
  const [currentProcess, setCurrentProcess] = useState(1);
  const [isToggle, setIsToggle] = useState(false);

  const handleToggle = () => {
    setIsToggle((prev) => !prev);
  };

  // 프로세스 완료 시 진행
  // const updateProcessCompleted = useMutation(({ storage }, step: number) => {
  //   const processes = storage.get("process");

  //   if (!processes.get(step - 1)) {
  //     console.log("Invalid step");
  //     return;
  //   }

  //   if (processes.get(step - 1)!.done) {
  //     return;
  //   }

  //   processes.get(step - 1)!.done = true;
  // }, []);

  const updateCurrentProcess = (step: number) => {
    updateMyPresence({
      currentProcess: step,
    });
    setCurrentProcess(step);
  };

  const { isOpen, setModalState, setModalType } = useModalStore();

  return (
    <motion.nav
      className="absolute left-0 z-10 flex h-full flex-col items-start justify-start bg-white pt-[1rem] shadow-md shadow-light-gray-100"
      initial={{ width: "7.2rem" }}
      animate={{ width: isToggle ? "34.6rem" : "7.2rem" }}
    >
      <div
        className="mb-[1.2rem] ml-[1.6rem] flex h-[4rem] w-[4rem] cursor-pointer items-center justify-center p-[1rem]"
        onClick={handleToggle}
      >
        <Image src="/menu.svg" alt="Menu" width={20} height={18} />
      </div>
      <div className="absolute left-[9rem] top-[0.85rem] flex h-[4rem] w-[30rem] items-center justify-start gap-[1.6rem]">
        <span className="h-full text-[1.8rem] font-semibold leading-[4.3rem] tracking-[-0.03rem]">
          {`${currentProcess}. ${processes[currentProcess - 1].title}`}
        </span>
        <Image
          src="/help.svg"
          alt="Help"
          width={18}
          height={18}
          className="cursor-pointer"
          onClick={() => {
            setModalState(true), setModalType("skip");
          }}
        />
      </div>

      <ul className="flex flex-col overflow-y-scroll scrollbar-hide">
        {processes.map((process) => (
          <li key={process.step}>
            <motion.div
              className="flex h-[6.4rem] cursor-pointer items-center justify-start px-[1.6rem] py-[1.2rem]"
              initial={{ width: "7.2rem" }}
              animate={{ width: isToggle ? "34.6rem" : "7.2rem" }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setCamera(() => ({
                  x: process.camera.x,
                  y: process.camera.y,
                }));
                updateCurrentProcess(process.step);
              }}
            >
              <div
                className={cn(
                  "flex h-[4rem] w-[4rem] cursor-pointer items-center justify-center rounded-[1rem] bg-light-gray-100",
                  {
                    "bg-primary-300": process.step === currentProcess,
                  },
                )}
              >
                <span className="h-[4rem] w-[4rem] text-center text-[1.8rem] font-normal leading-[4.4rem] text-div-text">
                  {process.step}
                </span>
              </div>

              <div className="ml-[1.6rem] flex items-center justify-start gap-[1.2rem] overflow-hidden">
                <span className="h-[2rem] text-[1.6rem] font-light leading-[2.4rem] text-div-text">
                  {process.title}
                </span>
                <ProcessAvatars step={process.step} />
              </div>
            </motion.div>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default ProcessNav;
