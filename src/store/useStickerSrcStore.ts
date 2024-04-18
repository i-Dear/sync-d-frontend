import { create } from "zustand";

interface StickerStoreType {
  stickerSrc: string;
  setStickerSrc: (stickerSrc: string) => void;
}

const useStickerStore = create<StickerStoreType>((set) => ({
  stickerSrc: "",
  setStickerSrc: (stickerSrc) => set({ stickerSrc }),
}));

export default useStickerStore;
