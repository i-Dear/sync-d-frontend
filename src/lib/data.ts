import { CoreDetail, EpicInfo, PersonaInfo } from "./types";

export const getUserInfo = async (token: string) => {
  try {
    const response = await fetch(
      "https://syncd-backend.dev.i-dear.org/v1/user/info",
      {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ["userInfo"],
        },
      },
    );

    if (!response.ok) {
      throw new Error("유저 정보 조회에 실패했습니다.");
    }

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("유저 정보 조회에 실패했습니다.", error);
    return null;
  }
};

export const deleteProject = async (token: string, projectId: string) => {
  try {
    const response = await fetch(
      `https://syncd-backend.dev.i-dear.org/v1/project/delete`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          projectId,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("프로젝트 삭제에 실패했습니다.");
    }

    return true;
  } catch (error) {
    console.error("프로젝트 삭제에 실패했습니다.", error);
    return false;
  }
};

export const updateProgress = async (
  token: string,
  projectId: string,
  projectStage: number,
  problem?: string,
  personaInfos?: PersonaInfo[],
  whyWhatHowImage?: Blob,
  coreDetails?: CoreDetail,
  businessModelImage?: Blob,
  epics?: EpicInfo[],
  menuTreeImage?: Blob,
) => {
  const formData = new FormData();

  formData.append("projectId", projectId);
  formData.append("projectStage", projectStage.toString());

  switch (projectStage) {
    case 3:
      if (problem) formData.append("problem", problem);
      break;
    case 4:
      if (personaInfos)
        formData.append("personaInfos", JSON.stringify(personaInfos));
      break;
    case 7:
      console.log("whyWhatHowImage", whyWhatHowImage);
      if (whyWhatHowImage)
        formData.append(
          "whyWhatHowImage",
          whyWhatHowImage,
          "whyWhatHowImage.png",
        );
      break;
    case 8:
      if (coreDetails)
        formData.append("coreDetails", JSON.stringify(coreDetails));
      break;
    case 9:
      console.log("businessModelImage", businessModelImage);
      if (businessModelImage)
        formData.append(
          "businessModelImage",
          businessModelImage,
          "businessModelImage.png",
        );
      break;
    case 11:
      if (epics) formData.append("epics", JSON.stringify(epics));
      break;
    case 12:
      if (menuTreeImage)
        formData.append("menuTreeImage", menuTreeImage, "menuTreeImage.png");
      break;
    default:
      break;
  }

  console.log("formData Contents", Array.from(formData.entries()));

  fetch(`https://syncd-backend.dev.i-dear.org/v1/project/sync`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((data) => {
      console.log("Successfully sent image to backend", data);
    })
    .catch((error) => {
      console.error("Error sending image to backend", error);
    });
};

type Result = {
  pdfUrl: string;
};

export const getResult = async (
  token: string,
  projectId: string,
): Promise<Result> => {
  try {
    const response = await fetch(
      `https://syncd-backend.dev.i-dear.org/v1/project/result`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          projectId,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("프로젝트 결과 조회에 실패했습니다.");
    }

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("프로젝트 결과 조회에 실패했습니다.", error);
    return { pdfUrl: "" };
  }
};
