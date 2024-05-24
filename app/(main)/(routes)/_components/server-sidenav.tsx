import { ChannelType, Server } from "@prisma/client";
import ServerSideNavHeader from "./server-sidenav-header";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Command, Hash, Mic, Search, Video } from "lucide-react";
import ServerSearch from "./server-search";
import ServerSection from "./server-section";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currentProfile } from "@/lib/current-profile";

interface ServerSideNavProps {
  serverId: string;
}

const ServerSideNav = async ({ serverId }: ServerSideNavProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
      channels: {
        include: {
          profile: true,
        },
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect("/404");
  }

  const textChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-1 h-4 w-4" />,
    [ChannelType.AUDIO]: <Mic className="mr-1 h-4 w-4" />,
    [ChannelType.VIDEO]: <Video className="mr-1 h-4 w-4" />,
  };

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col w-full h-full px-2">
      <ServerSideNavHeader server={server} role={role} />
      <ServerSearch
        data={[
          {
            label: "Text Channels",
            type: "channel",
            data: textChannels.map((channel) => ({
              name: channel.name,
              id: channel.id,
              icon: iconMap[channel.type],
            })),
          },
          {
            label: "Audio Channels",
            type: "channel",
            data: audioChannels.map((channel) => ({
              name: channel.name,
              id: channel.id,
              icon: iconMap[channel.type],
            })),
          },
          {
            label: "Video Channels",
            type: "channel",
            data: videoChannels.map((channel) => ({
              name: channel.name,
              id: channel.id,
              icon: iconMap[channel.type],
            })),
          },
        ]}
      />
      <Separator className="my-2 bg-zinc-800" />
      <ScrollArea className="space-y-2">
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              label="Text Channels"
              sectionType="channels"
              channelType={ChannelType.TEXT}
              channels={textChannels}
              role={role}
              server={server}
            />
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              label="Voice Channels"
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              channels={audioChannels}
              role={role}
              server={server}
            />
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              label="Video Channels"
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              channels={videoChannels}
              role={role}
              server={server}
            />
          </div>
        )}
        {!!server.members?.length && (
          <div className="mb-2">
            <ServerSection
              label="Members"
              sectionType="members"
              role={role}
              server={server}
              profile={profile}
              members={server.members}
            />
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ServerSideNav;
