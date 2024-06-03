import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Controls,
  Connection,
  ReactFlowInstance,
  NodeChange,
  Node,
  applyNodeChanges,
  applyEdgeChanges,
  EdgeChange,
  MarkerType,
  useReactFlow,
  PanOnScrollMode,
  Edge,
} from "reactflow";

import { useMutation, useStorage } from "~/liveblocks.config";
import FloatingEdge from "./FloatingEdge";
import StakeholderConnectionLine from "./StakeholderConnectionLine";
import StakeholderNode from "./Node/StakeholderNode";

import "reactflow/dist/style.css";
import "./style.css";
import { nanoid } from "nanoid";
import NodeCreator from "./NodeCreator";
import FloatingArrowLabelEdge from "./FloatingArrowLabelEdge";
import InputForWhat from "./InputForWhat";
import initialNodes from "@/lib/nodes";
import MiddleNode from "./Node/MiddleNode";
import AnnotationNode from "./Node/AnnotationNode";
import PageNode from "./Node/PageNode";
import ContentNode from "./Node/ContentNode";
import AreaNode from "./Node/AreaNode";
import { LiveObject } from "@liveblocks/client";
import { deserializeNode, serializeNode } from "@/lib/utils";
import { SerializableNode } from "@/lib/types";
import useNodes from "@/lib/useNodes";

type Viewport = { x: number; y: number; zoom: number };

const StepViewport: Record<number, Viewport> = {
  5: { x: 0, y: 0, zoom: 1 },
  6: { x: -600, y: 0, zoom: 1 },
  7: { x: -1050, y: 0, zoom: 1 },
  9: { x: 0, y: -1000, zoom: 1 },
  12: { x: 0, y: -1500, zoom: 0.9 },
};

const connectionLineStyle = {
  strokeWidth: 2,
  stroke: "gray",
};

const nodeTypes = {
  stakeholderNode: StakeholderNode,
  middleNode: MiddleNode,
  annotation: AnnotationNode,
  pageNode: PageNode,
  contentNode: ContentNode,
  areaNode: AreaNode,
};

const edgeTypes = {
  floating: FloatingEdge,
  "floating-label-arrow": FloatingArrowLabelEdge,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 1, stroke: "gray" },
  type: "default",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "gray",
  },
};

const Flow = ({ currentProcess }: { currentProcess: number }) => {
  const connectingNodeId = useRef<string | null>(null);
  const liveNodeMap = useStorage((root) => root.nodes);
  // liveNodeMap에서 Node 리스트만 따로 빼서 비직렬화 (reactFlow에서 보여줄 Nodes)
  const nodes = useNodes();
  const edges = useStorage((root) => root.edges);
  const [nodeColor, setNodeColor] = useState("#121417");
  const reactFlow = useReactFlow();

  reactFlow.setViewport(StepViewport[currentProcess]);

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  const addNode = useMutation(
    ({ storage }, node: Node) => {
      const liveNodes = storage.get("nodes");
      const nodeId = nanoid();
      const newNode = new LiveObject(serializeNode(node));
      liveNodes.set(nodeId, newNode as LiveObject<SerializableNode>);
    },
    [nodes],
  );

  const onConnect = useMutation(
    ({ storage }, connection: Connection | Edge) => {
      const existingEdges = storage.get("edges");
      if (!connection.source || !connection.target) return;

      const sourceNode = storage
        .get("nodes")
        .get(connection.source)
        ?.toObject();
      if (!sourceNode) return;

      if (sourceNode.type === "stakeholderNode") {
        const valueEdge = {
          ...connection,
          type: "floating-label-arrow",
          id: nanoid(),
          data: {
            endLabel: "Value",
          },
        };
        storage.set("edges", addEdge(valueEdge, storage.get("edges")));
        connectingNodeId.current = null;
        return;
      }
      storage.set("edges", addEdge(connection, existingEdges));
      connectingNodeId.current = null;
    },
    [edges],
  );

  const onConnectStart = useCallback(
    (_: any, { nodeId }: { nodeId: string | null }) => {
      connectingNodeId.current = nodeId;
    },
    [nodes],
  );

  const onConnectEnd = useCallback(
    (event: any) => {
      // 노드끼리 연결했을 때는 무시 -> 가치 엣지 생성
      if (!connectingNodeId.current) return;

      // 허공에 연결했을 때만 새로운 노드 생성
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        const id = nanoid();

        if (!reactFlowInstance) {
          return;
        }

        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        const previousNodeData = liveNodeMap.get(
          connectingNodeId.current,
        )?.data;

        const newNode = {
          id,
          position,
          type: "middleNode",
          data: {
            label: `From ${previousNodeData.label}`,
            color: previousNodeData.color,
          },
          origin: [0.5, 0.0],
          dragHandle: ".dragHandle",
        };

        addNode(newNode);

        onConnect({
          source: connectingNodeId.current,
          target: id,
          style: { stroke: previousNodeData.color },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: previousNodeData.color,
          },
          type: "default",
          id: nanoid(),
        });
      }
    },
    [reactFlowInstance, nodes],
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      if (!reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const id = nanoid();
      const newNode = {
        id,
        type,
        position,
        data: {
          label: "New Node",
          color: nodeColor,
        },
        dragHandle: ".dragHandle",
      };

      addNode(newNode);
    },
    [reactFlowInstance, nodeColor, addNode],
  );

  const onNodesChange = useMutation(
    ({ storage }, changes: NodeChange[]) => {
      const changedNodes = applyNodeChanges(changes, nodes);
      const remainingNodeIds = changedNodes.map((node) => node.id);
      const liveNodeMap = storage.get("nodes");

      // liveNodeMap의 key에서 changedNodes에 속하지 않는 key를 삭제
      liveNodeMap.forEach((_, key) => {
        // Storage에 저장되어 있던 노드 중, 업데이트 후 노드 목록에 속하지 않는 노드는 삭제
        if (!remainingNodeIds.includes(key)) {
          liveNodeMap.delete(key);
        }
      });

      // changedNodes를 liveNodeMap에 업데이트
      changedNodes.forEach((node) => {
        liveNodeMap.get(node.id)?.update(serializeNode(node));
      });
    },
    [nodes],
  );

  const onEdgesChange = useMutation(
    ({ storage }, changes: EdgeChange[]) => {
      storage.set("edges", applyEdgeChanges(changes, edges));
    },
    [edges],
  );

  const init = useMutation(({ storage }) => {
    initialNodes.forEach((node) => {
      storage.get("nodes").set(node.id, new LiveObject(serializeNode(node)));
    });
    storage.set("edges", []);
  }, []);

  useEffect(() => {
    if (nodes.length === 0) {
      init();
    }
  }, []);

  return (
    <div className="h-full w-full grow" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onInit={setReactFlowInstance}
        onDragOver={onDragOver}
        onDrop={onDrop}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineComponent={StakeholderConnectionLine}
        connectionLineStyle={connectionLineStyle}
        panOnDrag={false}
        panOnScroll={true}
        panOnScrollMode={PanOnScrollMode.Horizontal}
      >
        <Controls />
      </ReactFlow>
      {currentProcess === 9 && (
        <NodeCreator nodeColor={nodeColor} setNodeColor={setNodeColor} />
      )}
      {currentProcess === 5 && <InputForWhat addWhatNode={addNode} />}
    </div>
  );
};

const ReactFlowCanvas = (props: { currentProcess: number }) => {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  );
};

export default ReactFlowCanvas;
