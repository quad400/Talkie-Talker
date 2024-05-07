"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import qs from "query-string";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import {
  Check,
  EllipsisVertical,
  Gavel,
  LoaderCircle,
  ShieldHalf,
  ShieldMinus,
  ShieldQuestion,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { ScrollArea } from "../ui/scroll-area";
import { MemberRole } from "@prisma/client";

export const ManageMembersModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const router = useRouter();

  const { server } = data;
  const isModalOpen = isOpen && type === "manageMembers";

  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const onKick = async (memberId: string) => {
    const url = qs.stringifyUrl({
      url: `/api/members/${memberId}`,
      query: {
        serverId: server?.id,
      },
    });

    try {
      setIsLoading(true);

      const { data } = await axios.delete(url);

      router.refresh();

      onOpen("manageMembers", { server: data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMemberRole = async (memberId: string, role: MemberRole) => {
    const url = qs.stringifyUrl({
      url: `/api/members/${memberId}`,
      query: {
        serverId: server?.id,
      },
    });

    try {
      setIsLoading(true);

      const { data } = await axios.patch(url, { role });

      router.refresh();

      onOpen("manageMembers", { server: data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-semibold">
            Manage Members
          </DialogTitle>
          <div className="text-zinc-700 font-medium text-center">
            {server?.members.length === 1
              ? `${server?.members.length} member`
              : `${server?.members.length} members`}
          </div>
        </DialogHeader>
        <div className="flex px-6 flex-col justify-start mb-6 items-start">
          <ScrollArea className="max-h-80 w-full">
            {server?.members.map((member) => (
              <div className="flex justify-between items-start w-full mb-3">
                <div className="flex justify-start items-center space-x-3">
                  <UserAvatar imageUrl={member.profile.imageUrl} />
                  <div className="flex flex-col justify-start  items-start">
                    <div className="text-base font-semibold text-zinc-700">
                      {member.profile.name}
                    </div>
                    <div className="text-sm font-medium text-zinc-700">
                      {member.profile.email}
                    </div>
                  </div>
                </div>
                {member.role !== MemberRole.ADMIN && (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button disabled={isLoading} size="icon">
                        {isLoading ? (
                          <LoaderCircle className="animate-spin h-5 w-5 text-zinc-500" />
                        ) : (
                          <EllipsisVertical className="h-5 w-5" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="left">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex">
                          <div className="text-sm flex justify-start items-center text-white font-medium">
                            <ShieldQuestion className="text-white h-4 w-4 mr-2" />
                            Role
                          </div>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem
                              onClick={() =>
                                updateMemberRole(member.id, "MODERATOR")
                              }
                              className="text-sm flex justify-between items-center w-full "
                            >
                              <div className="flex justify-start items-center">
                                <ShieldHalf className="text-white h-4 w-4 mr-1" />
                                Moderator
                              </div>
                              {member.role === MemberRole.MODERATOR && (
                                <Check className="text-white h-4 w-4 ml-2" />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                updateMemberRole(member.id, "GUEST")
                              }
                              className="text-sm flex justify-between w-full items-center"
                            >
                              <div className="flex justify-start items-center">
                                <ShieldMinus className="text-white h-4 w-4 mr-1" />
                                Guest
                              </div>
                              {member.role === MemberRole.GUEST && (
                                <Check className="text-white h-4 w-4 ml-2" />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onKick(member?.id)}
                        className="text-white"
                      >
                        <Gavel className="h-4 w-4 mr-2" />
                        Kick
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
