import { ChatHeader } from "@/components/chat-header";
import { getOrCreateChat } from "@/lib/chat";
import currentProfile from "@/lib/current-profile";
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
    <div className="w-full">
      <ChatHeader
        name={otherMember.profile.name}
        serverId={params.serverId}
        type="chat"
        imageUrl={otherMember.profile.imageUrl}
      />
    </div>
  );
};

export default ChatIdPage;
