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
  Panel,
  getNodesBounds,
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
import { toPng } from "html-to-image";
import { LiveObject } from "@liveblocks/client";
import { serializeNode } from "@/lib/utils";
import { SerializableNode } from "@/lib/types";
import useNodes from "@/lib/useNodes";
import {
  isNodeDimensionChanges,
  isNodePositionChanges,
  isNodeRemoveChanges,
} from "@/lib/guard";

type Viewport = { x: number; y: number; zoom: number };

const StepViewport: Record<number, Viewport> = {
  5: { x: 0, y: 0, zoom: 1 },
  6: { x: -600, y: 0, zoom: 1 },
  7: { x: -1050, y: 0, zoom: 1 },
  9: { x: 0, y: -1000, zoom: 1 },
  12: { x: 0, y: -2000, zoom: 0.9 },
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
      const newNode = new LiveObject(serializeNode(node));

      liveNodes.set(node.id, newNode as LiveObject<SerializableNode>);
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
      if (!connectingNodeId.current) return;
      const sourceNodeType = liveNodeMap.get(connectingNodeId.current)?.type;

      // 허공에 연결했을 때만 새로운 노드 생성
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane && sourceNodeType !== "stakeholderNode") {
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
            label: `${previousNodeData.label}`,
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
      const liveNodeMap = storage.get("nodes");

      // 유발한 Node의 변경이 전부 position일 때 (이동만 발생했을 때)
      if (isNodePositionChanges(changes) || isNodeDimensionChanges(changes)) {
        const changedNodes = applyNodeChanges(changes, nodes);
        changedNodes.forEach((node) => {
          storage.get("nodes").get(node.id)?.update(serializeNode(node));
        });
        return;
      }

      // 유발한 Node의 변경이 전부 remove일 때
      if (isNodeRemoveChanges(changes)) {
        changes.forEach((change) => {
          liveNodeMap.delete(change.id);
        });
        return;
      }

      // 그 외 복합적인 모든 경우
      const changedNodes = applyNodeChanges(changes, nodes);
      const remainingNodeIds = changedNodes.map((node) => node.id);

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
    if (storage.get("nodes")) {
      Array.from(storage.get("nodes").keys()).forEach((key) => {
        storage.get("nodes").delete(key);
      });

      initialNodes.forEach((node) => {
        storage.get("nodes").set(node.id, new LiveObject(serializeNode(node)));
      });
      storage.set("edges", []);
    }
  }, []);

  const downloadImage = (dataUrl: string) => {
    const a = document.createElement("a");

    a.href = dataUrl;
    a.download = "reactflow.png";
    a.click();
  };

  const handleCapture = () => {
    const nodes = reactFlow.getNodes();
    const whatHowWhyNodes = nodes.filter(
      (node) =>
        node.type === "input" ||
        node.type === "areaNode" ||
        node.type === "middleNode",
    );
    const bounds = getNodesBounds(whatHowWhyNodes);

    reactFlow.setViewport({
      x: 0,
      y: 0,
      zoom: 1,
    });

    setTimeout(() => {
      toPng(document.querySelector(".react-flow__viewport") as HTMLElement, {
        backgroundColor: "#ffffff",
        width: bounds.width + 150,
        height: bounds.height + 150,
        canvasWidth: bounds.width + 150,
        canvasHeight: bounds.height + 150,
      }).then((dataUrl) => {
        const blobData = convertDataUrlToBlob(dataUrl);
        console.log("Image Captured", blobData);
        sendBlobToBackend(blobData);
        downloadImage(dataUrl);
      });
    }, 2000);
  };

  const convertDataUrlToBlob = (dataUrl: string) => {
    const byteString = atob(dataUrl.split(",")[1]);
    const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  const sendBlobToBackend = (blob: Blob) => {
    const formData = new FormData();
    formData.append("name", "이미지 테스트 중");
    formData.append("description", "이미지 테스트 중");
    formData.append("img", blob, "reactflow.png"); // 파일 이름 추가
    formData.append("userEmails", "");

    fetch("https://syncd-backend.dev.i-dear.org/v1/project/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully sent image to backend", data);
      })
      .catch((error) => {
        console.error("Error sending image to backend", error);
      });
  };
  useEffect(() => {
    if (nodes.length === 0) {
      init();
    }
  }, []);

  // useEffect(() => {
  //   init();
  // }, []);

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
        <Panel position="top-left">
          <button
            className="download-btn h-[20rem] w-[20rem] bg-primary"
            onClick={handleCapture}
          >
            Download Image
          </button>
        </Panel>
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
