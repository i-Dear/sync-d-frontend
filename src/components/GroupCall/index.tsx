"use client";

import { memo } from "react";
import LiveCallUsers from "./LiveCallUsers";
import GroupCallButton from "./GroupCallButton";

type GroupCallProps = {
  roomId: string;
};

const GroupCall = memo((props: GroupCallProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="text-2xl font-bold">Group Call</div>
      <LiveCallUsers />
      <GroupCallButton roomId={props.roomId} />
    </div>
  );
});

GroupCall.displayName = "GroupCall";

export default GroupCall;
