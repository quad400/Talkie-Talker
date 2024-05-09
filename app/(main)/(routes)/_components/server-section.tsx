"use client";

import { ActionTooltip } from "@/components/action.tooltip";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import UserAvatar from "@/components/user-avatar";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { MemberWithProfile, ServerWithMemberWithProfile } from "@/types";
import {
  Channel,
  ChannelType,
  MemberRole,
  Profile,
  Server,
} from "@prisma/client";
import {
  Edit,
  Hash,
  Lock,
  Mic,
  Plus,
  Settings,
  Trash,
  Video,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface ServerSectionProps {
  label: string;
  sectionType: "channels" | "members";
  role?: MemberRole;
  channelType?: ChannelType;
  channels?: Channel[];
  profile?: Profile;
  members?: MemberWithProfile[];
  server?: ServerWithMemberWithProfile;
}

const ServerSection = ({
  label,
  sectionType,
  channelType,
  channels,
  members,
  profile,
  role,
  server,
}: ServerSectionProps) => {
  const { onOpen } = useModal();

  const { channelId } = useParams();

  const router = useRouter();

  const onClickChannel = (id: string) => {
    router.push(`/servers/${server?.id}/channels/${id}`);
  };

  const onClickMember = (profileId: string) => {
    router.push(`/servers/${server?.id}/chats/${profileId}`);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <Label className="text-zinc-400 text-sm uppercase font-medium">
          {label}
        </Label>
        <>
          {sectionType === "channels" && role !== MemberRole.GUEST && (
            <ActionTooltip label="Create new channel" align="end" side="right">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onOpen("createChannel", { server })}
              >
                <Plus className="h-6 w-6 text-zinc-500" />
              </Button>
            </ActionTooltip>
          )}
          {sectionType === "members" && role === MemberRole.ADMIN && (
            <ActionTooltip label="Manage members" align="end" side="right">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onOpen("manageMembers", { server })}
              >
                <Settings className="h-6 w-6 text-zinc-500" />
              </Button>
            </ActionTooltip>
          )}
        </>
      </div>
      <div className="flex flex-col mt-2">
        {!!channels?.length &&
          channels?.map((channel) => (
            <Button
              key={channel.id}
              onClick={() => onClickChannel(channel.id)}
              variant="ghost"
              className={cn(
                "flex w-full justify-between items-center",
                channel?.id === channelId && "bg-zinc-800"
              )}
            >
              <div className="flex group transition space-x-1 w-full justify-start items-center">
                {channelType === "TEXT" && (
                  <Hash className="text-zinc-400 h-5 w-5" />
                )}
                {channelType === "AUDIO" && (
                  <Mic className="text-zinc-400 h-5 w-5" />
                )}
                {channelType === "VIDEO" && (
                  <Video className="text-zinc-400 h-5 w-5" />
                )}
                <div className="flex justify-between items-center w-full">
                  <div className="text-zinc-400 w-[100px] truncate text-sm font-normal tracking-tight text-left">
                    {channel.name}
                  </div>
                  {channel.name === "general" && (
                    <ActionTooltip
                      label="Default channel"
                      align="end"
                      side="right"
                    >
                      <Lock className="h-4 cursor-pointer w-4 text-zinc-400" />
                    </ActionTooltip>
                  )}
                  {channel.name !== "general" && (
                    <div className="group-hover:flex hidden justify-end items-center space-x-2">
                      {role !== MemberRole.GUEST && (
                        <ActionTooltip
                          label="Edit channel"
                          align="end"
                          side="right"
                        >
                          <div
                            onClick={() =>
                              onOpen("editChannel", {
                                server: server,
                                channel: channel,
                              })
                            }
                            className=" p-1 transition-all"
                          >
                            <Edit className="h-4 w-4 text-zinc-400" />
                          </div>
                        </ActionTooltip>
                      )}
                      {role !== MemberRole.GUEST && (
                        <ActionTooltip
                          label="Delete channel"
                          align="end"
                          side="right"
                        >
                          <div
                            onClick={() =>
                              onOpen("deleteChannel", { server, channel })
                            }
                            className=" transition-all"
                          >
                            <Trash className="h-4 w-4 text-zinc-400" />
                          </div>
                        </ActionTooltip>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Button>
          ))}
        {!!members?.length &&
          members?.map(
            (member) =>
              member.profileId !== profile?.id && (
                <Button
                  key={member.id}
                  onClick={() => onClickMember(member.id)}
                  variant="ghost"
                  className="flex justify-start space-x-2 items-center"
                >
                  <UserAvatar imageUrl={member.profile?.imageUrl} />
                  <div className="text-zinc-400 text-sm font-normal tracking-tight truncate">
                    {member.profile.name}
                  </div>
                </Button>
              )
          )}
      </div>
    </div>
  );
};

export default ServerSection;
