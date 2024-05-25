"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, RefreshCcw } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";

export const InviteFriendModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();

  const [isCopied, setIsCopied] = useState(false);
  const { server } = data;
  const isModalOpen = isOpen && type === "invite";

  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(inviteUrl);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleRegenerate = async (serverId: string | undefined) => {
    try {
      setIsLoading(true);
      const { data } = await axios.patch(
        `/api/servers/${serverId}/invite-code`
      );
      onOpen("invite", { server: data });
      console.log(server);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-zinc-900 text-muted-foreground p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center text-zinc-300 font-semibold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 px-6">
          <Label className="uppercase text-sm font-bold">
            Server Invite Link
          </Label>
          <div className="flex justify-between items-center">
            <Input
              disabled={isLoading}
              className="bg-zinc-500/50 border-0 flex-1 focus-visible:ring-0
            text-zinc-200 focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button disabled={isLoading} size="icon" variant="ghost" className="ml-3" onClick={onCopy}>
              {isCopied ? (
                <Check className="h-5 w-5 text-emerald-600" />
              ) : (
                <Copy className="h-5 w-5 text-zinc-600" />
              )}
            </Button>
          </div>
        </div>
        <div className="flex mb-4 items-center justify-start">
          <Button
            disabled={isLoading}
            onClick={() => handleRegenerate(server?.id)}
            variant="link"
            className="underline text-muted-foreground text-sm"
          >
            Generate a new link
            <RefreshCcw className="h-4 w-5 ml-1" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
