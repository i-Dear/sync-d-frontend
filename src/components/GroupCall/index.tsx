"use client";

import LiveCallUsers from "./LiveCallUsers";
import GroupCallButton from "./GroupCallButton";

type GroupCallProps = {
  roomId: string;
};

const GroupCall = (props: GroupCallProps) => {
  return (
    <div className="flex h-fit w-full flex-col items-start justify-center rounded-xl bg-light-gray-100 p-[16px]">
      <div className="text-2xl  font-bold text-div-text">Voice Chat</div>
      <LiveCallUsers />
      <GroupCallButton roomId={props.roomId} />
    </div>
  );
};

export default GroupCall;
