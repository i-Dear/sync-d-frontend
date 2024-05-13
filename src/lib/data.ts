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
