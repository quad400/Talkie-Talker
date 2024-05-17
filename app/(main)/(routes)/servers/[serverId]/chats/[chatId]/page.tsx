import ChatFooter from "@/components/chat/chat-footer";
import { ChatHeader } from "@/components/chat/chat-header";
import ChatMessage from "@/components/chat/chat-message";
import { MobileToggle } from "@/components/mobile-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getOrCreateChat } from "@/lib/chat";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ChatIdPage = async ({
  params,
}: {
  params: { serverId: string; chatId: string };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!member) {
    return redirect("/servers");
  }

  const chat = await getOrCreateChat(member?.id, params.chatId);

  if (!chat) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = chat;

  const otherMember = memberOne.id === member.id ? memberTwo : memberOne;

  return (
    <div className="w-full h-full flex flex-col bg-neutral-800/80">
      <div className="flex-row flex w-full pl-2 justify-start items-center bg-neutral-900 shadow-xl">
        <MobileToggle serverId={otherMember.serverId} />
        <ChatHeader
          name={otherMember.profile.name}
          serverId={params.serverId}
          type="chat"
          imageUrl={otherMember.profile.imageUrl}
        />
      </div>
      <ScrollArea className="flex-1 bg-zinc-800/50 flex">
        <ChatMessage
          name={otherMember.profile.name}
          type="chat"
          apiUrl="/api/messages"
          socketUrl="/api/socket/messages"
          chatId={chat?.id}
          socketQuery={{
            channelId: chat.id,
            serverId: otherMember.serverId,
          }}
          paramKey="chatId"
          paramValue={chat.id}
        />
      </ScrollArea>
      <ChatFooter
        type="chat"
        apiUrl="/api/socket/messages"
        query={{
          channelId: chat?.id,
          serverId: otherMember.serverId,
        }}
      />
    </div>
  );
};

export default ChatIdPage;
