"use client";

import { useInView } from 'react-intersection-observer'
import { Loader2, ServerCrash } from "lucide-react";
import { ElementRef, Fragment, useEffect, useRef } from "react";

import { MessageWithMemberWithProfile } from "@/types";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatScroll } from "@/hooks/use-chat-scroll";

import ChatWelcome from "./chat-welcome";
import ChatItem from "./chat-item";

interface ChatMessageProps {
  name: string;
  type: "channel" | "chat";
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "chatId";
  paramValue: string;
}

const ChatMessage = ({
  name,
  type,
  apiUrl,
  chatId,
  paramKey,
  paramValue,
  socketQuery,
  socketUrl,
}: ChatMessageProps) => {
  
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}/messages`;
  const updateKey = `chat:${chatId}/messages/update`;

  const {ref, inView} = useInView();


  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({ apiUrl, paramKey, paramValue, queryKey });

  useChatSocket({ addKey, queryKey, updateKey });

  useChatScroll({
    chatRef,
    bottomRef,
    inView,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  });

  // @ts-ignore
  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center h-screen items-center">
        <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
        <p className="text-muted-foreground text-sm font-medium">
          Loading Messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center h-screen items-center">
        <ServerCrash className="h-8 w-8 text-muted-foreground" />
        <p className="text-muted-foreground text-sm font-medium">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div ref={ref} className="flex flex-1 px-4 h-screen flex-col">
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && <ChatWelcome name={name} type={type} />}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 text-muted-foreground animate-spin my-4" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 hover:dark:text-zinc-300 transition"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group?.items.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                key={message.id}
                type={type}
                profile={message.member.profile}
                text={message.text}
                imageUri={message.imageUri}
                role={message.member.role}
                fileUri={message.fileUri}
                messageId={message.id}
                deleted={message.deleted}
                createdAt={message.createdAt}
                updatedAt={message.updatedAt}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessage;
