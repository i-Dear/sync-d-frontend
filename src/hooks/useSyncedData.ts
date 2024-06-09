import { useMutation, useRoom } from "~/liveblocks.config";
import { InputFormBoxTemplate, PersonaContent, Process } from "@/lib/types";
import {
  UserStory,
  Epic,
  PersonaInfo,
  SyncedData,
  CoreDetail,
  VoteLayer,
} from "@/lib/types";
import { updateProgress } from "@/lib/data";
import useCountVoteResult from "./useCountVoteResult";
import useGetAuthToken from "./useGetAuthToken";

const useSyncedData = (authToken: string) => {
  const { id } = useRoom();
  const voteResult = useCountVoteResult();
  return useMutation(({ storage }) => {
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
      const voteList = layerIds
        .map((id) => layers.get(id))
        .filter((v) => v?.get("type") === 8);
      voteList.map((v) => {
        const vote = v?.toObject() as VoteLayer;
        if (`${vote.number + 1}` === winningVote) {
          const voteData = vote.title as string;
          updateProgress(
            authToken,
            id,
            3,
            voteData as string,
            undefined,
            undefined,
            undefined,
          );
          return;
        }
        return;
      });
    } else if (step === 4) {
      //페르소나 단계
      console.log("4단계 입장");
      const personaData = [] as PersonaInfo[];
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
      console.log(personaData, "페르소나 데이터");
      // fetchSyncedData(id, personaData, 4);
      updateProgress(authToken, id, 4, undefined, personaData as PersonaInfo[]);
    } else if (step === 8) {
      //결정 단계가 끝나면
      const coreData = {
        coreTarget: "",
        coreProblem: "",
        coreCause: "",
        solution: "",
        coreValue: "",
      } as CoreDetail;
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

      // fetchSyncedData(id, coreData, 8);
      console.log(coreData, "코어 데이터");
      updateProgress(
        authToken,
        id,
        8,
        undefined,
        undefined,
        undefined,
        coreData as CoreDetail,
      );
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

      // fetchSyncedData(id, epicData, 11);
      updateProgress(
        authToken,
        id,
        11,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        epicData as Epic[],
      );
    } else {
    }

    // fetchSyncedData(id, syncedData as SyncedData, step);
  }, []);
};

export default useSyncedData;
