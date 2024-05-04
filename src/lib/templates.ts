import { Template, TemplateType } from "./types";

export const syncTemplates: Template[] = [
  {
    id: "1",
    type: TemplateType.NoteBox,
    title: "60초 자기소개 Time !",
    x: 200,
    y: 50,
    width: 800,
    height: 200,
    fill: "#FFF0C8",
  },
  {
    id: "2",
    type: TemplateType.NoteBox,
    title: "제 강점과 약점은요,",
    x: 200,
    y: 300,
    width: 800,
    height: 200,
    fill: "#C8FFD1",
  },
  {
    id: "3",
    type: TemplateType.NoteBox,
    title: "이것만은 부탁해요!",
    x: 200,
    y: 550,
    width: 800,
    height: 200,
    fill: "#C8F5FF",
  },
];
