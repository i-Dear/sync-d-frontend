"use client";

import { RoomProvider, useMyPresence } from "../liveblocks.config";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef } from "react";
import { ClientSideSuspense } from "@liveblocks/react";
import { Room } from "./_commons/Room";
import LiveCursors from "./_commons/LiveCursors";
import { LiveObject } from "@liveblocks/client";
import Whiteboard from "../src";

// export default function Index() {
//   const roomId = useOverrideRoomId("nextjs-live-cursors-advanced");

//   return (
//     <RoomProvider
//       id={roomId}
//       /**
//        * Initialize the cursor position to null when joining the room
//        */
//       initialPresence={{
//         cursor: null,
//       }}
//       initialStorage={{
//         person: new LiveObject({ name: "Marie", age: 30 }),
//       }}
//     >
//       <ClientSideSuspense fallback={<div>Loading…</div>}>
//         {() => <Room />}
//       </ClientSideSuspense>
//     </RoomProvider>
//   );
// }

export default function Home() {
  return (
    <main>
      <Whiteboard />
    </main>
  );
}

/**
 * This function is used when deploying an example on liveblocks.io.
 * You can ignore it completely if you run the example locally.
 */
function useOverrideRoomId(roomId: string) {
  const searchParams = useSearchParams();
  const queryRoomId = searchParams.get("roomId");

  const overrideRoomId = useMemo(() => {
    return queryRoomId ? `${roomId}-${queryRoomId}` : roomId;
  }, [queryRoomId, roomId]);

  return overrideRoomId;
}
