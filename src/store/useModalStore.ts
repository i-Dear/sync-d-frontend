import { create } from "zustand";

interface ModalStoreType {
  isOpen: boolean;
  setModalState: (open: boolean) => void;
  modalKey: string;
  setModalKey: (key: string) => void;
}

const useModalStore = create<ModalStoreType>((set) => ({
  modalKey: "",
  isOpen: false,
  setModalState: (open) => set({ isOpen: open }),
  setModalKey: (key) => {
    set({ modalKey: key });
  },
}));

export default useModalStore;
