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
  {
    id: "10",
    type: TemplateType.GuideTextBox,
    title:
      "무슨 말이라도 좋아요 ! 팀원들이 서로를 잘 알고 편안한 감정을 가질 수록 팀 전체의 문제 해결 능력이 향상된다는 연구 결과가 있어요😃",
    x: 250,
    y: 0,
    width: 200,
    height: 50,
    fill: "#FFFFFF",
  },
  {
    id: "11",
    type: TemplateType.GuideTextBox,
    title:
      "사람은 모든 면에서 완벽할 수 없어요. 부끄러워하지 않아도 괜찮아요 ! 서로의 강점과 약점을 공유하는 시간을 가져봐요😉",
    x: 200,
    y: 250,
    width: 200,
    height: 50,
    fill: "#FFFFFF",
  },
  {
    id: "12",
    type: TemplateType.GuideTextBox,
    title:
      "프로젝트를 시작하기 앞서, 팀원들에게 이것만은 솔직하게 부탁하고 싶어요!",
    x: 200,
    y: 500,
    width: 200,
    height: 50,
    fill: "#FFFFFF",
  },
];
