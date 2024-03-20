import { create } from "zustand";

type UserInfoStoreType = {
  _id: string;
  name: string;
  color: string;
  hostingRooms: string[];
  joinedRooms: string[];
  token: string;
};

export const useUserInfoStore = create<UserInfoStoreType>((set) => ({
  _id: "",
  name: "",
  color: "",
  hostingRooms: [],
  joinedRooms: [],
  token: "",
}));

export default useUserInfoStore;
