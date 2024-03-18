import { useOthersMapped, useUpdateMyPresence } from "~/liveblocks.config";
import Cursor from "./Cursor";
import { MutableRefObject, useEffect } from "react";
import { shallow } from "@liveblocks/client";
import { useBoundingClientRectRef } from "@/utils/useBoundingClientRectRef";

type Props = {
  cursorPanel: MutableRefObject<HTMLElement | null>;
};

const Cursors = ({ cursorPanel }: Props) => {
  const updateMyPresence = useUpdateMyPresence();

  const others = useOthersMapped(
    (other) => ({
      cursor: other.presence.cursor,
      info: other.info,
    }),
    shallow
  );
  const rectRef = useBoundingClientRectRef(cursorPanel);

  useEffect(() => {
    if (!(cursorPanel?.current instanceof HTMLElement)) {
      console.warn('"cursorPanel"이 현재 HTMLElement가 아닙니다.');
      return;
    }

    const updateCursor = (event: PointerEvent) => {
      if (!cursorPanel?.current) {
        return;
      }

      // (뷰포트 위치) - (이벤트 위치) + (스크롤 위치)
      const x =
        event.clientX - rectRef.current.x + cursorPanel.current.scrollLeft;
      const y =
        event.clientY - rectRef.current.y + cursorPanel.current.scrollTop;

      updateMyPresence({
        cursor: {
          x: Math.round(x),
          y: Math.round(y),
        },
      });
    };

    const removeCursor = () => {
      updateMyPresence({
        cursor: null,
      });
    };

    cursorPanel.current.addEventListener("pointermove", updateCursor);
    cursorPanel.current.addEventListener("pointerleave", removeCursor);

    const oldRef = cursorPanel.current;
    return () => {
      if (!oldRef) {
        return;
      }
      oldRef.removeEventListener("pointermove", updateCursor);
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
            y={other.cursor.y}
          />
        );
      })}
    </>
  );
};

export default Cursors;
