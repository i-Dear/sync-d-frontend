import React, { useState, useEffect, useRef } from "react";
import { useMutation, useStorage } from "~/liveblocks.config";
import formatTime from "@/utils/formatTimer";

interface TimerProps {
  timerToggle: boolean;
}

const Timer = ({ timerToggle }: TimerProps) => {
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
    console.log("타이머 업데이트", storageTimer.currentTime);
    setTime(storageTimer.currentTime);
  }, [storageTimer.currentTime]);

  const formattedTime = formatTime(storageTimer.currentTime);

  return timerToggle ? (
    <div className="fixed h-full w-80 border border-black bg-white">
      <div
        ref={timerRef}
        contentEditable={!isActive}
        suppressContentEditableWarning={true}
        onClick={handleEdit}
        className="flex justify-center bg-red-200"
      >
        {formattedTime}
      </div>
      <div className="flex justify-center bg-blue-200">
        <button onClick={() => handleIncrement(60)}>+1 Minute</button>
        <button onClick={() => handleIncrement(-60)}>-1 Minute</button>
        <button onClick={() => handleIncrement(10)}>+10 Seconds</button>
        <button onClick={() => handleIncrement(-10)}>-10 Seconds</button>
      </div>
      <div className="flex justify-center gap-8 bg-white">
        <button onClick={onClickTimerRun}>
          {storageTimer.timerState ? "Stop" : "Start"}
        </button>
        <button onClick={onClickTimerReset} disabled={isActive}>
          Reset
        </button>
      </div>
    </div>
  ) : null;
};

export default Timer;
