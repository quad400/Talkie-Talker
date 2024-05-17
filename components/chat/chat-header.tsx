"use client"


import UserAvatar from "../user-avatar";
import { MobileToggle } from "../mobile-toggle";
import { useSocket } from "../providers/socket-provider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
  const { isConnected } = useSocket();

  return (
    <div className="flex w-full bg-zinc-900 p-5 justify-between items-center">
      <div className="flex justify-start items-center">
        {type === "channel" && (
          <div className="text-lg text-zinc-300 font-semibold">
            <span className="text-zinc-500 mr-1">#</span>
            {name}
          </div>
        )}

        {type === "chat" && imageUrl && (
          <div className="flex justify-start items-center space-x-3">
            <UserAvatar
              imageUrl={imageUrl}
              className="h-10 w-10 md:h-14 md:w-14"
            />
            <div className="text-lg text-zinc-300 font-semibold">{name}</div>
          </div>
        )}
      </div>
      <Badge
        className={cn(
          "justify-center items-center font",
          isConnected
            ? "bg-emerald-500 hover:bg-emerald-600"
            : "bg-rose-500 hover:bg-rose-600"
        )}
      >
        {isConnected ? "Online" : "Offline"}
      </Badge>
    </div>
  );
};
