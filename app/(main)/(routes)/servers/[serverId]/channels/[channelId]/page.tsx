import ChatFooter from "@/components/chat/chat-footer";
import { ChatHeader } from "@/components/chat/chat-header";
import ChatMessage from "@/components/chat/chat-message";
import { MediaRoom } from "@/components/media-room";
import { MobileToggle } from "@/components/mobile-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchChannel } from "@/lib/channel-detail";
import { ChannelType } from "@prisma/client";

const ChannelPageId = async ({ params }: { params: { channelId: string } }) => {
  const channel = await fetchChannel(params?.channelId);

  if (!channel) {
    return null;
  }

  return (
    <div className="w-full h-full flex-1 flex flex-col bg-red-zinc/80">
      <div className="flex-row flex w-full pl-2 justify-start items-center bg-zinc-900 shadow-xl">
        <MobileToggle serverId={channel?.serverId} />
        <ChatHeader
          name={channel?.name}
          serverId={channel?.serverId}
          type="channel"
        />
      </div>
      {channel.type === ChannelType.TEXT && (
        <>
          <ScrollArea className="h-full flex-1 flex flex-col bg-zinc-800/50">
            <ChatMessage
              name={channel?.name}
              type="channel"
              apiUrl="/api/messages"
              socketUrl="/api/socket/messages"
              chatId={channel?.id}
              socketQuery={{
                channelId: channel.id,
                serverId: channel.serverId,
              }}
              paramKey="channelId"
              paramValue={channel.id}
            />
          </ScrollArea>
          <ChatFooter
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel?.id,
              serverId: channel?.serverId,
            }}
          />
        </>
      )}
      {channel.type=== ChannelType.AUDIO && (
        <MediaRoom 
          chatId={channel.id}
          audio={true}
          video={false}
        />
      )}
      {channel.type=== ChannelType.VIDEO && (
        <MediaRoom 
          chatId={channel.id}
          audio={true}
          video={true}
        />
      )}
    </div>
  );
};

export default ChannelPageId;
