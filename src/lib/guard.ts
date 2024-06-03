import { NodeChange, NodePositionChange, NodeRemoveChange } from "reactflow";

export const isNodeRemoveChanges = (
  changes: NodeChange[],
): changes is NodeRemoveChange[] => {
  return changes.every((change) => change.type === "remove");
};

export const isNodePositionChanges = (
  changes: NodeChange[],
): changes is NodePositionChange[] => {
  return changes.every((change) => change.type === "position");
};
