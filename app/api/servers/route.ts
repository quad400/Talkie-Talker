import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import {currentProfile} from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();

    const user = await currentProfile();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: user.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        members: {
          create: [{ profileId: user.id, role: MemberRole.ADMIN }],
        },
        channels: {
          create: [{ name: "general", profileId: user.id }],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
