import React, { FC, useCallback, useState } from "react";
import {
  EdgeProps,
  EdgeLabelRenderer,
  BaseEdge,
  getStraightPath,
  useStore,
  Edge,
} from "reactflow";
import EdgeLabel from "./EdgeLabel";
import { edgeLabelTranslate, getEdgeParams } from "@/lib/flow-utils";
import { useMutation, useStorage } from "~/liveblocks.config";
import { ContentEditableEvent } from "react-contenteditable";

const FloatingArrowLabelEdge: FC<EdgeProps> = ({
  id,
  source,
  target,
  data,
  markerEnd,
  style,
}) => {
  const edgeLabel =
    useStorage((root) => root.edges).find((edge: Edge) => edge.id === id)?.data
      ?.endLabel || "";

  const forceEdgeChange = useMutation(({ storage }) => {
    storage.set("edges", [...storage.get("edges")]);
  }, []);

  const onChangeEdgeValue = useMutation(
    ({ storage }, edgeId: string, newLabel: string) => {
      const edge = storage
        .get("edges")
        .find((edge: Edge) => edge.id === edgeId);
      edge.data.endLabel = newLabel;
      forceEdgeChange(); // 작성 중에도 실시간으로 업데이트
    },
    [],
  );

  const handleLabelChange = (e: ContentEditableEvent) => {
    const newLabel = e.target.value;
    onChangeEdgeValue(id, newLabel);
  };

  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source]),
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target]),
  );
  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  const [edgePath] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });

  const isTargetHigher = ty < sy;
  const isTargetLeft = tx < sx;

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
      <div className="z-500">
        <EdgeLabelRenderer>
          {data.endLabel && (
            <EdgeLabel
              transform={`${edgeLabelTranslate(isTargetHigher, isTargetLeft)} translate(${tx}px,${ty}px)`}
              label={edgeLabel}
              handleLabelChange={handleLabelChange}
            />
          )}
        </EdgeLabelRenderer>
      </div>
    </>
  );
};

export default FloatingArrowLabelEdge;
