import { Node } from "reactflow";

export default [
  {
    id: "WHAT",
    data: { label: "구체적 문제 정의" },
    type: "group",
    className: "light",
    position: { x: 100, y: 100 },
    style: {
      backgroundColor: "rgba(193,208,223,0.2)",
      width: "60rem",
      height: "50rem",
      border: "none",
    },
    draggable: false,
    selectable: false,
  },
  {
    id: "core WHAT",
    data: { label: "근본적인 문제는 무엇일까요?" },
    type: "group",
    className: "light",
    position: { x: 750, y: 100 },
    style: {
      backgroundColor: "rgba(159,211,255,0.2)",
      width: "30rem",
      height: "50rem",
      border: "none",
    },
    draggable: false,
    selectable: false,
  },
  {
    id: "annotation-1",
    type: "annotation",
    draggable: false,
    selectable: false,
    data: {
      level: 1,
      label:
        "이전 단계에서 우리가 탐구한 각 페르소나의 문제 상황을 정리해보세요 !",
      arrowStyle: {
        transform: "rotate(-50deg) translate(0.5rem, -0.5rem)",
      },
    },
    position: { x: 100, y: 30 },
  },
  {
    id: "annotation-2",
    type: "annotation",
    draggable: false,
    selectable: false,
    data: {
      level: 2,
      label:
        "2분간, 간결하고 명확하게 작성하여 공유해주세요! 모든건 익명이니까 우리, 눈치보지마요 👀",
    },
    position: { x: 100, y: 50 },
  },
  {
    id: "annotation-3",
    type: "annotation",
    draggable: false,
    selectable: false,
    data: {
      level: 3,
      label:
        "파악된 근본 문제들을 모두 읽어보고, 모두가 공감할 수 있었던 문제 최대 5가지✨를 골라서 여기에 옮겨주세요 !",
      arrowStyle: {
        transform: "rotate(-50deg) translate(0.5rem, -0.5rem)",
      },
    },
    position: { x: 760, y: 35 },
  },
] as Node[];
