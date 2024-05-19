import {
  useOthersMapped,
  useSelf,
  useUpdateMyPresence,
} from "~/liveblocks.config";
import Cursor from "./Cursor";
import { MutableRefObject, useEffect } from "react";
import { shallow } from "@liveblocks/client";
import { useBoundingClientRectRef } from "@/utils/useBoundingClientRectRef";

type Props = {
  cursorPanel: MutableRefObject<HTMLElement | null>;
};

const Cursors = ({ cursorPanel }: Props) => {
  const updateMyPresence = useUpdateMyPresence();
  const me = useSelf();

  const others = useOthersMapped(
    (other) => ({
      cursor: other.presence.cursor,
      info: other.info,
      currentProcess: other.presence.currentProcess,
    }),
    shallow,
  );
  const rectRef = useBoundingClientRectRef(cursorPanel);

  useEffect(() => {
    if (!(cursorPanel?.current instanceof HTMLElement)) {
      console.warn('"cursorPanel"이 현재 HTMLElement가 아닙니다.');
      return;
    }

    const removeCursor = () => {
      updateMyPresence({
        cursor: null,
      });
    };

    cursorPanel.current.addEventListener("pointerleave", removeCursor);

    const oldRef = cursorPanel.current;
    return () => {
      if (!oldRef) {
        return;
      }

      oldRef.removeEventListener("pointerleave", removeCursor);
    };
  }, [updateMyPresence, cursorPanel, rectRef]);

  return (
    <>
      {others.map(([id, other]) => {
        if (other.cursor == null) {
          return null;
        }

        return (
          <Cursor
            key={id}
            name={other.info.name}
            color={other.info.color}
            x={other.cursor.x}
            y={other.cursor.y - (me.presence.currentProcess - 1) * 1000}
          />
        );
      })}
    </>
  );
};

export default Cursors;
