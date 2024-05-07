import { create } from "zustand";

import { ServerWithMemberWithProfile } from "@/types";

export type ModalType = "createServer" | "invite" | "serverSettings" | "manageMembers"|"createChannel";

interface ModalData {
  server?: ServerWithMemberWithProfile;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data={}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
