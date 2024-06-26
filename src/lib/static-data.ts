import { Process } from "./types";

export const steps: Process[] = [
  {
    step: 1,
    title: "아이스 브레이킹",
    description: "서로의 이름과 강점, 약점를 소개해보세요.",
    camera: { x: 0, y: 0 },
    done: false,
  },
  {
    step: 2,
    title: "팀 목표 설정",
    description: "프로젝트의 참여 목적을 공유해보세요.",
    camera: { x: 0, y: -1000 },
    done: false,
  },
  {
    step: 3,
    title: "문제 상황 발표 & 투표",
    description: "각자의 주제를 발표해보세요.",
    camera: { x: 0, y: -2000 },
    done: false,
  },
  {
    step: 4,
    title: "페르소나 작성",
    description: "페르소나를 작성해보세요.",
    camera: { x: 0, y: -3000 },
    done: false,
  },
  {
    step: 5,
    title: "문제 정의 (WHAT)",
    description: "문제를 정의해보세요.",
    camera: { x: 0, y: -4000 },
    done: false,
  },
  {
    step: 6,
    title: "원인 정의 (WHY)",
    description: "원인을 정의해보세요.",
    camera: { x: 0, y: -5000 },
    done: false,
  },
  {
    step: 7,
    title: "솔루션 탐색 (HOW)",
    description: "해결 방안을 탐색해보세요.",
    camera: { x: 0, y: -6000 },
    done: false,
  },
  {
    step: 8,
    title: "서비스 가치 결정",
    description: "Pain Points와 Value를 선정해보세요.",
    camera: { x: 0, y: -7000 },
    done: false,
  },
  {
    step: 9,
    title: "비즈니스 모델 작성",
    description: "비즈니스 모델을 작성해보세요.",
    camera: { x: 0, y: -8000 },
    done: false,
  },
  {
    step: 10,
    title: "유저 시나리오 작성",
    description: "이해관계자 별 시나리오를 작성해보세요.",
    camera: { x: 0, y: -9000 },
    done: false,
  },
  {
    step: 11,
    title: "유저 스토리 작성",
    description: "Epic과 User Story를 작성해보세요.",
    camera: { x: 0, y: -10000 },
    done: false,
  },
  {
    step: 12,
    title: "메뉴 트리 작성",
    description: "메뉴 트리를 작성해보세요.",
    camera: { x: 0, y: -11000 },
    done: false,
  },
];
