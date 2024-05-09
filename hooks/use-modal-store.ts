import { create } from "zustand";

import { ServerWithMemberAndChannel, ServerWithMemberWithProfile } from "@/types";
import { Channel } from "@prisma/client";

export type ModalType =
  | "createServer"
  | "invite"
  | "serverSettings"
  | "manageMembers"
  | "createChannel"
  | "deleteServer"
  | "leaveServer"
  | "editChannel"
  | "deleteChannel";

interface ModalData {
  server?: ServerWithMemberWithProfile;
  channel?: Channel
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
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
