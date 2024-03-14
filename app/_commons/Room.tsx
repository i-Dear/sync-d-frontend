import {
  useMyPresence,
  useBroadcastEvent,
  useEventListener,
  useStorage,
  useMutation,
} from "@/liveblocks.config";
import { useRef } from "react";
import LiveCursors from "./LiveCursors";

interface EventProps {
  type: string;
  message: string;
}

export function Room() {
  const [myPresence, updateMyPresence] = useMyPresence();
  const cursorPanel = useRef(null);
  const broadcast = useBroadcastEvent();
  const person = useStorage((root) => root.person);

  useEventListener(({ event, user, connectionId }) => {
    const typedEvent = event as { type: string; message: string };

    if (typedEvent.type === "TOAST") {
      alert(`event from ${user?.info.name}, ` + typedEvent.message);
    }
  });

  function handlePointerMove(e: any) {
    const cursor = { x: Math.floor(e.clientX), y: Math.floor(e.clientY) };
    updateMyPresence({ cursor });
  }

  function handlePointerLeave(e: any) {
    updateMyPresence({ cursor: null });
  }

  const updateName = useMutation(({ storage }, newName: string) => {
    const person = storage.get("person");
    person.set("name", newName);
  }, []);

  return (
    <main
      ref={cursorPanel}
      style={{ width: "100vw", height: "100vh" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      Cursor: {JSON.stringify(myPresence.cursor)}
      <LiveCursors cursorPanel={cursorPanel} />
      <div className="text-xl m-4 text-center">
        {myPresence.cursor
          ? `${myPresence.cursor.x} × ${myPresence.cursor.y}`
          : "Move your cursor to broadcast its position to other people in the room."}
      </div>
      <button
        onClick={() => {
          // Broadcast toast event
          broadcast({
            type: "TOAST",
            message: "Event received!",
          } as unknown as never);
        }}
      >
        Broadcast event
      </button>
      <hr />
      <input
        type="text"
        value={person.name}
        onChange={(e) => updateName(e.target.value)}
      />
    </main>
  );
}
