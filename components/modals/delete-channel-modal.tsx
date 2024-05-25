"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string";

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

export const DeleteChannelModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();

  const router = useRouter();
  const { server, channel } = data;
  const isModalOpen = isOpen && type === "deleteChannel";

  const [isLoading, setIsLoading] = useState(false);

  const deleteServer = async () => {
    try {
      setIsLoading(true);

      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });

      await axios.delete(url);

      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen}>
      <DialogContent className="bg-zinc-950 text-muted-foreground p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-zinc-300 text-center font-semibold">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center my-2">
            Are you Sure you want to delete{" "}
            <span className="text-indigo-500 font-medium">{channel?.name}</span> &#44;
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
              Delete Channel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
