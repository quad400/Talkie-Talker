"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import UserAvatar from "../user-avatar";
import { ServerWIthMember, ServerWithMemberWithProfile } from "@/types";
import { Server } from "@prisma/client";
import { Button } from "../ui/button";
import axios from "axios";

export const InviteModal = ({ server }: { server: ServerWIthMember }) => {
  const [isMounted, setIsMounted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleJoinServer = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/servers/${server.id}/join`);
      router.push(`/servers/${server.id}`);
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-semibold">
            Server Invite
          </DialogTitle>
        </DialogHeader>
        <div className="flex my-3 px-6">
          <div className="flex space-x-2">
            <UserAvatar imageUrl={server.imageUrl} />
            <div className="flex flex-col justify-start items-start">
              <div className="text-sm font-semibold text-zinc-700">
                {server.name}
              </div>
              <div className="text-xs font-medium text-zinc-600">
                {server?.members.length === 1
                  ? `${server?.members.length} member`
                  : `${server?.members.length} members`}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="bg-zinc-100 py-3 px-6">
          <div className="w-full flex justify-between items-center">
            <Button disabled={isLoading} onClick={handleClose} variant="ghost">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={handleJoinServer} variant="primary">
              Join Server
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
