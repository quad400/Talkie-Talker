import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import {currentProfile} from "@/lib/current-profile";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);

  const { name, channelType } = await req.json();
  try {
    const serverId = searchParams.get("serverId");

    const profile = await currentProfile();

    if (!serverId) {
      throw new NextResponse("Missing Server Id", { status: 404 });
    }

    if (!profile) {
      throw new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              not: MemberRole.GUEST,
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name: name,
            type: channelType,
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
        channels: true,
      },
    });

    if (!server) {
      throw new NextResponse("Guest cannot create a channel", { status: 400 });
    }

    return NextResponse.json(server);
  } catch (error) {
    throw new NextResponse("Internal Server Error", { status: 500 });
  }
}
