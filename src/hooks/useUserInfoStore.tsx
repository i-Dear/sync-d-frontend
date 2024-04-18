import { create } from "zustand";

export type UserInfoStoreType = {
  _id: string;
  name: string;
  hostingRooms: string[];
  joinedRooms: string[];
  token: string;
};

const useUserInfoStore = create<UserInfoStoreType>((set) => ({
  _id: "",
  name: "",
  hostingRooms: [],
  joinedRooms: [],
  token: "",
}));

export default useUserInfoStore;
