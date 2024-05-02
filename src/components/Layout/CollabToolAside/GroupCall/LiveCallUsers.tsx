"use client";

import { useStorage } from "~/liveblocks.config";
import LiveCallUser from "./LiveCallUser";

const LiveCallUsers = () => {
  const activeUsers = useStorage((storage) => storage.groupCall.activeUsers);

  return (
    <div className="flex h-fit w-fit flex-col rounded-xl ">
      <ul
        className="
        flex h-[fit-content]
        flex-col
        gap-[12px]
        overflow-y-auto
        py-[12px]
        scrollbar-hide
      "
      >
        {activeUsers.map((user, idx) => (
          <li key={idx}>
            <LiveCallUser user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveCallUsers;
