import { SerializableNode } from "@/lib/types";
import { deserializeNode, serializeNode } from "@/lib/utils";
import { LiveObject } from "@liveblocks/client";
import { nanoid } from "nanoid";
import { memo, useCallback } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import {
  Connection,
  Edge,
  Handle,
  MarkerType,
  Node,
  NodeProps,
  NodeToolbar,
  Position,
  XYPosition,
  addEdge,
} from "reactflow";
import { useMutation, useStorage } from "~/liveblocks.config";
import PlusMarkIcon from "~/public/PlusMark";

const PageNode = ({ id, data }: NodeProps) => {
  const nodes = useStorage((root) => root.nodes);
  const edges = useStorage((root) => root.edges);
  const node = deserializeNode(
    useStorage((root) => root.nodes).get(id) as SerializableNode,
  );

  const contentNodeEdges = edges.filter(
    (edge: Edge) => edge.source === id && edge.target.includes("contentNode"),
  ).length;

  const pageNodeEdges = edges.filter(
    (edge: Edge) => edge.source === id && edge.target.includes("pageNode"),
  ).length;

  const additionalContentNodeXYPosition: XYPosition = {
    x: node ? node.position.x + 150 : 0,
    y: node ? node.position.y + contentNodeEdges * 60 : 0,
  };

  /**
   * Page Layer 좌표 계산 함수
   * @param x
   * @returns
   */
  function computeX(x: number) {
    let magnitude = 300 * Math.floor((x + 1) / 2);
    let sign = x % 2 === 0 ? -1 : 1; // Even x values are negative, odd are positive
    return sign * magnitude;
  }

  const additionalPageNodeXYPosition: XYPosition = {
    x: node ? node.position.x + computeX(pageNodeEdges) : 0,
    y: node ? node.position.y + 200 : 0,
  };

  const addNode = useMutation(
    ({ storage }, node: Node) => {
      const liveNodes = storage.get("nodes");
      const nodeId = nanoid();

      const newNode = new LiveObject(serializeNode(node));
      liveNodes.set(nodeId, newNode as LiveObject<SerializableNode>);
      storage.set;
    },
    [nodes],
  );

  const onChangeNodeValue = useMutation(
    ({ storage }, nodeId: string, newLabel: string) => {
      const currentNode = storage.get("nodes").get(nodeId);
      if (currentNode) {
        currentNode.update({
          label: newLabel,
        });
      }
    },
    [],
  );

  const handleLabelChange = (e: ContentEditableEvent) => {
    const newLabel = e.target.value;
    onChangeNodeValue(id, newLabel);
  };

  const onConnect = useMutation(
    ({ storage }, connection: Connection | Edge) => {
      const existingEdges = storage.get("edges");
      storage.set("edges", addEdge(connection, existingEdges));
    },
    [edges],
  );

  const handleContentButton = useCallback(
    (event: any) => {
      const newId = `contentNode-${nanoid()}`;
      const position = additionalContentNodeXYPosition;
      const newNode = {
        id: newId,
        position,
        type: "contentNode",
        data: {
          label: `기능`,
        },
        origin: [0.5, 0.0],
        dragHandle: ".dragHandle",
      };

      addNode(newNode);

      onConnect({
        source: id,
        target: newId,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        type: "default",
        id: nanoid(),
      });
    },

    [nodes],
  );

  const handlePageButton = useCallback(
    (event: any) => {
      const newId = `pageNode-${nanoid()}`;
      const position = additionalPageNodeXYPosition;
      const newNode = {
        id: newId,
        position,
        type: "pageNode",
        data: {
          label: `페이지`,
        },
        origin: [0.5, 0.0],
        dragHandle: ".dragHandle",
      };

      addNode(newNode);

      onConnect({
        source: id,
        target: newId,
        sourceHandle: "bottomHandle",
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        type: "default",
        id: nanoid(),
      });
    },
    [nodes],
  );

  return (
    <>
      <Handle position={Position.Right} className="invisible" type="source" />
      <Handle
        position={Position.Bottom}
        className="invisible"
        type="source"
        id="bottomHandle"
      />
      <Handle position={Position.Top} className="invisible" type="target" />

      <NodeToolbar position={Position.Right}>
        <button
          className="flex min-h-8 min-w-8 items-center justify-center rounded-full bg-light-gray-100  shadow-sm"
          onClick={handleContentButton}
        >
          <PlusMarkIcon fill="black" width={12} height={12} />
        </button>
      </NodeToolbar>
      <NodeToolbar position={Position.Bottom}>
        <button
          className="flex min-h-8 min-w-8 items-center justify-center rounded-full bg-light-gray-100  shadow-sm"
          onClick={handlePageButton}
        >
          <PlusMarkIcon fill="black" width={12} height={12} />
        </button>
      </NodeToolbar>
      <ContentEditable
        className="pointer-events-auto flex h-[4.8rem] w-[12.8rem]  items-center justify-center rounded-[1.2rem] bg-primary p-[1rem] text-[1.4rem] font-semibold text-white outline-none"
        html={node?.data?.label || ""}
        style={{ color: data.color }}
        onChange={handleLabelChange}
      />
      <div className="absolute left-[1rem] top-[1rem] flex items-center gap-[0.8rem]">
        <span className="dragHandle h-[1.25rem] w-[1.25rem] rounded-full bg-white" />
      </div>
    </>
  );
};

export default memo(PageNode);
