"use client";

import { formatDuration } from "@/lib/utils";
import Image from "next/image";
import { ActiveUserInfo } from "~/liveblocks.config";

const LiveCallUser = ({ user }: { user: ActiveUserInfo }) => {
  return (
    <div className="w-fit h-fit flex items-center justify-between px-4 py-2 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <div className="relative w-8 h-8">
          {user.avatar && (
            <Image
              src={user.avatar}
              alt={user.name}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          )}
          {!user.avatar && (
            <div className="w-full h-full bg-gray-200 rounded-full">
              {user.name[0]}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <span className="font-semibold">{user.name}</span>
          <span className="text-xs text-gray-500">
            {formatDuration(user.enteredAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiveCallUser;
