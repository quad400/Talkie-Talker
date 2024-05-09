interface ChatHeaderProps {
  serverId: string | undefined;
  name: string | undefined;
  type: "channel" | "chat";
  imageUrl?: string;
}

export const ChatHeader = ({
  name,
  serverId,
  type,
  imageUrl,
}: ChatHeaderProps) => {
    return (
        <div>#{name}</div>
    )
};
