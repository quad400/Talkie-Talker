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

export const DeleteServerModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();

  const router = useRouter();
  const { server } = data;
  const isModalOpen = isOpen && type === "deleteServer";

  const [isLoading, setIsLoading] = useState(false);

  const deleteServer = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/servers/${server?.id}`);
      
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
          <DialogTitle className="text-2xl text-zinc-300 text-center font-semibold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center my-2">
            Are you Sure you want to delete this server&#44;
 it can&apos;t be recover
            when deleted
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="bg-zinc-900 py-3 px-6">
          <div className="w-full flex justify-between items-center">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={deleteServer}
              variant="primary"
            >
              Delete Server
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
