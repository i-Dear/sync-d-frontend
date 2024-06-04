import { SerializableNode } from "@/lib/types";
import { deserializeNode } from "@/lib/utils";
import React, { memo } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Handle, NodeProps, Position, useStore } from "reactflow";
import { useMutation, useStorage } from "~/liveblocks.config";

const connectionNodeIdSelector = (state: any) => state.connectionNodeId;

const StakeholderNode = ({ id, data }: NodeProps) => {
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const node = deserializeNode(
    useStorage((root) => root.nodes).get(id) as SerializableNode,
  );

  const onChangeNodeValue = useMutation(
    ({ storage }, nodeId: string, newLabel: string) => {
      const currentNode = storage.get("nodes").get(nodeId);
      if (currentNode) {
        currentNode.update({
          id: nodeId,
          data: {
            label: newLabel,
            color: currentNode.toObject().data.color,
          },
        });
      }
    },
    [],
  );

  const isConnecting = !!connectionNodeId;
  const isTarget = connectionNodeId && connectionNodeId !== id;

  const handleLabelChange = (e: ContentEditableEvent) => {
    const newLabel = e.target.value;
    onChangeNodeValue(id, newLabel);
  };

  return (
    <div
      className="relative flex h-[5.6rem] w-[15.2rem] items-center justify-center overflow-hidden rounded-[1.2rem] border-[0.1rem] border-black bg-white font-semibold shadow-md"
      style={{
        borderColor: data.color,
        borderStyle: isTarget ? "dashed" : "solid",
      }}
    >
      {!isConnecting && (
        <Handle
          className="customHandle"
          style={{ background: data.color }}
          position={Position.Right}
          type="source"
        />
      )}

      <Handle
        className="customHandle"
        position={Position.Right}
        style={{ background: data.color }}
        type="target"
        isConnectableStart={false}
      />
      <ContentEditable
        className=" flex h-full w-full items-center justify-center p-[1rem] text-[1.4rem] text-black outline-none"
        html={node.data?.label || ""}
        style={{ color: data.color }}
        onChange={handleLabelChange}
      />

      <div className="absolute left-[1rem] top-[1rem] flex items-center gap-[0.8rem]">
        <span
          style={{ background: data.color }}
          className="dragHandle h-[1.25rem] w-[1.25rem] rounded-full "
        />
      </div>

      {isTarget && (
        <span
          style={{ color: data.color }}
          className="absolute right-[1.3rem] top-[0.4rem] text-[0.8rem] font-normal opacity-60"
        >
          Connect here →
        </span>
      )}
    </div>
  );
};

export default memo(StakeholderNode);
