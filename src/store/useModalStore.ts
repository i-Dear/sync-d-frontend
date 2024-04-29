import { create } from "zustand";

interface ModalStoreType {
  isOpen: boolean;
  currentProcess: number;
  changeModalState: () => void;
}

const useModalStore = create<ModalStoreType>((set) => ({
  isOpen: true,
  currentProcess: 1,
  changeModalState: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useModalStore;
