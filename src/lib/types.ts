import { LsonObject } from "@liveblocks/client";
import {
  CoordinateExtent,
  EdgeUpdatable,
  NodeHandleBounds,
  Position,
} from "reactflow";

export type NavListType = {
  title: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export type MenuType = {
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
};

export type Process = {
  step: number;
  title: string;
  description: string;
  camera: { x: number; y: number };
  done: boolean;
};

export type ProjectInfo = {
  name: string;
  id: string;
  projectImg: string;
  description: string;
  lastModifiedDate: string;
  progress: number;
  role: string;
  userEmails: string[];
};

export type UserInfo = {
  id: string;
  name: string;
  avatar: string;
  email: string;
};

export type Color = {
  r: number;
  g: number;
  b: number;
};

export enum LayerType {
  Rectangle,
  Ellipse,
  Path,
  Text,
  Note,
  Sticker,
  Epic,
  Persona,
  Vote,
}

export type Camera = {
  x: number;
  y: number;
};

export type Layer =
  | RectangleLayer
  | EllipseLayer
  | PathLayer
  | TextLayer
  | NoteLayer
  | StickerLayer
  | EpicLayer
  | PersonaLayer
  | VoteLayer;

export type RectangleLayer = {
  type: LayerType.Rectangle;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
  title?: string;
};

export type EllipseLayer = {
  type: LayerType.Ellipse;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
  title?: string;
};

export type NoteLayer = {
  type: LayerType.Note;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value: string;
  title?: string;
};

export type PathLayer = {
  type: LayerType.Path;
  x: number;
  y: number;
  // Could be computed based on points
  height: number;
  // Could be computed based on points
  width: number;
  fill: Color;
  points: number[][];
  value?: string;
  title?: string;
};

export type TextLayer = {
  type: LayerType.Text;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value: string;
  title?: string;
};

export type StickerLayer = {
  type: LayerType.Sticker;
  x: number;
  y: number;
  height: number;
  width: number;
  stickerSrc: string;
  fill: Color;
  value?: string;
  title?: string;
};

export type EpicLayer = {
  type: LayerType.Epic;
  x: number;
  y: number;
  length: number;
  width: number;
  height: number;
  title?: string;
  value: UserStory[];
  fill?: Color;
};

export type PersonaLayer = {
  type: LayerType.Persona;
  x: number;
  y: number;
  height: number;
  width: number;
  fill?: string;
  title?: string;
  value: PersonaContent[];
};

export type PersonaContent = {
  title: string;
  value: string;
};

export type VoteLayer = {
  type: LayerType.Vote;
  x: number;
  y: number;
  width: number;
  height: number;
  value?: string;
  fill?: string;
  title?: string;
  number: number;
};

export type Point = {
  x: number;
  y: number;
};

export type XYWH = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type CanvasState =
  | {
      mode: CanvasMode.None;
    }
  | {
      mode: CanvasMode.SelectionNet;
      origin: Point;
      current?: Point;
    }
  | {
      mode: CanvasMode.Translating;
      current: Point;
    }
  | {
      mode: CanvasMode.Inserting;
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note
        | LayerType.Sticker;
    }
  | {
      mode: CanvasMode.Pencil;
    }
  | {
      mode: CanvasMode.Pressing;
      origin: Point;
    }
  | {
      mode: CanvasMode.Resizing;
      initialBounds: XYWH;
      corner: Side;
    };

export enum CanvasMode {
  None, // Default canvas mode. Nothing is happening.
  Pressing, // When the user's pointer is pressed
  SelectionNet, // When the user is selecting multiple layers at once
  Translating, // When the user is moving layers
  Inserting, // When the user is going to insert a new layer
  Resizing, // When the user is resizing a layer
  Pencil, // When the user is drawing a path
}

export enum TemplateType {
  NoteBox,
  GuideTextBox,
  InputFormBox,
  VoteBox,
  EpicBox,
  PersonaBox,
}

export type Template =
  | NoteBoxTemplate
  | GuideTextBoxTemplate
  | InputFormBoxTemplate
  | VoteBoxTemplate
  | EpicBoxTemplate
  | PersonaBoxTemplate;

export type NoteBoxTemplate = {
  type: TemplateType.NoteBox;
  id: string;
  title?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  fill?: string;
};

export type GuideTextBoxTemplate = {
  type: TemplateType.GuideTextBox;
  id: string;
  title?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  fill?: string;
  font?: number;
  fontWeight?: string;
};

export type InputFormBoxTemplate = {
  type: TemplateType.InputFormBox;
  id: string;
  title?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  font?: number;
  fontWeight?: string;
  value?: string;
};

export type VoteBoxTemplate = {
  type: TemplateType.VoteBox;
  id: string;
  title?: string;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: string;
  value: number;
};

export type PersonaBoxTemplate = {
  type: TemplateType.PersonaBox;
  id: string;
  title?: string;
  x: number;
  y: number;
  height: number;
  width: number;
  fill?: string;
  value: PersonaContent[];
};

export type EpicBoxTemplate = {
  type: TemplateType.EpicBox;
  id: string;
  title?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
};

export type UserStory = {
  id: number;
  name: string;
};

export type Epic = {
  id: string;
  name: string;
  userStories: UserStory[];
};

// LsonObject를 확장한 SerializableNode 타입 정의
export type SerializableNode = LsonObject & {
  id: string;
  position: { x: number; y: number };
  data: any;
  type?: string;
  style?: string;
  className?: string;
  sourcePosition?: Position;
  targetPosition?: Position;
  hidden?: boolean;
  selected?: boolean;
  dragging?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
  deletable?: boolean;
  dragHandle?: string;
  width?: number | null;
  height?: number | null;
  parentNode?: string;
  parentId?: string;
  zIndex?: number;
  extent?: "parent" | CoordinateExtent;
  expandParent?: boolean;
  positionAbsolute?: { x: number; y: number };
  ariaLabel?: string;
  focusable?: boolean;
  resizing?: boolean;
  internalsSymbol?: {
    z?: number;
    handleBounds?: NodeHandleBounds;
    isParent?: boolean;
  };
};
export type Persona = {
  info: string;
  personality: string;
  detail: string;
};

export type Core = {
  coreTarget: string;
  coreProblem: string;
  coreCause: string;
  solution: string;
  coreValue: string;
};

export type SyncedData = Epic[] | Persona[] | Core | string;
