import { useOthersMapped } from "~/liveblocks.config";
import { shallow } from "@liveblocks/client";
import React from "react";
import { colorToCss } from "@/lib/utils";
import Path from "./Path";

function Drafts() {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    }),
    shallow
  );
  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.penColor ? colorToCss(other.penColor) : "#CCC"}
            />
          );
        }
        return null;
      })}
    </>
  );
}

export default React.memo(Drafts);
