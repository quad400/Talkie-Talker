"use client";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";
import { InviteFriendModal } from "../modals/invite-friend-modal";
import { ServerSettingsModal } from "../modals/server-settings";
import { ManageMembersModal } from "../modals/manage-members";
import { CreateChannelrModal } from "../modals/create-channel-modal";
import { DeleteServerModal } from "../modals/delete-server-modal";
import { LeaveServerModal } from "../modals/leave-server.modal";
import { EditChannelModal } from "../modals/edit-channel-modal";
import { DeleteChannelModal } from "../modals/delete-channel-modal";

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
      <DeleteServerModal />
      <LeaveServerModal />
      <EditChannelModal />
      <DeleteChannelModal />
    </>
  );
};
