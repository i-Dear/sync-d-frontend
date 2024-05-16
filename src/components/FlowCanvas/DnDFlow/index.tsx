import React, { useState, useRef, useCallback } from "react";
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
} from "reactflow";

import { useMutation, useStorage } from "~/liveblocks.config";
import FloatingEdge from "./FloatingEdge";
import StakeholderConnectionLine from "./StakeholderConnectionLine";
import StakeholderNode from "./StakeholderNode";

import "reactflow/dist/style.css";
import "./style.css";
import { nanoid } from "nanoid";
import NodeCreator from "./NodeCreator";
import FloatingArrowLabelEdge from "./FloatingArrowLabelEdge";


const defaultViewport = { x: 0, y: 0, zoom: 1 };

const connectionLineStyle = {
  strokeWidth: 3,
  stroke: "black",
};

const nodeTypes = {
  stakeholderNode: StakeholderNode,
};

const edgeTypes = {
  floating: FloatingEdge,
  "floating-label-arrow": FloatingArrowLabelEdge,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: "gray" },
  type: "floating-label-arrow",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "gray",
  },
  data: {
    endLabel: "가치",
  },
};

const DnDFlow = () => {
  const nodes = useStorage((root) => root.nodes);
  const edges = useStorage((root) => root.edges);
  const [nodeColor, setNodeColor] = useState("#121417");

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  const onConnect = useMutation(
    ({ storage }, connection: Connection) => {
      const existingEdges = storage.get("edges");
      storage.set("edges", addEdge(connection, existingEdges));
    },
    [edges],
  );

  const addNode = useMutation(
    ({ storage }, node: Node) => {
      const existingNodes = storage.get("nodes");
      storage.set("nodes", [...existingNodes, node]);
    },
    [nodes],
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
      storage.set("nodes", applyNodeChanges(changes, nodes));
    },
    [nodes],
  );

  const onEdgesChange = useMutation(
    ({ storage }, changes: EdgeChange[]) => {
      storage.set("edges", applyEdgeChanges(changes, edges));
    },
    [edges],
  );

  return (
    <div className="flex h-full w-full grow flex-col">
      <ReactFlowProvider>
        <div className="h-full w-full grow" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            defaultViewport={defaultViewport}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onInit={setReactFlowInstance}
            onDragOver={onDragOver}
            onDrop={onDrop}
            defaultEdgeOptions={defaultEdgeOptions}
            connectionLineComponent={StakeholderConnectionLine}
            connectionLineStyle={connectionLineStyle}
            panOnDrag={false}
          >
            <Controls />
          </ReactFlow>
        </div>
        <NodeCreator nodeColor={nodeColor} setNodeColor={setNodeColor} />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
