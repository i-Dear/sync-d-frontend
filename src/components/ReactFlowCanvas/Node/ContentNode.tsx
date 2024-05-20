import { memo } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Handle, Node, Position } from "reactflow";
import { useMutation, useStorage } from "~/liveblocks.config";

const ContentNode = ({ id, data }: { id: string; data: Node["data"] }) => {
  const node = useStorage((root) => root.nodes).find(
    (node: Node) => node.id === id,
  );

  const forceNodeChange = useMutation(({ storage }) => {
    storage.set("nodes", [...storage.get("nodes")]);
  }, []);

  const onChangeNodeValue = useMutation(
    ({ storage }, nodeId: string, newLabel: string) => {
      const node = storage
        .get("nodes")
        .find((node: Node) => node.id === nodeId);
      node.data.label = newLabel;
      forceNodeChange(); // 작성 중에도 실시간 업데이트
    },
    [],
  );
  const handleLabelChange = (e: ContentEditableEvent) => {
    const newLabel = e.target.value;
    onChangeNodeValue(id, newLabel);
  };

  return (
    <div>
      <Handle
        position={Position.Left}
        className="invisible"
        style={{ background: data.color }}
        type="target"
      />
      <ContentEditable
        className="pointer-events-auto flex h-[4.8rem] w-[12.8rem] items-center justify-center rounded-[1.2rem] bg-light-gray-100 p-[1rem] text-[1.4rem] font-normal text-div-text outline-none"
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
