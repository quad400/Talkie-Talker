"use client"

import {
  ChevronDown,
  PlusCircle,
  Settings,
  Trash,
  User,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MemberRole, Server } from "@prisma/client";

import { ServerWithMemberWithProfile } from "@/types";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSideNavHeaderProps {
  server: ServerWithMemberWithProfile;
  role?: MemberRole;
}

const ServerSideNavHeader = ({ server, role }: ServerSideNavHeaderProps) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  const isGuest = role === MemberRole.GUEST;
  const isModeratorOrGuest = isGuest || role === MemberRole.MODERATOR;

  const {onOpen} = useModal()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="w-full flex justify-between items-center"
          variant="ghost"
        >
          <div className="text-base uppercase font-semibold truncate">
            {server?.name}
          </div>
          <ChevronDown className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 mx-2 space-y-2">
        {isModerator && (
          <DropdownMenuItem onClick={()=> onOpen("invite", { server})} className="flex justify-between items-center text-indigo-600 cursor-pointer dark:text-indigo-400 px-3 py-2 text-sm">
            Invite Friends
            <UserPlus className="h-4 w-4 text-indigo-500" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem onClick={()=> onOpen("serverSettings", { server})} className="flex justify-between items-center cursor-pointer px-3 py-2 text-sm">
            Server Settings
            <Settings className="h-4 w-4 text-white" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem onClick={()=> onOpen("manageMembers", { server})} className="flex justify-between items-center cursor-pointer px-3 py-2 text-sm">
            Manage Members
            <User className="h-4 w-4 text-white" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem onClick={()=> onOpen("createChannel", { server})} className="flex justify-between items-center cursor-pointer px-3 py-2 text-sm">
            Create Channel
            <PlusCircle className="h-4 w-4 text-white" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem className="flex justify-between items-center cursor-pointer px-3 text-rose-500 py-2 text-sm">
            Delete Server
            <Trash className="h-4 w-4 text-rose-500 hover" />
          </DropdownMenuItem>
        )}
        {isModeratorOrGuest && (
            <DropdownMenuItem className="flex justify-between items-center cursor-pointer px-3 text-rose-500 py-2 text-sm">
              Leave Server
              <Trash className="h-4 w-4 text-rose-500 hover" />
            </DropdownMenuItem>
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerSideNavHeader;
