import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { DirectMessage } from "@prisma/client";
import { NextResponse } from "next/server";

const MESSAGES_BATCH = 10;

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const chatId = searchParams.get("chatId");

    if (!profile) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    if (!chatId) {
      return new NextResponse("ChatId not found", { status: 404 });
    }

    let directMessages: DirectMessage[] = [];

    if (cursor) {
      directMessages = await db.directMessage.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          chatId: chatId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      directMessages = await db.directMessage.findMany({
        take: MESSAGES_BATCH,
        where: {
          chatId: chatId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor = null;

    if (directMessages.length === MESSAGES_BATCH) {
      nextCursor = directMessages[MESSAGES_BATCH - 1].id;
    }

    return NextResponse.json({
      items: directMessages,
      nextCursor,
    });
  } catch (error) {
    console.log("MESSAGE GET", error);
    return new NextResponse("Internal Server Serror", { status: 500 });
  }
}
