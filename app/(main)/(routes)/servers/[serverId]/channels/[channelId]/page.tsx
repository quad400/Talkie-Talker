import { ChatHeader } from "@/components/chat-header"
import { fetchChannel } from "@/lib/channel-detail"

const ChannelPageId = async ({params}: {params: {channelId: string}}) => {
  
  const channel = await fetchChannel(params?.channelId)
  
  return (
    <div>
      <ChatHeader 
        name={channel?.name}
        serverId={channel?.serverId}
        type="channel"
      />

    </div>
  )
}

export default ChannelPageId