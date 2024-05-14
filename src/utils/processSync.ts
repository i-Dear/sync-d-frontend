import {
  Template,
  TemplateType,
  InputFormBoxTemplate,
  UserStory,
} from "@/lib/types";
import { Epic } from "@/lib/types";
import { LiveList } from "@liveblocks/client";

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

export const addEpicTemplate = (
  templates: LiveList<Template>,
  epic: Epic,
  idx: number,
) => {
  templates.push({
    id: `${parseInt(epic.id) + 1100}`,
    type: TemplateType.EpicBox,
    length: epic.userStories.length,
    title: epic.name,
    x:
      idx < 4
        ? 50 + (parseInt(epic.id) - 1) * 400
        : 50 + (parseInt(epic.id) - 5) * 400,
    y: idx < 4 ? 10100 : 10600,
    fill: "#369EFF",
    width: 400,
  });
};

export const addUserStoryTemplate = (
  templates: LiveList<Template>,
  epic: Epic,
  epidx: number,
  userStory: UserStory,
  idx: number,
) => {
  templates.push({
    id: `${parseInt(epic.id) * 100 + 1100 + userStory.id}`,
    type: TemplateType.EpicBox,
    length: 1,
    title: userStory.name,
    x:
      epidx < 4
        ? 50 + (parseInt(epic.id) - 1) * 400
        : 50 + (parseInt(epic.id) - 5) * 400,
    y: epidx < 4 ? 10100 + userStory.id * 60 : 10600 + userStory.id * 60,
    width: 400,
    height: 50,
    fill: "#A5D0F9",
    font: 8,
  });
};