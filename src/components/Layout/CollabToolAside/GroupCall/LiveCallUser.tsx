"use client";

import { formatDuration } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ActiveUserInfo } from "~/liveblocks.config";

const LiveCallUser = ({ user }: { user: ActiveUserInfo }) => {
  const [time, setTime] = useState(
    user.enteredAt ? user.enteredAt : Date.now(),
  );

  useEffect(() => {
    setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  }, []);

  return (
    <div className="flex h-[40px] w-[281px] items-center justify-between border-gray-200">
      <div className="flex items-center">
        <div className="relative h-[40px] w-[40px] rounded-full bg-gray-50 shadow-sm">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-semibold">
              {user.name[0]}
            </div>
          )}
        </div>
        <div className="ml-[16px] flex flex-col items-start justify-center">
          <span className="text-lg font-semibold text-div-text">
            {user.name}
          </span>
          <span className="text-base font-normal text-time">
            {formatDuration(time)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiveCallUser;
