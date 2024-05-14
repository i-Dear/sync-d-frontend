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
} from "reactflow";
import "reactflow/dist/style.css";
import StakeholderNode from "./StakeholderNode";

import Sidebar from "./Sidebar";

import { useMutation, useStorage } from "~/liveblocks.config";
import ColorSelector from "./ColorSelector";

let id = 0;
const getId = () => `node_${id++}`;

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const nodeTypes = {
  stakeholder: StakeholderNode,
};

const DnDFlow = () => {
  const nodes = useStorage((root) => root.nodes);
  const edges = useStorage((root) => root.edges);
  const [nodeBorderColor, setNodeBorderColor] = useState("#121417");
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

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
        style: {
          border: `2px solid ${nodeBorderColor}`,
          background: "#fff",
          color: "#121417",
          width: 200,
        },
      };

      addNode(newNode);
    },
    [reactFlowInstance, nodeBorderColor, addNode],
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
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Controls />
          </ReactFlow>
          <ColorSelector
            nodeBorderColor={nodeBorderColor}
            setNodeBorderColor={setNodeBorderColor}
          />
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
