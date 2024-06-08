import { useSelf, useMutation, useStorage } from "~/liveblocks.config";
import { InputFormBoxTemplate, PersonaContent, Process } from "@/lib/types";
import { Input } from "postcss";
type Persona = {
  info: string;
  personality: string;
  detail: string;
};

type Core = {
  coreTarget: string;
  coreProblem: string;
  coreCause: string;
  solution: string;
  coreValue: string;
};
const useSyncedData = () => {
  return useMutation(({ storage, setMyPresence }) => {
    const layerIds = storage.get("layerIds");
    const layers = storage.get("layers");
    const process = storage.get("process");
    const latestUndoneProcess = process.find(
      (process) => !process.done,
    ) as Process;
    const step = latestUndoneProcess?.step;
    const personaData = [] as Persona[];
    const coreData = {
      coreTarget: "",
      coreProblem: "",
      coreCause: "",
      solution: "",
      coreValue: "",
    } as Core;

    if (step === 4) {
      //문제의식
    } else if (step === 5) {
      //페르소나 단계
      const personas = layerIds
        .map((id) => layers.get(id))
        .filter((v) => v?.get("type") === 7);
      personas.map((persona) => {
        const value = persona?.get("value") as PersonaContent[];
        value &&
          personaData.push({
            info: value[0].value,
            personality: value[1].value,
            detail: value[2].value,
          });
      });
      console.log(personaData);
    } else if (step === 9) {
      //결정 단계가 끝나면
      const templates = storage.get("templates").toArray();
      const coreTarget = templates.find(
        (v) => v.id === "805",
      ) as InputFormBoxTemplate;
      const coreProblem = templates.find(
        (v) => v.id === "807",
      ) as InputFormBoxTemplate;
      const coreCause = templates.find(
        (v) => v.id === "809",
      ) as InputFormBoxTemplate;
      const solution = templates.find(
        (v) => v.id === "811",
      ) as InputFormBoxTemplate;
      const coreValue = templates.find(
        (v) => v.id === "813",
      ) as InputFormBoxTemplate;
      console.log(
        coreTarget.value,
        coreProblem.value,
        coreCause.value,
        solution.value,
        coreValue.value,
      );
    } else if (step === 12) {
      // 유저스토리 단계가 끝나면
    } else {
    }
  }, []);
};

export default useSyncedData;
