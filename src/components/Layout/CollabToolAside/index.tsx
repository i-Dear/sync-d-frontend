import { memo } from "react";
import LiveAvatars from "./LiveAvatars";
import Timer from "./Timer";
import GroupCall from "./GroupCall";
import { MusicPlayer } from "./MusicPlayer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEventListener } from "~/liveblocks.config";
import ProgressBar from "./ProgressBar";

type GroupCallProps = {
  roomId: string;
};

const CollabToolAside = memo(({ roomId }: GroupCallProps) => {
  useEventListener(({ event }) => {
    if (event.type === "TIMER_END") {
      toast("Time's up!", {
        toastId: 1,
      });
    }
  });

  return (
    <aside className="absolute right-0 z-10 flex h-screen w-[346px] flex-col gap-[16px] bg-white p-[16px] ">
      <LiveAvatars />
      <ProgressBar />
      <Timer />
      <GroupCall roomId={roomId} />
      <MusicPlayer />
      <ToastContainer autoClose={10000} />
    </aside>
  );
});

CollabToolAside.displayName = "CollabToolAside";

export default CollabToolAside;
