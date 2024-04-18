"use client";

import { memo } from "react";
import LiveCallUsers from "./LiveCallUsers";
import GroupCallButton from "./GroupCallButton";

type GroupCallProps = {
  roomId: string;
};

const GroupCall = memo((props: GroupCallProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-2xl font-bold">Group Call</div>
      <LiveCallUsers />
      <GroupCallButton roomId={props.roomId} />
    </div>
  );
});

GroupCall.displayName = "GroupCall";

export default GroupCall;
