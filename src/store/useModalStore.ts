import { create } from "zustand";

interface ModalStoreType {
  isOpen: boolean;
  changeModalState: () => void;
}

const useModalStore = create<ModalStoreType>((set) => ({
  isOpen: false,
  changeModalState: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useModalStore;
