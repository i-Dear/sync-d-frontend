import React from "react";
import { Avatar } from "./Avatar";
import { AnimatePresence, motion } from "framer-motion";
import { useOthersMapped, useSelf } from "~/liveblocks.config";

const MAX_OTHERS = 3;

const animationProps = {
  initial: { width: 0, transformOrigin: "left" },
  animate: { width: "auto", height: "auto" },
  exit: { width: 0 },
  transition: {
    type: "spring",
    damping: 15,
    mass: 1,
    stiffness: 200,
    restSpeed: 0.01,
  },
};

const avatarProps = {
  style: { marginLeft: "-0.45rem" },
  size: 40,
  outlineWidth: 2,
  outlineColor: "white",
};

export default function LiveAvatars() {
  const others = useOthersMapped((other) => other.info);
  const currentUser = useSelf();
  const hasMoreUsers = others.length > MAX_OTHERS;

  return (
    <div className="flex-col items-start justify-center">
      <span className="text-2xl font-bold text-div-text">Collaborators</span>
      <div className="mt-2 flex min-h-[40px] overflow-hidden pl-[12px]">
        <AnimatePresence>
          {hasMoreUsers ? (
            <motion.div key="count" {...animationProps}>
              <Avatar
                {...avatarProps}
                variant="more"
                count={others.length - 3}
              />
            </motion.div>
          ) : null}

          {others
            .slice(0, MAX_OTHERS)
            .reverse()
            .map(([key, info]) => (
              <motion.div key={key} {...animationProps}>
                <Avatar
                  {...avatarProps}
                  src={info.avatar}
                  name={info.name}
                  color={info.color}
                />
              </motion.div>
            ))}

          {currentUser ? (
            <motion.div key="you" {...animationProps}>
              <Avatar
                {...avatarProps}
                src={currentUser.info.avatar}
                name={currentUser.info.name + " (you)"}
                color={currentUser.info.color}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
