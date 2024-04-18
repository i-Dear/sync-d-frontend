"use client";

import { useStorage } from "~/liveblocks.config";
import LiveCallUser from "./LiveCallUser";
import { memo } from "react";

const LiveCallUsers = memo(() => {
  const activeUsers = useStorage((storage) => storage.groupCall.activeUsers);

  return (
    <div className="flex h-fit w-fit flex-col gap-2 rounded-xl bg-blue-300 p-4">
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
