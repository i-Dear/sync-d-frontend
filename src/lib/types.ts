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
  description: string;
  role: string;
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
  ThirdStepProb,
  EpicBox,
  PersonaBox,
}

export type Template =
  | NoteBoxTemplate
  | GuideTextBoxTemplate
  | InputFormBoxTemplate
  | ThirdStepProbTemplate
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

export type ThirdStepProbTemplate = {
  type: TemplateType.ThirdStepProb;
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
