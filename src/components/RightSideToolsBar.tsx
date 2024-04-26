import { memo } from "react";
import GroupCall from "./GroupCall";
import { MusicPlayer } from "./MusicPlayer";
import LiveAvatars from "./LiveAvatars";

type GroupCallProps = {
  roomId: string;
};

const RightSideToolsBar = memo(({ roomId }: GroupCallProps) => {
  return (
    <aside className="absolute right-0 z-10 flex h-screen w-[346px] flex-col gap-[16px] bg-white p-[16px]">
      <LiveAvatars />
      <GroupCall roomId={roomId} />
      <MusicPlayer />
    </aside>
  );
});

RightSideToolsBar.displayName = "RightSideToolsBar";

export default RightSideToolsBar;
