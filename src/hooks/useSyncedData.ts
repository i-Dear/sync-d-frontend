import { useMutation, useRoom } from "~/liveblocks.config";
import { InputFormBoxTemplate, PersonaContent, Process } from "@/lib/types";
import {
  UserStory,
  Epic,
  Persona,
  SyncedData,
  Core,
  VoteLayer,
} from "@/lib/types";
import { use, useState } from "react";
import { fetchSyncedData } from "@/utils/processSync";
import useCountVoteResult from "./useCountVoteResult";
const useSyncedData = () => {
  const [syncedData, setSyncedData] = useState<SyncedData>();
  const { id } = useRoom();
  const voteResult = useCountVoteResult();
  return useMutation(
    ({ storage }) => {
      const layerIds = storage.get("layerIds");
      const layers = storage.get("layers");
      const process = storage.get("process");
      const latestUndoneProcess = process.find(
        (process) => !process.done,
      ) as Process;
      const step = latestUndoneProcess?.step;

      if (step === 3) {
        //문제의식
        const { winningVote } = voteResult();
        console.log(winningVote, "이긴 표 ");
        const voteList = layerIds
          .map((id) => layers.get(id))
          .filter((v) => v?.get("type") === 8);
        voteList.map((v) => {
          const vote = v?.toObject() as VoteLayer;
          if (`${vote.number + 1}` === winningVote) {
            const voteData = vote.title as string;
            fetchSyncedData(id, voteData, 3);
            return;
          }
        });
      } else if (step === 4) {
        //페르소나 단계
        const personaData = [] as Persona[];
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
        fetchSyncedData(id, personaData, 4);
      } else if (step === 8) {
        //결정 단계가 끝나면
        const coreData = {
          coreTarget: "",
          coreProblem: "",
          coreCause: "",
          solution: "",
          coreValue: "",
        } as Core;
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
        (coreData.coreTarget = coreTarget.value as string),
          (coreData.coreProblem = coreProblem.value as string),
          (coreData.coreCause = coreCause.value as string),
          (coreData.solution = solution.value as string),
          (coreData.coreValue = coreValue.value as string);
        setSyncedData(coreData);
        fetchSyncedData(id, coreData, 8);
      } else if (step === 11) {
        const epicData = [] as Epic[];
        const epics = layerIds
          .map((id) => layers.get(id))
          .filter((v) => v?.get("type") === 6);
        epics.map((epic, index) => {
          const name = epic?.get("title") as string;
          const epicId = `${index + 1}`;
          const values = epic?.get("value") as UserStory[];
          epicData.push({
            id: epicId,
            name: name,
            userStories: values,
          });
        });
        setSyncedData(epicData);
        fetchSyncedData(id, epicData, 11);
      } else {
      }

      // fetchSyncedData(id, syncedData as SyncedData, step);
    },
    [syncedData],
  );
};

export default useSyncedData;
