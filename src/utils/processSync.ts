import { Template, TemplateType, InputFormBoxTemplate } from "@/lib/types";
import { Epic } from "@/lib/types";
import { useMutation } from "~/liveblocks.config";

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
