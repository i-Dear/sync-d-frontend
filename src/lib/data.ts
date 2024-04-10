// 일단 잠시 여기에 두고 추후 types.ts로 옮기자.
interface ProcessStep {
  step: number;
  title: string;
  description: string;
  camera: { x: number; y: number };
}

export const steps: ProcessStep[] = [
  {
    step: 1,
    title: "아이스 브레이킹",
    description: "서로의 이름과 강점, 약점를 소개해보세요.",
    camera: { x: 0, y: 0 },
  },
  {
    step: 2,
    title: "프로젝트 참여 목적 및 목표 공유",
    description: "프로젝트의 참여 목적을 공유해보세요.",
    camera: { x: 0, y: -100 },
  },
  {
    step: 3,
    title: "개인 주제 발표",
    description: "각자의 주제를 발표해보세요.",
    camera: { x: 0, y: -200 },
  },
  {
    step: 4,
    title: "페르소나 작성",
    description: "페르소나를 작성해보세요.",
    camera: { x: 0, y: -300 },
  },
  {
    step: 5,
    title: "문제 정의",
    description: "문제를 정의해보세요.",
    camera: { x: 0, y: -400 },
  },
  {
    step: 6,
    title: "원인 정의",
    description: "원인을 정의해보세요.",
    camera: { x: 0, y: -500 },
  },
  {
    step: 7,
    title: "해결 방안 탐색",
    description: "해결 방안을 탐색해보세요.",
    camera: { x: 0, y: -600 },
  },
  {
    step: 8,
    title: "Pain Points, Value 선정",
    description: "Pain Points와 Value를 선정해보세요.",
    camera: { x: 0, y: -700 },
  },
  {
    step: 9,
    title: "이해관계도 작성",
    description: "이해관계도를 작성해보세요.",
    camera: { x: 0, y: -800 },
  },
  {
    step: 10,
    title: "이해관계자 별 시나리오 작성",
    description: "이해관계자 별 시나리오를 작성해보세요.",
    camera: { x: 0, y: -900 },
  },
  {
    step: 11,
    title: "Epic, User Story 작성",
    description: "Epic과 User Story를 작성해보세요.",
    camera: { x: 0, y: -1000 },
  },
  {
    step: 12,
    title: "메뉴 트리 작성",
    description: "메뉴 트리를 작성해보세요.",
    camera: { x: 0, y: -1100 },
  },
];
