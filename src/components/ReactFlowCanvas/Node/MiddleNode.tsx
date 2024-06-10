import { SerializableNode } from "@/lib/types";
import { deserializeNode } from "@/lib/utils";
import React, { memo } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Handle, NodeProps, Position } from "reactflow";
import { useMutation, useStorage } from "~/liveblocks.config";

const MiddleNode = ({ id, data }: NodeProps) => {
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

  const handleLabelChange = (e: ContentEditableEvent) => {
    const newLabel = e.target.value;
    onChangeNodeValue(id, newLabel);
  };

  return (
    <div
      className="relative flex min-h-[1.8rem] min-w-[12.8rem] items-center justify-center rounded-[0.3rem] border-[0.1rem] bg-white p-[1rem] scrollbar-hide"
      style={{
        borderColor: data.color,
      }}
    >
      <Handle
        style={{ background: data.color }}
        position={Position.Left}
        type="target"
        isConnectableStart={false}
      />

      <Handle
        position={Position.Right}
        style={{ background: data.color }}
        type="source"
      />

      <ContentEditable
        html={node.data?.label || ""}
        className="flex w-full items-center justify-center text-[1.2rem] font-normal text-black outline-none"
        onChange={handleLabelChange}
      />

      <div className="absolute left-[0.5rem] top-[0.5rem] flex items-center gap-[0.8rem]">
        <span
          className="dragHandle h-[0.75rem] w-[0.75rem] rounded-full"
          style={{
            background: data.color,
          }}
        />
      </div>
    </div>
  );
};

export default memo(MiddleNode);
