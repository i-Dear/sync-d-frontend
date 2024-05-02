import React, { useState, useEffect, useRef } from "react";
import { useMutation, useStorage } from "~/liveblocks.config";
import formatTime from "@/utils/formatTimer";

const Timer = () => {
  const timerRef = useRef<HTMLDivElement>(null);
  const storageTimer = useStorage((root) => root.timer);
  const [isActive, setIsActive] = useState<boolean>(storageTimer.timerState); //RoomProvider에서 받아온 timerState
  const [time, setTime] = useState<number>(storageTimer.defaultTime);

  //타이머의 업데이트하는 함수 (진행,멈춤)
  const updateTimerState = useMutation(({ storage }, isActive: boolean) => {
    const storageTimer = storage.get("timer");
    storageTimer.set("timerState", isActive);
    setIsActive(isActive);
  }, []);

  //타이머의 현재 시간을 업데이트하는 함수
  const updateCurrentTime = useMutation(({ storage }, time: number) => {
    const storageTimer = storage.get("timer");
    storageTimer.set("currentTime", time);
  }, []);

  //타이머 로직
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            updateTimerState(false);
            return 0;
          }
          updateCurrentTime(prevTime - 1);
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, updateTimerState, updateCurrentTime]);

  const handleEdit = () => {
    if (!isActive) {
      if (timerRef.current) {
        timerRef.current.focus();
      }
    }
  };

  const handleIncrement = (amount: number) => {
    setTime((prevTime) => Math.max(0, prevTime + amount));
    updateCurrentTime(time + amount);
  };

  const onClickTimerRun = () => {
    setIsActive(!isActive);
    updateTimerState(!isActive);
  };

  const onClickTimerReset = () => {
    setTime(storageTimer.defaultTime);
    updateCurrentTime(storageTimer.defaultTime);
  };

  useEffect(() => {
    setTime(storageTimer.currentTime);
  }, [storageTimer.currentTime]);

  const formattedTime = formatTime(storageTimer.currentTime);

  return (
    <div className="mb-[8px] flex h-fit w-full flex-col items-start justify-center gap-[18px] rounded-xl bg-light-gray-100 p-[16px]">
      <div className="text-4xl  font-bold text-div-text">Timer</div>
      <div
        ref={timerRef}
        contentEditable={!isActive}
        suppressContentEditableWarning={true}
        onClick={handleEdit}
        className="flex w-full justify-center text-6xl font-bold text-div-text"
      >
        <div className="">{formattedTime}</div>
      </div>
      <div className="flex w-full justify-center gap-[12px]">
        <button
          className="w-[64px] cursor-pointer rounded-2xl bg-gray-300 p-2 text-center text-[18px] font-bold"
          onClick={() => handleIncrement(60)}
        >
          + 60
        </button>
        <button
          className="w-[64px] cursor-pointer rounded-2xl bg-gray-300 p-2 text-center text-[18px] font-bold"
          onClick={() => handleIncrement(-60)}
        >
          - 60
        </button>
        <button
          className="w-[64px] cursor-pointer rounded-2xl bg-gray-300 p-2 text-center text-[18px] font-bold"
          onClick={() => handleIncrement(30)}
        >
          + 30
        </button>
        <button
          className="w-[64px] cursor-pointer rounded-2xl bg-gray-300 p-2 text-center text-[18px] font-bold"
          onClick={() => handleIncrement(-30)}
        >
          - 30
        </button>
      </div>
      <div className="flex w-full justify-center gap-12 ">
        <button
          className="w-[80px] cursor-pointer rounded-2xl bg-primary p-2 text-center text-[18px] text-white"
          onClick={onClickTimerRun}
        >
          {storageTimer.timerState ? "Stop" : "Start"}
        </button>
        <button
          className="w-[80px] cursor-pointer rounded-2xl bg-primary  p-2 text-center text-[18px] text-white"
          onClick={onClickTimerReset}
          disabled={isActive}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
