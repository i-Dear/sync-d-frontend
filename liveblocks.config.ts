import {
  LiveList,
  LiveMap,
  LiveObject,
  Lson,
  createClient,
} from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { liveblocks, WithLiveblocks } from "@liveblocks/zustand";
import { Color, Layer, Point, Process, Template, UserInfo } from "@/lib/types";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from "reactflow";
import { create } from "zustand";
import nodes from "@/lib/nodes";
import edges from "@/lib/edges";

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
};

// Optionally, Storage represents the shared document that persists in the
// Room, even after all Users leave. Fields under Storage typically are
// LiveList, LiveMap, LiveObject instances, for which updates are
// automatically persisted and synced to all connected clients.
export type MusicStates = "playing" | "seeking" | "paused";

export type ActiveUserInfo = UserInfo & {
  enteredAt: number;
};

type FlowState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
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
  nodes: FlowState["nodes"] | any;
  edges: FlowState["edges"] | any;
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

const generateUniqueEdgeId = (source: string | null, target: string | null) => {
  return `reactflow__edge-${source}-${target}-${Math.random().toString(36).substr(2, 9)}`;
};

// Optionally, the type of custom events broadcasted and listened for in this
// room. Must be JSON-serializable.
// type RoomEvent = {};
export const useFlowStore = create<WithLiveblocks<FlowState, {}>>()(
  liveblocks(
    (set, get) => ({
      // Initial values for nodes and edges
      nodes,
      edges,

      // Apply changes to React Flow when the flowchart is interacted with
      onNodesChange: (changes: NodeChange[]) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      onConnect: (connection: Connection) => {
        set({
          edges: addEdge(connection, get().edges),
        });
      },
    }),
    {
      // Add Liveblocks client
      client,

      // Define the store properties that should be shared in real-time
      storageMapping: {
        nodes: true,
        edges: true,
      },
    },
  ),
);

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
} = createRoomContext<Presence, Storage, UserMeta /* RoomEvent */>(client);
