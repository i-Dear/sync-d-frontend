import React from "react";
import PencilButton from "./PencilButton";
import RectangleButton from "./RectangleButton";
import EllipseButton from "./EllipseButton";
import UndoButton from "./UndoButton";
import RedoButton from "./RedoButton";
import SelectionButton from "./SelectionButton";
import { CanvasMode, LayerType, CanvasState } from "@/lib/types";
import TextButton from "./TextButton";
import NoteButton from "./NoteButton";

type Props = {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

export default function ToolsBar({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
}: Props) {
  return (
    <div className="absolute bottom-6 right-0 left-0 flex items-center justify-center">
      <div className="shadow-popup rounded-xl bg-surface-panel flex items-center justify-center">
        <div className="flex items-center justify-center p-3">
          <SelectionButton
            isActive={
              canvasState.mode === CanvasMode.None ||
              canvasState.mode === CanvasMode.Translating ||
              canvasState.mode === CanvasMode.SelectionNet ||
              canvasState.mode === CanvasMode.Pressing ||
              canvasState.mode === CanvasMode.Resizing
            }
            onClick={() => setCanvasState({ mode: CanvasMode.None })}
          />

          <PencilButton
            isActive={canvasState.mode === CanvasMode.Pencil}
            onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
          />
          <TextButton
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Text
            }
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                layerType: LayerType.Text,
              })
            }
          />
          <RectangleButton
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Rectangle
            }
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                layerType: LayerType.Rectangle,
              })
            }
          />
          <EllipseButton
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Ellipse
            }
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                layerType: LayerType.Ellipse,
              })
            }
          />
          <NoteButton
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Note
            }
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                layerType: LayerType.Note,
              })
            }
          />
        </div>
        <div className="w-[1px] bg-black bg-opacity-10 self-stretch"></div>
        <div className="flex items-center justify-center p-3">
          <UndoButton onClick={undo} disabled={!canUndo} />
          <RedoButton onClick={redo} disabled={!canRedo} />
        </div>
      </div>
    </div>
  );
}
