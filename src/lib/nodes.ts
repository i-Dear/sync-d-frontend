import { Node } from "reactflow";

export default [
  {
    id: "WHAT",
    data: {
      label: "WHAT's the matter?",
      description: [
        "겪고있는 문제 상황을 명료하게 정리할 수록,",
        "더 다양한 관점에서 해결책을 찾을 수 있어요! 그래서, 뭐가 문제야?🙄",
      ],
    },
    type: "areaNode",
    position: { x: 100, y: 100 },
    style: {
      backgroundColor: "rgba(193,208,223,0.2)",
      width: "50rem",
      height: "50rem",
      border: "none",
    },
    draggable: false,
    selectable: false,
  },
  {
    id: "core WHAT",
    data: {
      label: "WHAT's the topic?",
      description: [
        "파악된 문제들을 모두 읽어보고,",
        "모두가 공감했던 문제 최대 5가지✨를 골라서 여기로 옮겨주세요!",
      ],
    },
    type: "areaNode",
    position: { x: 700, y: 100 },
    style: {
      backgroundColor: "rgba(159,211,255,0.2)",
      width: "35rem",
      height: "50rem",
      border: "none",
    },
    draggable: false,
    selectable: false,
  },
  {
    id: "WHY",
    data: {
      label: "WHY is it happening?",
      description: [
        "문제의 원인은 굉장히 다양할 수 있어요🤔",
        "한 가지 시각에 갇히지 말고, 다양한 관점에서 생각해보세요!",
        "TMI) 영국의 한 박물관의 부식 원인은 산성비가 아닌 야간 조명을 따라온 벌레들을 먹는 새들의 배설물이었대요! 너무 밝았던 야간 조명이 박물관을 부식시키고 있었던 거죠 💡🐛🐦💩",
      ],
    },
    type: "areaNode",
    position: { x: 1150, y: 100 },
    style: {
      backgroundColor: "rgba(255,221,43,0.2)",
      width: "50rem",
      height: "50rem",
      border: "none",
    },
    draggable: false,
    selectable: false,
  },
  {
    id: "HOW",
    data: {
      label: "HOW to solve it?",
      description: [
        "근본 원인을 해결할 방법을 마구마구🔥 써주세요 !",
        "1. 평가하지 않기!",
        "2. 능력, 시간, 비용 등을 고려하지 않기!",
      ],
    },
    type: "areaNode",
    position: { x: 1750, y: 100 },
    style: {
      backgroundColor: "rgba(253,142,189,0.2)",
      width: "35rem",
      height: "50rem",
      border: "none",
    },
    draggable: false,
    selectable: false,
  },
  {
    id: "rootNode",
    type: "pageNode",
    position: { x: 650, y: 1690 },
    data: { label: "메인 페이지" },
    dragHandle: ".dragHandle",
  },
  {
    id: "annotation-1",
    type: "annotation",
    draggable: false,
    selectable: false,
    data: {
      label:
        "이전 단계에서 우리가 탐구한 각 페르소나의 문제 상황을 정리해보세요!\n2분간, 간결하고 명확하게 작성하여 공유해주세요! 모든건 익명이니까 우리, 눈치보지마요 👀",
      arrowStyle: {
        transform: "rotate(-50deg) translate(0.5rem, -0.5rem)",
      },
    },
    position: { x: 100, y: 35 },
  },
  {
    id: "annotation-2",
    type: "annotation",
    draggable: false,
    selectable: false,
    data: {
      label:
        "우리 서비스에는 어떠한 페이지들이 있을까요? \n또 각 페이지들은 어떤 기능들을 가지고 있을까요? \n좌측 상단 도움말을 눌러 예시 이미지를 참고해 여러분 서비스의 Tree를 그려주세요!",
      font: "text-lg",
    },
    position: { x: 100, y: 1710 },
  },
] as Node[];
