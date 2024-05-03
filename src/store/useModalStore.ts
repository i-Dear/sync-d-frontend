import { create } from "zustand";

interface ModalStoreType {
  isOpen: boolean;
  setModalState: (open: boolean) => void;
  modalType: string;
  setModalType: (key: string) => void;
}

const useModalStore = create<ModalStoreType>((set) => ({
  modalType: "",
  isOpen: false,
  setModalState: (open) => set({ isOpen: open }),
  setModalType: (type) => {
    set({ modalType: type });
  },
}));

export default useModalStore;
