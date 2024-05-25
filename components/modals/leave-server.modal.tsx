"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";
import { useRouter } from "next/navigation";

export const LeaveServerModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();

  const router = useRouter();
  const { server } = data;
  const isModalOpen = isOpen && type === "leaveServer";

  const [isLoading, setIsLoading] = useState(false);

  const leaveServer = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/servers/${server?.id}/leave`);
      router.replace("/servers")
      router.refresh()
      onClose()
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-950 text-muted-foreground p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center text-zinc-300 font-semibold">
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center my-2">
            Are you Sure you want to delete this server
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="bg-zinc-900 py-3 px-6">
          <div className="w-full flex justify-between items-center">
            <Button disabled={isLoading} onClick={onClose} className="text-white" variant="ghost">
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={leaveServer}
              variant="primary"
            >
              Leave Server
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
