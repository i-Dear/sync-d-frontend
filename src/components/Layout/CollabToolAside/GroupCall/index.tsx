"use client";

import LiveCallUsers from "./LiveCallUsers";
import GroupCallButton from "./GroupCallButton";

type GroupCallProps = {
  roomId: string;
};

const GroupCall = (props: GroupCallProps) => {
  return (
    <div className="bg-light-gray-100 flex h-fit w-full flex-col items-start justify-center rounded-xl p-[16px]">
      <div className="text-div-text  text-2xl font-bold">Voice Chat</div>
      <LiveCallUsers />
      <GroupCallButton roomId={props.roomId} />
    </div>
  );
};

export default GroupCall;
