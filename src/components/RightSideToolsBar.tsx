import { memo } from "react";
import GroupCall from "./GroupCall";

type GroupCallProps = {
  roomId: string;
};

const RightSideToolsBar = memo(({ roomId }: GroupCallProps) => {
  return (
    <aside className="absolute right-0 z-10 flex h-screen w-[346px] flex-col bg-white p-[16px]">
      <GroupCall roomId={roomId} />
    </aside>
  );
});

RightSideToolsBar.displayName = "RightSideToolsBar";

export default RightSideToolsBar;
