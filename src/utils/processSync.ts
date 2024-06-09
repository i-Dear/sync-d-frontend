import {
  Template,
  TemplateType,
  InputFormBoxTemplate,
  UserStory,
  LayerType,
} from "@/lib/types";
import { Epic, Layer } from "@/lib/types";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { useStorage } from "~/liveblocks.config";
import { nanoid } from "nanoid";
import { SyncedData } from "@/lib/types";
interface ResponseData {
  epics: Epic[];
}

export const fetchScenario = async (
  roomId: String,
  templates: Template[],
): Promise<Epic[]> => {
  const scenario = templates.filter(
    (scenario) =>
      parseInt(scenario.id) >= 1000 &&
      parseInt(scenario.id) < 2000 &&
      scenario.type === TemplateType.InputFormBox,
  ) as InputFormBoxTemplate[];

  const data = scenario.map((v) => v.value);

  try {
    const result = await fetch(
      "https://syncd-backend.dev.i-dear.org/v1/project/userstory",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          projectId: roomId,
          scenario: data,
        }),
      },
    );

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    const response: ResponseData = await result.json();
    const { epics } = response;
    return epics;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

export const addEpicLayer = (
  layers: LiveMap<string, LiveObject<Layer>>,
  epic: Epic,
  idx: number,
  liveLayerIds: LiveList<string>,
) => {
  // const layerId = `${parseInt(epic.id) + 1100}`;
  const layerId = nanoid();
  const epicLayer = new LiveObject<Layer>({
    type: LayerType.Epic,
    length: epic.userStories.length,
    title: epic.name,
    value: epic.userStories,
    height: 0,
    x:
      idx < 3
        ? 450 + (parseInt(epic.id) - 1) * 400
        : 50 + (parseInt(epic.id) - 4) * 400,
    y: idx < 3 ? 10100 : 10600,

    width: 380,
  });
  liveLayerIds.push(layerId);
  layers.set(layerId, epicLayer);
};

export const fetchSyncedData = async (
  id: string,
  data: SyncedData,
  projectStage: number,
) => {
  const formData = new FormData();
  formData.append("projectStage", JSON.stringify(projectStage));
  formData.append("projectId", id);
  if (projectStage === 3) {
    console.log("data", data);
    formData.append("problem", JSON.stringify(data));
  }
  if (projectStage === 4) {
    console.log("data", data);
    formData.append("personaInfos", JSON.stringify(data));
  }
  if (projectStage === 8) {
    console.log("data", data);
    formData.append("coreDetails", JSON.stringify(data));
  }
  if (projectStage === 11) {
    console.log("data", data);
    formData.append("epics", JSON.stringify(data));
  }
  try {
    const response = await fetch(
      "https://syncd-backend.dev.i-dear.org/v1/project/sync",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      },
    );
    console.log("response", response);
  } catch (error) {
    console.log("error", error);
  }
};
