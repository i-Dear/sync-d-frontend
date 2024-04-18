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
        groupCall: new LiveObject({
          roomId: "",
          activeUsers: new LiveList(),
        }),
        music: new LiveObject({
          musicState: "paused",
          musicTime: 0,
          musicIndex: 0,
        }),
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList(),
      }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        {() => <Canvas />}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
