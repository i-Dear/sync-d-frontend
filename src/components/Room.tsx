"use client";

import { RoomProvider } from "~/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer, Template, Epic, SerializableNode } from "@/lib/types";
import { Loading } from "./Loading";
import Canvas from "./Canvas";
import { steps } from "@/lib/static-data";
import { syncTemplates } from "@/lib/templates";

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
        isSynced: false,
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
        timer: new LiveObject({
          timerState: false,
          currentTime: 0,
          defaultTime: 0,
        }),
        process: new LiveList(steps),
        templates: new LiveList<Template>(syncTemplates),
        nodes: new LiveMap<string, LiveObject<SerializableNode>>(),
        edges: [],
        voteList: new LiveObject({
          voteCount: new LiveObject({
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
          }),
          totalCount: 0,
          voteMap: new LiveList([false, false, false, false, false]),
        }),
        syncCount: 0,
        epics: new LiveList<Epic>(),
      }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        {() => <Canvas />}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
