import { create } from "zustand";

const useFileModal = create((set) => ({
  isOpen: false,
  filePath: "",
  uploadFile: null,
  openModal: (filePath) => {
    set({ isOpen: true, filePath })
  },
  closeModal: () => set({ isOpen: false, filePath: "" }),
}));

export default useFileModal;
