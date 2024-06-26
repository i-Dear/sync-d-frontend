"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { nanoid } from "nanoid";
import {
  useMutation,
  useHistory,
  useStorage,
  useSelf,
  useOthersMapped,
  useCanUndo,
  useCanRedo,
} from "~/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import {
  Color,
  Layer,
  LayerType,
  CanvasState,
  CanvasMode,
  Camera,
  Side,
  XYWH,
  Point,
} from "@/lib/types";
import {
  cn,
  colorToCss,
  connectionIdToColor,
  findIntersectingLayersWithRectangle,
  penPointsToPathLayer,
  pointerEventToCanvasPoint,
  resizeBounds,
} from "@/lib/utils";
import SelectionBox from "./SelectionBox";
import LayerComponent from "./LayerComponent";
import SelectionTools from "./SelectionTools";
import useDisableScrollBounce from "@/hooks/useDisableScrollBounce";
import Drafts from "./Drafts";

import ToolsBar from "@/components/CanvasToolBar";
import Cursors from "./Cursors";
import useUserInfoStore from "@/store/useUserInfoStore";
import useStickerStore from "@/store/useStickerSrcStore";
import Path from "@/components/CanvasLayer/Path";
import CollabToolAside from "../Layout/CollabToolAside";
import ProcessNav from "../Layout/ProcessNav";
import useDeleteLayersBackspace from "@/hooks/useDeleteLayersBackspace";
import TemplateComponent from "./TemplateComponent";
import { syncTemplates } from "@/lib/templates";
import Modal from "@/components/Modals";
import ReactFlowCanvas from "@/components/ReactFlowCanvas";
import CanvasButton from "../CanvasToolBar/CanvasButton";
import useModalStore from "@/store/useModalStore";
const MAX_LAYERS = 500;

const Canvas = () => {
  const userInfo = useUserInfoStore();
  const layerIds = useStorage((root) => root.layerIds);
  const groupCall = useStorage((root) => root.groupCall);
  const templates = useStorage((root) => root.templates);
  const nodes = useStorage((state) => state.nodes);
  const edges = useStorage((state) => state.edges);
  const cursorPanel = useRef(null);
  const pencilDraft = useSelf((me) => me.presence.pencilDraft);
  const currentProcess = useSelf((me) => me.presence.currentProcess);

  const [canvasState, setState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 165,
    g: 208,
    b: 249,
  });
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const { stickerSrc } = useStickerStore();
  useDisableScrollBounce();
  const deleteLayersBackspace = useDeleteLayersBackspace();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "Backspace": {
          deleteLayersBackspace();
          break;
        }
        case "z": {
          if (e.ctrlKey || e.metaKey) {
            if (e.shiftKey) {
              history.redo();
            } else {
              history.undo();
            }
            break;
          }
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [deleteLayersBackspace, history]);

  /**
   * Select the layer if not already selected and start translating the selection
   */
  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }

      history.pause();
      e.stopPropagation();
      const point = pointerEventToCanvasPoint(e, camera);
      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }
      setState({ mode: CanvasMode.Translating, current: point });
    },
    [setState, camera, history, canvasState.mode],
  );

  /**
   * Start resizing the layer
   */
  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause();
      setState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner,
      });
    },
    [history],
  );

  /**
   * Insert an ellipse or a rectangle at the given position and select it
   */

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Note
        | LayerType.Text
        | LayerType.Sticker,
      position: Point,
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
        stickerSrc: stickerSrc,
      });
      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer as LiveObject<Layer>);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setState({ mode: CanvasMode.None });
    },
    [lastUsedColor, stickerSrc],
  );

  const resetTemplate = useMutation(({ storage }) => {
    const templates = storage.get("templates");
    templates.clear();
    syncTemplates.forEach((template) => {
      templates.push(template);
    });
  }, []);

  const InitTemplate = useMutation(({ storage }) => {
    const templates = storage.get("templates");
    //templates.clear(); // 이거 있으면 충돌, 없으면 삭제 단됨

    for (const template of syncTemplates) {
      const index = templates.findIndex((item) => item.id === template.id);
      // 리스트에 없는 경우에만 추가
      if (index === -1) {
        templates.push(template);
      }
    }
  }, []);

  /**
   * Transform the drawing of the current user in a layer and reset the presence to delete the draft.
   */
  const insertPath = useMutation(
    ({ storage, self, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const { pencilDraft } = self.presence;
      if (
        pencilDraft == null ||
        pencilDraft.length < 2 ||
        liveLayers.size >= MAX_LAYERS
      ) {
        setMyPresence({ pencilDraft: null });
        return;
      }

      const id = nanoid();
      liveLayers.set(
        id,
        new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColor)),
      );

      const liveLayerIds = storage.get("layerIds");
      liveLayerIds.push(id);
      setMyPresence({ pencilDraft: null });
      setState({ mode: CanvasMode.Pencil });
    },
    [lastUsedColor],
  );

  /**
   * Move selected layers on the canvas
   */
  const translateSelectedLayers = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) {
        return;
      }

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      const liveLayers = storage.get("layers");
      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);
        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }
      setState({ mode: CanvasMode.Translating, current: point });
    },
    [canvasState],
  );

  /**
   * Resize selected layer. Only resizing a single layer is allowed.
   */
  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) {
        return;
      }

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point,
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);
      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState],
  );

  const unselectLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);

  /**
   * Insert the first path point and start drawing with the pencil
   */
  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        penColor: lastUsedColor,
      });
    },
    [lastUsedColor],
  );

  /**
   * Continue the drawing and send the current draft to other users in the room
   */
  const continueDrawing = useMutation(
    ({ self, setMyPresence }, point: Point, e: React.PointerEvent) => {
      const { pencilDraft } = self.presence;
      if (
        canvasState.mode !== CanvasMode.Pencil ||
        e.buttons !== 1 ||
        pencilDraft == null
      ) {
        return;
      }

      setMyPresence({
        cursor: point,
        pencilDraft:
          pencilDraft.length === 1 &&
          pencilDraft[0][0] === point.x &&
          pencilDraft[0][1] === point.y
            ? pencilDraft
            : [...pencilDraft, [point.x, point.y, e.pressure]],
      });
    },
    [canvasState.mode],
  );

  /**
   * Start multiselection with the selection net if the pointer move enough since pressed
   */
  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    // If the distance between the pointer position and the pointer position when it was pressed
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      // Start multi selection
      setState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });
    }
  }, []);

  /**
   * Update the position of the selection net and select the layers accordingly
   */
  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get("layers").toImmutable();
      setState({
        mode: CanvasMode.SelectionNet,
        origin: origin,
        current,
      });
      const ids = findIntersectingLayersWithRectangle(
        layerIds,
        layers,
        origin,
        current,
      );
      setMyPresence({ selection: ids });
    },
    [layerIds],
  );

  const selections = useOthersMapped((other) => other.presence.selection);

  /**
   * Create a map layerId to color based on the selection of all the users in the room
   */
  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;
      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
      }
    }

    return layerIdsToColorSelection;
  }, [selections]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    // Pan the camera based on the wheel delta
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) {
        return;
      }

      if (canvasState.mode === CanvasMode.Pencil) {
        startDrawing(point, e.pressure);
        return;
      }

      setState({ origin: point, mode: CanvasMode.Pressing });
    },
    [camera, canvasState.mode, setState, startDrawing],
  );

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const current = pointerEventToCanvasPoint(e, camera);

      setMousePosition({ x: current.x, y: current.y });
      if (canvasState.mode === CanvasMode.Pressing) {
        startMultiSelection(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.SelectionNet) {
        updateSelectionNet(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayers(current);
      } else if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current);
      } else if (canvasState.mode === CanvasMode.Pencil) {
        continueDrawing(current, e);
      } else {
        setMyPresence({ cursor: current });
      }
    },
    [
      camera,
      canvasState,
      continueDrawing,
      resizeSelectedLayer,
      startMultiSelection,
      translateSelectedLayers,
      updateSelectionNet,
    ],
  );

  const onPointerLeave = useMutation(
    ({ setMyPresence }) => setMyPresence({ cursor: null }),
    [],
  );

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (
        canvasState.mode === CanvasMode.None ||
        canvasState.mode === CanvasMode.Pressing
      ) {
        unselectLayers();
        setState({
          mode: CanvasMode.None,
        });
      } else if (canvasState.mode === CanvasMode.Pencil) {
        insertPath();
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setState({
          mode: CanvasMode.None,
        });
      }
      history.resume();
    },
    [
      camera,
      canvasState,
      history,
      insertLayer,
      insertPath,
      setState,
      unselectLayers,
    ],
  );

  useEffect(() => {
    if (syncTemplates.length !== templates.length) {
      InitTemplate();
    }
  }, [InitTemplate]);

  // useEffect(() => {
  //   resetTemplate();
  // }, [resetTemplate]);
  const { isModalOpen, setModalState, setModalType } = useModalStore();

  const checkFirstVistiedStep = () => {
    if (localStorage.getItem("isFirstVisitedStep")) {
      return;
    } else {
      const isFirstVisitedStepArray = new Array(12).fill(false);
      isFirstVisitedStepArray[0] = true; // 첫 번째 값을 true로 설정

      localStorage.setItem(
        "isFirstVisitedStep",
        JSON.stringify(isFirstVisitedStepArray),
      );

      setModalState(true), setModalType("guide");
    }
  };

  checkFirstVistiedStep();

  return (
    <div>
      <CollabToolAside roomId={groupCall.roomId} />
      <ProcessNav userInfo={userInfo} setCamera={setCamera} />
      {[5, 6, 7, 9, 12].includes(currentProcess) && (
        <div className="relative h-screen w-screen bg-white">
          <ReactFlowCanvas currentProcess={currentProcess} />
        </div>
      )}
      <div
        className="relative h-full w-full touch-none bg-white"
        ref={cursorPanel}
      >
        <Cursors cursorPanel={cursorPanel} />
        <SelectionTools
          isAnimated={
            canvasState.mode !== CanvasMode.Translating &&
            canvasState.mode !== CanvasMode.Resizing
          }
          camera={camera}
          setLastUsedColor={setLastUsedColor}
        />
        <svg
          className="h-screen w-screen"
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          onPointerUp={onPointerUp}
        >
          <g
            style={{
              transform: `translate(${camera.x}px, ${camera.y}px)`,
            }}
          >
            {templates.length &&
              templates.map((template) => (
                <TemplateComponent key={template.id} template={template} />
              ))}
            {layerIds.map((layerId) => (
              <LayerComponent
                key={layerId}
                id={layerId}
                mode={canvasState.mode}
                onLayerPointerDown={onLayerPointerDown}
                selectionColor={layerIdsToColorSelection[layerId]}
              />
            ))}
            {canvasState.mode === 4 && canvasState.layerType === 4 && (
              <foreignObject
                x={mousePosition.x}
                y={mousePosition.y}
                width={100}
                height={100}
                style={{ background: "#808080", opacity: "0.5" }}
                className="shadow-grey-950 shadow-lg drop-shadow-lg"
              ></foreignObject>
            )}
            {/* Blue square that show the selection of the current users. Also contains the resize handles. */}
            <SelectionBox
              onResizeHandlePointerDown={onResizeHandlePointerDown}
            />
            {/* Selection net that appears when the user is selecting multiple layers at once */}
            {canvasState.mode === CanvasMode.SelectionNet &&
              canvasState.current != null && (
                <rect
                  className="fill-primary stroke-primary stroke-[0.5px] opacity-5"
                  x={Math.min(canvasState.origin.x, canvasState.current.x)}
                  y={Math.min(canvasState.origin.y, canvasState.current.y)}
                  width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                  height={Math.abs(
                    canvasState.origin.y - canvasState.current.y,
                  )}
                />
              )}
            <Drafts />

            {pencilDraft != null && pencilDraft.length > 0 && (
              <Path
                points={pencilDraft}
                fill={colorToCss(lastUsedColor)}
                x={0}
                y={0}
              />
            )}
          </g>
        </svg>
      </div>
      <div
        className={cn(
          "absolute bottom-[8rem] left-0 right-0 flex items-center justify-center",
          currentProcess === 5 && "bottom-[4rem]",
          currentProcess === 6 && "bottom-[4rem]",
          currentProcess === 7 && "bottom-[4rem]",
          currentProcess === 9 && "bottom-[4rem]",
          currentProcess === 12 && "bottom-[4rem]",
        )}
      >
        <CanvasButton />
      </div>
      5, 6, 7, 9, 12 단계에서는 툴바가 안보이도록 처리
      <div
        className={
          currentProcess === 5 ||
          currentProcess === 6 ||
          currentProcess === 7 ||
          currentProcess === 9 ||
          currentProcess === 12
            ? "hidden"
            : ""
        }
      >
        <ToolsBar
          canvasState={canvasState}
          setCanvasState={setState}
          undo={history.undo}
          redo={history.redo}
          canUndo={canUndo}
          canRedo={canRedo}
        />
      </div>
      <Modal setCamera={setCamera} />
    </div>
  );
};

export default Canvas;
