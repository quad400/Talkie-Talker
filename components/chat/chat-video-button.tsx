"use client";

import { Video, VideoOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { ActionTooltip } from "../action.tooltip";
import queryString from "query-string";

const ChatVideoButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isVideo = searchParams?.get("video");

  const Icon = isVideo ? VideoOff : Video;

  const toolTipLabel = isVideo ? "End video call" : "Start video call";

  const onClick = () => {
    const url = queryString.stringifyUrl(
      {
        url: pathname || "",
        query: {
          video: isVideo ? undefined : true,
        },
      },
      { skipNull: true }
    );
    router.push(url)
  };

  return (
    <ActionTooltip side="bottom" label={toolTipLabel}>
      <button onClick={onClick} className="hover:opacity-75 transition mr-4">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </button>
    </ActionTooltip>
  );
};

export default ChatVideoButton;
