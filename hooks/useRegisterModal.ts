import { create } from 'zustand';

interface RegisterModalStorage {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterModal =
  create<RegisterModalStorage>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));

export default useRegisterModal;
