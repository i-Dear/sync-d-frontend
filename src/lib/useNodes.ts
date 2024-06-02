import { useMemo } from "react";
import { useStorage } from "~/liveblocks.config";
import { deserializeNode } from "@/lib/utils";
import { SerializableNode } from "./types";

// useStorage 훅을 사용하여 노드를 가져오고 캐싱
const useNodes = () => {
  const rawNodes = useStorage((root) => root.nodes);
  return useMemo(() => {
    return Array.from(rawNodes.values()).map((node) =>
      deserializeNode(node as SerializableNode),
    );
  }, [rawNodes, rawNodes.size]);
};

export default useNodes;
