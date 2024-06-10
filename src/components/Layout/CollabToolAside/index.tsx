import { memo, useState } from "react";
import { motion } from "framer-motion";
import LiveAvatars from "./LiveAvatars";
import Timer from "./Timer";
import GroupCall from "./GroupCall";
import { MusicPlayer } from "./MusicPlayer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type GroupCallProps = {
  roomId: string;
};

const CollabToolAside = memo(({ roomId }: GroupCallProps) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const variants = {
    open: { transform: "translateX(0%)" },
    closed: { transform: "translateX(100%)" },
  };

  return (
    <>
      <motion.aside
        initial="closed"
        animate={isToggled ? "open" : "closed"}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute right-0 top-0 z-10 h-screen"
        style={{ width: "34.6rem" }}
        variants={variants}
      >
        <div className="relative flex h-full flex-col gap-[1.6rem] bg-white p-[1.6rem]">
          <LiveAvatars />
          <Timer />
          <GroupCall roomId={roomId} />
          <MusicPlayer />
          <ToastContainer autoClose={10000} />
        </div>
        <motion.div
          className="top-10% right-110% absolute z-10 flex h-[5rem] w-[5rem] cursor-pointer items-center justify-center rounded-full bg-primary shadow-sm"
          style={{
            top: "10%",
            right: "110%",
          }}
          onClick={handleToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              // Conditional styling to flip the SVG arrow based on toggle state
              transform: isToggled ? "scaleX(-1)" : "scaleX(1)",
            }}
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.aside>
    </>
  );
});

CollabToolAside.displayName = "CollabToolAside";

export default CollabToolAside;
