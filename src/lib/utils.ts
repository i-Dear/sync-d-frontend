import { type ClassValue, clsx } from "clsx";
import {
  Color,
  Side,
  EllipseLayer,
  Layer,
  LayerType,
  Point,
  XYWH,
  PathLayer,
  Camera,
  SerializableNode,
} from "./types";
import { twMerge } from "tailwind-merge";
import { Node } from "reactflow";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g
    .toString(16)
    .padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}

export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };

  if ((corner & Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  if ((corner & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }

  if ((corner & Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  if ((corner & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
}

export function findIntersectingLayerWithPoint(
  layerIds: string[],
  layers: Map<string, Layer>,
  point: Point,
) {
  for (let i = layerIds.length - 1; i >= 0; i--) {
    const layerId = layerIds[i];
    const layer = layers.get(layerId);
    if (layer && isHittingLayer(layer, point)) {
      return layerId;
    }
  }

  return null;
}

export function isHittingLayer(layer: Layer, point: Point) {
  switch (layer.type) {
    case LayerType.Ellipse:
      return isHittingEllipse(layer, point);
    // TODO: Implement path hit testing instead of using Rectangle hit box
    case LayerType.Path:
    case LayerType.Rectangle:
      return isHittingRectangle(layer, point);
    default:
      return false;
  }
}

export function isHittingRectangle(layer: XYWH, point: Point) {
  return (
    point.x > layer.x &&
    point.x < layer.x + layer.width &&
    point.y > layer.y &&
    point.y < layer.y + layer.height
  );
}

export function isHittingEllipse(layer: EllipseLayer, point: Point) {
  const rx = layer.width / 2;
  const ry = layer.height / 2;
  const cx = layer.x + layer.width / 2;
  const cy = layer.y + layer.height / 2;

  const result =
    Math.pow(point.x - cx, 2) / Math.pow(rx, 2) +
    Math.pow(point.y - cy, 2) / Math.pow(ry, 2);

  return result <= 1;
}

/**
 * TODO: Implement ellipse and path / selection net collision
 */
export function findIntersectingLayersWithRectangle(
  layerIds: readonly string[],
  layers: ReadonlyMap<string, Layer>,
  a: Point,
  b: Point,
) {
  const rect = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };

  const ids = [];

  for (const layerId of layerIds) {
    const layer = layers.get(layerId);
    if (layer == null) {
      continue;
    }

    const { x, y, height, width } = layer;
    if (
      rect.x + rect.width > x &&
      rect.x < x + width &&
      rect.y + rect.height > y &&
      rect.y < y + height
    ) {
      ids.push(layerId);
    }
  }

  return ids;
}

export function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"],
  );

  d.push("Z");
  return d.join(" ");
}

export function penPointsToPathLayer(
  points: number[][],
  color: Color,
): PathLayer {
  if (points.length < 2) {
    throw new Error("Can't transform points with less than 2 points");
  }

  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;
    if (left > x) {
      left = x;
    }
    if (top > y) {
      top = y;
    }
    if (right < x) {
      right = x;
    }
    if (bottom < y) {
      bottom = y;
    }
  }

  return {
    type: LayerType.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    points: points.map(([x, y, pressure]) => [x - left, y - top, pressure]),
  };
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera,
): Point {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y - 48,
  };
}

export function formatDuration(joinedAt: number) {
  const duration = Date.now() - joinedAt;
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return `${String(hours).padStart(2, "0")}h 
  ${String(minutes % 60).padStart(2, "0")}m 
  ${String(seconds % 60).padStart(2, "0")}s`;
}

export const formatTimeToMinSec = (seconds: number): [string, string] => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return [
    `${remainingSeconds < 10 ? "0" : ""}${minutes}`,
    `${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`,
  ];
};

// Node를 SerializableNode로 변환하는 함수
export const serializeNode = (node: Node): SerializableNode => {
  return {
    ...node,
    style: JSON.stringify(node.style), // CSSProperties를 문자열로 변환
    position: { x: node.position.x, y: node.position.y },
    positionAbsolute: node.positionAbsolute
      ? { x: node.positionAbsolute.x, y: node.positionAbsolute.y }
      : undefined,
    sourcePosition: node.sourcePosition,
    targetPosition: node.targetPosition,
  };
};

// SerializableNode를 Node로 변환하는 함수
export const deserializeNode = (serializableNode: SerializableNode): Node => {
  return {
    ...serializableNode,
    style: serializableNode?.style
      ? JSON.parse(serializableNode.style)
      : undefined,
    position: {
      x: serializableNode?.position.x,
      y: serializableNode?.position.y,
    },
    positionAbsolute: serializableNode?.positionAbsolute
      ? {
          x: serializableNode.positionAbsolute.x,
          y: serializableNode.positionAbsolute.y,
        }
      : undefined,
  };
};

export const convertDataUrlToBlob = (dataUrl: string) => {
  const byteString = atob(dataUrl.split(",")[1]);
  const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
};

export const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

export const extractPosition = (
  event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
): {
  x: number;
  y: number;
} => {
  if ("touches" in event && event.touches.length > 0) {
    return { x: event.touches[0].clientX, y: event.touches[0].clientY };
  } else if ("clientX" in event) {
    return { x: event.clientX, y: event.clientY };
  }
  return { x: 0, y: 0 };
};
