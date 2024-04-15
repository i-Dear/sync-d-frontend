"use client";

import { RoomProvider } from "~/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/lib/types";
import { Loading } from "./Loading";
import Canvas from "./Canvas";

interface RoomProps {
  roomId: string;
}

const Room = ({ roomId }: RoomProps) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        selection: [],
        cursor: null,
        pencilDraft: null,
        penColor: null,
        currentProcess: 1,
      }}
      initialStorage={{
        music: new LiveObject({
          musicState: "paused",
          musicTime: 0,
          musicIndex: 0,
        }),
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList(),
        person: new LiveObject({ name: "Marie", age: 30 }),
        timer: new LiveObject({ timerState: false, currentTime: 180, defaultTime: 180 }),
      }}>
      <ClientSideSuspense fallback={<Loading />}>{() => <Canvas />}</ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
