import { SerializableNode } from "@/lib/types";
import { deserializeNode, serializeNode } from "@/lib/utils";
import { memo } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Handle, Node, NodeProps, Position } from "reactflow";
import { useMutation, useStorage } from "~/liveblocks.config";

const ContentNode = ({ id, data }: NodeProps) => {
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
    <div className="relative flex h-[4.8rem] min-w-[12.8rem] items-center justify-center rounded-[1.2rem] border-[0.1rem] bg-light-gray-100 p-[1rem] scrollbar-hide">
      <Handle
        position={Position.Left}
        className="invisible"
        style={{ background: data.color }}
        type="target"
      />
      <ContentEditable
        className="pointer-events-auto flex w-full items-center justify-start p-[1rem]  pl-[2.5rem] text-[1.4rem] font-normal text-div-text outline-none"
        html={node?.data?.label || ""}
        style={{ color: data.color }}
        onChange={handleLabelChange}
      />
      <div className="absolute left-[1rem] top-[1rem] flex items-center gap-[0.8rem]">
        <span className="dragHandle h-[1.25rem] w-[1.25rem] rounded-full bg-div-text" />
      </div>
    </div>
  );
};

export default memo(ContentNode);
