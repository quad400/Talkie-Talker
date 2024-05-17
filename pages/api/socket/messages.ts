import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "../../../types";
import { currentProfilePage } from "@/lib/current-profile-page";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text, imageUri, fileUri, video } = req.body;
    const { serverId, channelId } = req.query;

    const profile = await currentProfilePage(req);

    if (!profile) {
      return res.status(401).json({ error: "Unathorized" });
    }

    if (!serverId) {
      return res.status(404).json({ error: "ServerId not found" });
    }

    if (!channelId) {
      return res.status(404).json({ error: "ChannelId not found" });
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!server) {
      return res.status(404).json({ error: "Server not found" });
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: server.id,
      },
    });

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    const member = server.members.find(
      (member) => member.profileId === profile.id
    );

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }
    
    const message = await db.message.create({
      data: {
        text: text || "",
        imageUri: imageUri || "",
        fileUri: fileUri || "",
        video: video || "",
        channelId: channel.id as string,
        memberId: member.id as string,
      },
      include: {
        member: {
          include: {
            profile: true
          },
        },
      },
    });

    const channelKey = `chat:${channelId}:messages`;

    res?.socket?.server.io?.emit(channelKey, message);
    return res.status(201).json(message);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Internal server error [MESSAGE] ${error}` });
  }
}
