import { create } from "zustand";

interface RoomIdStoreType {
  roomId: string;
  setRoomId: (id: string) => void;
}

const useRoomIdStore = create<RoomIdStoreType>((set) => ({
  roomId: "",
  setRoomId: (id) => set({ roomId: id }),
}));

export default useRoomIdStore;
