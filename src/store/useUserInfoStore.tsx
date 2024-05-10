import { UserInfo, ProjectInfo } from "@/lib/types";
import { create } from "zustand";

export type UserInfoStoreType = {
  userInfo: UserInfo;
  projects: ProjectInfo[];
  setUserInfo: (userInfo: UserInfo) => void;
  setProjectsInfo: (projects: ProjectInfo[]) => void;
};

const useUserInfoStore = create<UserInfoStoreType>((set) => ({
  userInfo: {
    id: "",
    name: "",
    avatar: "",
    email: "",
  },
  projects: [],
  setUserInfo: (userInfo) => set({ userInfo }),
  setProjectsInfo: (projects) => set({ projects }),
}));

export default useUserInfoStore;
