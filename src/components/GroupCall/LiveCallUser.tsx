"use client";

import { formatDuration } from "@/lib/utils";
import Image from "next/image";
import { ActiveUserInfo } from "~/liveblocks.config";

const LiveCallUser = ({ user }: { user: ActiveUserInfo }) => {
  return (
    <div className="flex h-fit w-fit items-center justify-between border-b border-gray-200 px-4 py-2">
      <div className="flex items-center space-x-2">
        <div className="relative h-8 w-8">
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
            <div className="h-full w-full rounded-full bg-gray-200">
              {user.name[0]}
            </div>
          )}
        </div>
        <div className="flex flex-col items-start justify-center gap-2">
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
