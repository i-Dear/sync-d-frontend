"use client";

import { useStorage } from "~/liveblocks.config";
import LiveCallUser from "./LiveCallUser";
import { memo } from "react";

const LiveCallUsers = memo(() => {
  const activeUsers = useStorage((storage) => storage.groupCall.activeUsers);

  return (
    <div className="w-fit h-fit flex flex-col gap-2 bg-blue-300 rounded-xl p-4">
      <ul>
        {activeUsers.map((user, idx) => (
          <li key={idx}>
            <LiveCallUser user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
});

LiveCallUsers.displayName = "LiveCallUsers";

export default LiveCallUsers;
