import { currentProfilePage } from "@/lib/current-profile-page";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text, imageUri, fileUri, video } = req.body;

    const { chatId } = req.query;

    console.log(chatId);
    const profile = await currentProfilePage(req);

    if (!profile) {
      return res.status(401).json({ error: "Unathorized" });
    }

    const chat = await db.chat.findFirst({
      where: {
        id: chatId as string,
        OR: [
          {
            memberOne: {
              profileId: profile.id,
            },
          },
          { memberTwo: { profileId: profile.id } },
        ],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    const member =
      chat.memberOne.profileId === profile.id ? chat.memberOne : chat.memberTwo;

    const directMessage = await db.directMessage.create({
      data: {
        text: text || "",
        imageUri: imageUri || "",
        fileUri: fileUri || "",
        video: video || "",
        chatId: chatId as string,
        memberId: member.id as string,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    const channelKey = `chat:${chatId}:messages`;

    res?.socket?.server.io?.emit(channelKey, directMessage);
    return res.status(201).json(directMessage);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Internal server error [MESSAGE] ${error}` });
  }
}
