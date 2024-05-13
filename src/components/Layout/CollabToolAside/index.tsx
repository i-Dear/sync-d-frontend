import { memo } from "react";
import LiveAvatars from "./LiveAvatars";
import Timer from "./Timer";
import GroupCall from "./GroupCall";
import { MusicPlayer } from "./MusicPlayer";

type GroupCallProps = {
  roomId: string;
};

const CollabToolAside = memo(({ roomId }: GroupCallProps) => {
  return (
    <aside className="absolute right-0 z-10 flex h-screen w-[346px] flex-col gap-[16px] bg-white p-[16px] ">
      <LiveAvatars />
      <Timer />
      <GroupCall roomId={roomId} />
      <MusicPlayer />
    </aside>
  );
});

CollabToolAside.displayName = "CollabToolAside";

export default CollabToolAside;
