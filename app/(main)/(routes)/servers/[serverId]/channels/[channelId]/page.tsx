import ChatFooter from "@/components/chat-footer"
import { ChatHeader } from "@/components/chat-header"
import { fetchChannel } from "@/lib/channel-detail"

const ChannelPageId = async ({params}: {params: {channelId: string}}) => {
  
  const channel = await fetchChannel(params?.channelId)
  
  return (
    <div className="w-full flex flex-col h-full bg-zinc-800">
      <ChatHeader 
        name={channel?.name}
        serverId={channel?.serverId}
        type="channel"
      />
      <div className="flex-1">Messages</div>
      {/* <ChatFooter /> */}
    </div>
  )
}

export default ChannelPageId