import {
  LiveList,
  LiveMap,
  LiveObject,
  createClient,
} from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import {
  Color,
  Layer,
  Point,
  Process,
  Template,
  UserInfo,
  Epic,
  SerializableNode,
} from "@/lib/types";

const client = createClient({
  authEndpoint: async () => {
    const response = await fetch(
      "https://syncd-backend.i-dear.org/v1/room/auth",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      },
    );

    return await response.json();
  },
  throttle: 16,
});

// Presence represents the properties that will exist on every User in the Room
// and that will automatically be kept in sync. Accessible through the
// `user.presence` property. Must be JSON-serializable.
type Presence = {
  selection: string[];
  cursor: Point | null;
  pencilDraft: [x: number, y: number, pressure: number][] | null;
  penColor: Color | null;
  currentProcess: number;
  isSynced: boolean;
};

export type MusicStates = "playing" | "seeking" | "paused";

export type ActiveUserInfo = UserInfo & {
  enteredAt: number;
};

type Storage = {
  timer: LiveObject<{
    timerState: boolean;
    currentTime: number;
    defaultTime: number;
  }>;
  music: LiveObject<{
    musicState: MusicStates;
    musicTime: number;
    musicIndex: number;
  }>;
  groupCall: LiveObject<{
    roomId: string;
    activeUsers: LiveList<ActiveUserInfo>;
  }>;
  layers: LiveMap<string, LiveObject<Layer>>;
  layerIds: LiveList<string>;
  templates: LiveList<Template>;
  process: LiveList<Process>;
  nodes: LiveMap<string, LiveObject<SerializableNode>>;
  edges: any;
  voteList: LiveObject<{
    voteCount: LiveObject<{
      "1": number;
      "2": number;
      "3": number;
      "4": number;
      "5": number;
    }>;
    totalCount: number;
    voteMap: LiveList<boolean>;
  }>;
  syncCount: number;
  epics: LiveList<Epic>;
};

// Optionally, UserMeta represents static/readonly metadata on each User, as
// provided by your own custom auth backend (if used). Useful for data that
// will not change during a session, like a User's name or avatar.
export type UserMeta = {
  info: {
    name: string;
    color: [string, string];
    avatar?: string;
  };
};

// Event types
export type RoomEvent = {
  type:
    | "SCENARIO_MODAL_ON"
    | "SCENARIO_MODAL_OFF"
    | "ALL_SYNCED"
    | "TIMER_END"
    | "VOTE_COMPLETED"
    | "LAST_PROCESS_COMPLETED";
  message: string;
};

export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useObject,
    useMap,
    useList,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);
