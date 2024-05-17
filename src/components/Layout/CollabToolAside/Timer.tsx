import React, { useState, useEffect, useRef } from "react";
import {
  useMutation,
  useStorage,
  useBroadcastEvent,
} from "~/liveblocks.config";
import { formatTimeToMinSec } from "@/lib/utils";
import { cn } from "@/lib/utils";
import PlayIcon from "~/public/play.svg";
import PauseIcon from "~/public/pause.svg";
import ResetIcon from "~/public/reset.svg";
import { toast } from "react-toastify";
const TimerTimes = [
  {
    time: 60,
    name: "+1 min",
  },
  {
    time: 30,
    name: "+30 sec",
  },
];

const Timer = () => {
  const storageTimer = useStorage((root) => root.timer);
  const [isActive, setIsActive] = useState<boolean>(storageTimer.timerState); //RoomProvider에서 받아온 timerState
  const [time, setTime] = useState<number>(storageTimer.defaultTime);

  const updateTimerState = useMutation(({ storage }, isActive: boolean) => {
    const storageTimer = storage.get("timer");
    storageTimer.set("timerState", isActive);
    setIsActive(isActive);
  }, []);

  const updateCurrentTime = useMutation(({ storage }, time: number) => {
    const storageTimer = storage.get("timer");
    storageTimer.set("currentTime", time);
  }, []);

  const broadcast = useBroadcastEvent();
  const notify = () => {
    toast("Time's up!", {
      toastId: 1,
    });
    broadcast({ type: "TIMER_END", message: "time's up!" });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            notify();
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

  const [formattedMin, formattedSec] = formatTimeToMinSec(
    storageTimer.currentTime,
  );

  return (
    <div className="flex h-[16.5rem] w-full items-center justify-center gap-[1.6rem] px-[2.15rem]">
      <div className="flex  w-[9rem] flex-col items-center justify-center gap-[1.6rem]">
        <div className="flex h-[5.6rem] w-[9rem] items-center justify-center rounded-[1.2rem] bg-light-gray-100">
          <span className="text-[1.8rem] font-bold text-div-text">
            {formattedMin}
          </span>
        </div>
        <span className="w-full text-center text-[1.4rem] font-normal text-div-text">
          Minutes
        </span>
      </div>
      <div className="flex w-[9rem] flex-col items-center justify-center gap-[1.6rem]">
        <div className="flex h-[5.6rem] w-[9rem] items-center justify-center rounded-[1.2rem] bg-light-gray-100">
          <span className="text-[1.8rem] font-bold text-div-text">
            {formattedSec}
          </span>
        </div>
        <span className="w-full text-center text-[1.4rem] font-normal text-div-text">
          Seconds
        </span>
      </div>

      <div className="flex w-[9rem] flex-col items-center justify-center gap-[1.6rem]">
        {TimerTimes.map((timerTime) => (
          <button
            key={timerTime.time}
            className="flex h-[3.5rem] w-[9rem] cursor-pointer items-center justify-center rounded-[1.2rem] bg-light-gray-100"
            onClick={() => handleIncrement(timerTime.time)}
          >
            <span className="text-[1.4rem] font-normal text-div-text">
              {timerTime.name}
            </span>
          </button>
        ))}
        <div className="flex w-[9rem] items-center justify-center gap-[1.6rem]">
          <button
            className={cn(
              "flex h-[3.5rem] w-[3.5rem] min-w-[3.5rem] cursor-pointer items-center justify-center rounded-[1.2rem]",
              storageTimer.timerState ? "bg-red-300" : "bg-primary",
            )}
            onClick={onClickTimerRun}
          >
            {storageTimer.timerState ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div className="flex w-[9rem] flex-col items-center justify-center gap-[1.6rem]">
            <button
              className="flex h-[3.5rem] w-[3.5rem] min-w-[3.5rem] cursor-pointer items-center justify-center rounded-[1.2rem] bg-primary"
              onClick={onClickTimerReset}
              disabled={isActive}
            >
              <ResetIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
