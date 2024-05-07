"use client";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";
import { InviteFriendModal } from "../modals/invite-friend-modal";
import { ServerSettingsModal } from "../modals/server-settings";
import { ManageMembersModal } from "../modals/manage-members";
import { InviteModal } from "../modals/invite-modal";
import { CreateChannelrModal } from "../modals/create-channel-modal";

export const ModalProvider = () => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateServerModal />
      <InviteFriendModal />
      <ServerSettingsModal />
      <ManageMembersModal />
      <CreateChannelrModal />
    </>
  );
};
