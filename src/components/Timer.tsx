import React, { useState, useEffect, useRef } from "react";
import { useMutation, useStorage } from "~/liveblocks.config";

interface TimerProps {
  timerToggle: boolean;
}

const Timer = ({ timerToggle }: TimerProps) => {
  const [time, setTime] = useState<number>(3 * 60); // Default time is 3 minutes (3 * 60 seconds)
  const [isActive, setIsActive] = useState<boolean>(false);
  const timerRef = useRef<HTMLDivElement>(null);

  const projectTimer = useStorage((root) => root.time);

  const updateTimerState = useMutation(({ storage }, isActive: boolean) => {
    const projectTimer = storage.get("time");
    projectTimer.set("timerState", isActive);
    setIsActive(isActive);
  }, []);

  const updateTimerCurrent = useMutation(({ storage }, time: number) => {
    const projectTimer = storage.get("time");
    projectTimer.set("timerTime", time);
    console.log(storage.get("time").get("timerTime"));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            setIsActive(false);
            updateTimerState(isActive);
            return 0;
          }
          if (projectTimer.timerState !== false) {
            updateTimerState(isActive);
          }
          updateTimerCurrent(prevTime - 1);
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, updateTimerState, updateTimerCurrent]);

  const handleEdit = () => {
    if (!isActive) {
      if (timerRef.current) {
        timerRef.current.focus();
      }
    }
  };

  const handleIncrement = (amount: number) => {
    setTime((prevTime) => Math.max(0, prevTime + amount));
    updateTimerCurrent(time + amount);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return timerToggle ? (
    <div className="w-80 h-full bg-white border border-black fixed">
      <div
        ref={timerRef}
        contentEditable={!isActive}
        suppressContentEditableWarning={true}
        onClick={handleEdit}
        className="flex justify-center bg-red-200">
        {formatTime(projectTimer.timerTime)}
      </div>
      <div className="flex justify-center bg-blue-200">
        <button onClick={() => handleIncrement(60)}>+1 Minute</button>
        <button onClick={() => handleIncrement(-60)}>-1 Minute</button>
        <button onClick={() => handleIncrement(10)}>+10 Seconds</button>
        <button onClick={() => handleIncrement(-10)}>-10 Seconds</button>
      </div>
      <div className="flex justify-center gap-8 bg-white">
        <button onClick={() => setIsActive(!isActive)}>{isActive ? "Stop" : "Start"}</button>
        <button onClick={() => setTime(projectTimer.timerTime)} disabled={isActive}>
          Reset
        </button>
      </div>
    </div>
  ) : null;
};

export default Timer;
