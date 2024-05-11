import { create } from "zustand";

interface ModalStoreType {
  isModalOpen: boolean;
  setModalState: (open: boolean) => void;
  modalType: string;
  setModalType: (key: string) => void;
}

const useModalStore = create<ModalStoreType>((set) => ({
  modalType: "",
  isModalOpen: false,
  setModalState: (open) => set({ isModalOpen: open }),
  setModalType: (type) => {
    set({ modalType: type });
  },
}));

export default useModalStore;
