import React from "react";
import { Avatar } from "./Avatar";
import { AnimatePresence, motion } from "framer-motion";
import { useOthersMapped, useSelf } from "~/liveblocks.config";
import { shallow } from "@liveblocks/client";

const MAX_OTHERS = 3;

const animationProps = {
  initial: { width: 0, transformOrigin: "left" },
  animate: { width: "auto", height: "auto" },
  exit: { display: "none" },
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
  size: 24,
  outlineWidth: 2,
  outlineColor: "white",
};

export default function ProcessAvatars({ step }: { step: number }) {
  const others = useOthersMapped(
    (other) => ({
      currentProcess: other.presence.currentProcess,
      info: other.info,
    }),
    shallow
  );

  const processOthers = others.filter(
    (other) => other[1].currentProcess === step
  );

  const hasMoreUsers = processOthers.length > MAX_OTHERS;

  return (
    <div
      style={{
        minHeight: avatarProps.size + "px",
        display: "flex",
        paddingLeft: "0.75rem",
        overflow: "hidden",
      }}
    >
      <AnimatePresence>
        {hasMoreUsers ? (
          <motion.div key="count" {...animationProps}>
            <Avatar {...avatarProps} variant="more" count={others.length - 3} />
          </motion.div>
        ) : null}

        {processOthers
          .slice(0, MAX_OTHERS)
          .reverse()
          .map(([key, data]) => (
            <motion.div key={key} {...animationProps}>
              <Avatar
                {...avatarProps}
                src={data.info.avatar}
                name={data.info.name}
                color={data.info.color}
              />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
