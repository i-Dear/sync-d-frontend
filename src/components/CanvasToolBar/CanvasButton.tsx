import SkipButton from "./SkipButton";
import SyncButton from "./SyncButton";
import VoteButton from "./VoteButton";
import { useMyPresence } from "~/liveblocks.config";

const CanvasButton = () => {
  return (
    <div className="flex gap-[3rem]">
      <SkipButton />
      <VoteButton />
      <SyncButton />
    </div>
  );
};

export default CanvasButton;
