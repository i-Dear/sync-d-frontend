import { Node } from "reactflow";

export default [
  {
    id: "1",
    type: "input",
    data: { label: "광고주" },
    position: { x: 250, y: 25 },
  },
  {
    id: "2",
    data: { label: "syncD" },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    data: { label: "팀 리더" },
    position: { x: 250, y: 225 },
    style: { borderColor: "#FF0072" },
  },
  {
    id: "4",
    type: "output",
    data: { label: "팀 멤버" },
    position: { x: 100, y: 325 },
    style: { borderColor: "#944DFA" },
  },
] as Node[];
